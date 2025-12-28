import useAuth from "@/auth/store";
import {  refreshToken } from "@/components/services/AuthService";
import axios from "axios";


const ApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL || "http://localhost:8082/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});



//Every Request
ApiClient.interceptors.request.use((config) => {
  const accessToken = useAuth.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
//response interceptors
let isRefreshing = false;
let pendding: any[] = []

function queueRequest(cb: any) {
  pendding.push(cb)
}

function resolveQueue(newToken: string) {
  pendding.forEach(cb => cb(newToken))
  pendding = []
}
//error handler for responses
ApiClient.interceptors.response.use(
  response => response, async (error) => {
    // console.log(error);
    const is401 = error.response.status === 401;
    const original = error.config;
    console.log(original);
    
    console.log("orignal retry ", original._retry);
    if (!is401 || original._retry) {
      //message pass here for non-401 errors
      return Promise.reject(error);
    }

    original._retry =true;

    //will be retrying the token
    if (isRefreshing) {
      console.log("added to Queue");
      return new Promise((resolve, reject) => {
        queueRequest((newToken: string) => {
          if (!newToken) return reject();
          original.headers.Authorization = `Bearer ${newToken}`
          resolve(ApiClient(original));
        })
      });
    }
    //start refreshing
    isRefreshing = true;
    try {
      console.log("start refreshing");
      const LoginResponse = await refreshToken();
      const newToken = LoginResponse.accessToken
      if (!newToken) throw new Error("No new token found");
      useAuth
        .getState()
        .changeLocalLoginData(LoginResponse.accessToken, LoginResponse.userDto, true);
      resolveQueue(newToken);
      original.headers.Authorization = `Bearer ${newToken}`;
      return ApiClient(original);

    } catch (err) {
      resolveQueue('null');
      useAuth.getState().logout()
      return Promise.reject(err);
    }
    finally {
      isRefreshing = false;
    }
  }
)

export default ApiClient;   