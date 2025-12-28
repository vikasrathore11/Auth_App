import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {  Mail, Lock, CheckCircle2Icon } from "lucide-react"
import { motion } from "framer-motion"
import {  useState, type FormEvent } from "react"
import type Logindata from "@/models/Logindata"
import toast from "react-hot-toast"
import { NavLink, useNavigate } from "react-router"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import useAuth from "@/auth/store"
import OAuth2Button from "@/components/OAuth2Button"

export default function LoginPage() {



  const [loginData, setLoginData] = useState<Logindata>({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const naviagete = useNavigate();

  const login = useAuth(state => state.login);

  const hendleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value
    });

  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(loginData);
    setLoading(true);
    setError(null);

    // valitation
    if (loginData.email.trim() === ' ') {
      toast.error("Input Required ! ");
      return;
    }
    if (loginData.password.trim() === ' ') {
      toast.error("Input Required !");
      return;
    }

    //server call for login
    try {
      setLoading(true);

      await login(loginData);
      // const userInfo = await loginUser(loginData);
      toast.success("Login Successful !!");
      // console.log(userInfo);
      naviagete('/dashboard');
      //savr the currunet user logined information in local storage
    } catch (err: any) {
      // console.log(err);
      setError(err.response?.data?.message || "Login failed");
      toast.error("Login Failed ! Please try again.");

      if (err?.status == 400) {
        setError(err);
      } else {
        setError(err);
      }

    } finally {
      setLoading(false);
    }

  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-zinc-100 to-white dark:from-black dark:via-zinc-900 dark:to-black transition-colors px-4">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/70 backdrop-blur">

          <CardHeader className="space-y-2 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
              Sign in to continue to your secure dashboard app
            </p>

            {/* error section */}


            {error && (
              <Alert variant="destructive">
                <CheckCircle2Icon className="h-4 w-4" />
                <AlertTitle>
                  {error.response?.data?.message || "Something went wrong"}
                </AlertTitle>
              </Alert>
            )}

          </CardHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  name="email"
                  value={loginData.email}
                  onChange={hendleInputChange}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  name="password"
                  value={loginData.password}
                  onChange={hendleInputChange}
                />
              </div>
            </div>

            {/* Login Button */}
            <Button disabled={loading} className="w-full rounded-xl cursor-pointer">
              {loading ?
                (
                  <>
                    <Spinner />  Plese wait...
                  </>
                )
                : (
                  "Login"
                )}
            </Button>
            {/* Divider */}
            <div className="relative text-center">
              <span className="px-2 text-xs text-zinc-500 bg-white dark:bg-zinc-900 relative z-10">
                OR CONTINUE WITH
              </span>
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
              </div>
            </div>
            <div className=" flex items-center justify-center">
              <OAuth2Button />
            </div>

            {/* <OAuth2Button /> */}
            {/* Footer */}
            <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
              Don’t have an account?{' '}
             <NavLink to={"/signup"}>
               <span className="text-cyan-500 hover:underline cursor-pointer">
                Sign up
              </span>
             </NavLink>
            </p>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}