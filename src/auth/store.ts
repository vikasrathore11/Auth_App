import { loginUser, logoutUser } from "@/components/services/AuthService";
import type Logindata from "@/models/Logindata";
import type LoginResponseData from "@/models/LoginResponseData";
import type User from "@/models/User";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const LOCAL_KEY = "app_state";

//global authstate:
type AuthState = {
  accessToken: string | null;
  user: User | null;
  authStatus: boolean;
  authLoading: boolean;
  login: (loginData: Logindata) => Promise<LoginResponseData>;
  logout: (silent?: boolean) => void;
  checkLogin: () => boolean | undefined;

 changeLocalLoginData:(
  accessToken:string,
  user:User,
  authStatus:boolean
)=> void;
}; 
//main logic for global state
const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      authStatus: false,
      authLoading: false,

      changeLocalLoginData:(accessToken,user,authStatus)=>{
        set({
          accessToken,
          user, 
          authStatus
    });
  },
      login: async (loginData) => {
        console.log("started login...");
        set({ authLoading: true });
        try {
          const loginResponseData = await loginUser(loginData);
          console.log(loginResponseData);
          set({
            accessToken: loginResponseData.accessToken,
            user: loginResponseData.userDto,
            authStatus: true,
          });
          return loginResponseData;
        } catch (error) {
          console.log(error);
          throw error;
        } finally {
          set({
            authLoading: false,
          });
        }
      },
      logout: async (silent = false) => {
        try {
          //   if (!silent) {
          //     await logoutUser();
          //   }
          set({
            authLoading: true,
          });
          await logoutUser();
        } catch (error) {
        } finally {
          set({
            authLoading: false,
          });
        }
        // await logoutUser();
        set({
          accessToken: null,
          user: null,
          authLoading: false,
          authStatus: false,
        });
      },
      checkLogin: () => {
        if (get().accessToken && get().authStatus) return true;
        else false;
      },
    }),

    { name: LOCAL_KEY }
  )
);

export default useAuth;