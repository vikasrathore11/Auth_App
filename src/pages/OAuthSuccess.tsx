import useAuth from "@/auth/store";
import { refreshToken } from "@/components/services/AuthService";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function OAuthSuccess() {

    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const changeLocalLoginData = useAuth((state) => state.changeLocalLoginData);

const navigate = useNavigate();
    useEffect(() => {
  async function getAccessToken() {
    if (!isRefreshing) {
      setIsRefreshing(true);
      try {
        const responeLoginData = await refreshToken();

        changeLocalLoginData(
          responeLoginData.accessToken,
          responeLoginData.userDto,
          true
        );

        toast.success("Login Success !!...");
        navigate("/dashboard");

      } catch (err) {
        toast.error("Error while Login!!...");
        console.log(err);
      } finally {
        setIsRefreshing(false);
      }
    }
  }

  getAccessToken(); // ✅ VERY IMPORTANT
}, []);


    return (
        <div className="p-10 flex flex-col gap-3 justify-center items-center">
            <Spinner>
                <h1 className="text-2xl font-semibold">Please wait....</h1>
            </Spinner>
        </div>
    )
}

export default OAuthSuccess;