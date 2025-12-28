import type RegisterData from "@/models/RegisterData";
import ApiClient from "@/config/ApiClient";
import type Logindata from "@/models/Logindata";
import type LoginResponseData from "@/models/LoginResponseData";
import type User from "@/models/User";

//register function
export const registerUser = async (signupData: RegisterData) => {
    //api call to server to save data
    const response = await ApiClient.post("/auth/register", signupData);
    return response.data;   
};

//login function
export const loginUser = async (loginData: Logindata) => {
    //api call to server to login
    const response = await ApiClient.post<LoginResponseData>("/auth/login", loginData);
    return response.data;   
};


export const logoutUser = async () => {
    //api call to server to logout
    const response = await ApiClient.post(`/auth/logout`);
    return response.data;   
}


//getCurrentUser function
export const getCurrentUser = async (email?: string) => {
  if (!email) throw new Error("Email required");
//   console.log(email);
  
  const response = await ApiClient.get<User>(`/users/email/${email}`);
  
//   console.log(response);
  return response.data;
};

export const refreshToken = async () => {
    const response = await ApiClient.post<LoginResponseData>(`/auth/refresh`);
    return response.data;
}



  

//Refresh token function
