import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Github, Mail, Lock, User, CheckCircle2Icon } from "lucide-react"
import { motion } from "framer-motion"
import { useState, type FormEvent } from "react"
import toast from "react-hot-toast"

import type RegisterData from "@/models/RegisterData"
import { registerUser } from "@/components/services/AuthService"
import { useNavigate } from "react-router"
import { Alert, AlertTitle } from "@/components/ui/alert"
import OAuth2Button from "@/components/OAuth2Button"

export default function SignupPage() {
  const [data, setData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    //validation
    if (data.name.trim() === "") {
      toast.error("name is required")
      return
    }
    if (data.email.trim() === "") {
      toast.error(" email is required")
      return
    }
    if (data.password.trim() === "") {
      toast.error(" password is required")
      return
    }

    //form submission API call
    try {
        const result =  await registerUser(data)
      
      toast.success("Account created successfully! Please login.")
      setData({ name: "", email: "", password: "" });
      navigate("/login");                                     
    } catch (err: any) {
      // console.log(err);
      setError(err.response?.data?.message || "Login failed");
      toast.error("Login Failed ! Please try again.");
    }
  }


return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-zinc-100 to-white dark:from-black dark:via-zinc-900 dark:to-black px-4">

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md"
    >
      <Card className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/70 backdrop-blur">

        <CardHeader className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent">
            Create Your Account
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Join the future of secure authentication
          </p>
            {/* error section */}


            {error && (
              <Alert variant="destructive">
                <CheckCircle2Icon className="h-4 w-4" />
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            )}


        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                <Input
                  id="name"
                  name="name"
                  value={data.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="pl-10"

                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="pl-10"

                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="pl-10"

                />
              </div>
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full rounded-xl" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

            {/* Divider */}
            <div className="relative text-center">
              <span className="px-2 text-xs text-zinc-500 bg-white dark:bg-zinc-900 relative z-10">
                OR SIGN UP WITH
              </span>
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
              </div>
            </div>

            {/* Social */}
           
            <div className=" flex items-center justify-center">
              <OAuth2Button />
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  </div>
)
}
