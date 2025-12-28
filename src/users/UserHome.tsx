import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Users, Activity, LogOut, User } from "lucide-react"
import { motion } from "framer-motion"
import { ca } from "date-fns/locale"
import { getCurrentUser } from "@/components/services/AuthService"
import useAuth from "@/auth/store"
import { useState } from "react"
import toast from "react-hot-toast"
import type UserT from "@/models/User"

export default function UserHome() {

  const user = useAuth((state) => state.user);

  const [user1, setUser1] = useState<UserT | null>(null);
 
  const getUserData = async () => {
  if (!user?.email) {
    toast.error("User email not available");
    return;
  }

  try {
    const safeEmail = encodeURIComponent(user.email);
    const user1 = await getCurrentUser(safeEmail);
    // console.log(user1);
    toast.success("you are able to access secured APIs")
    setUser1(user1);
  } catch (error) {
    console.error("Error fetching user data:", error);
    toast.error("Failed to fetch user data");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-zinc-100 to-white dark:from-black dark:via-zinc-900 dark:to-black p-6 transition-colors">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          {/* <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Welcome back 👋</h1> */}
          <p className="text-zinc-600 dark:text-zinc-400">Here’s a quick overview of your account</p>
        </div>

      </motion.div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="Total Logins"
          value="128"
          icon={<Users className="h-6 w-6 text-cyan-500" />}
        />
        <StatCard
          title="Security Status"
          value="Secure"
          icon={<ShieldCheck className="h-6 w-6 text-green-500" />}
        />
        <StatCard
          title="Recent Activity"
          value="Active"
          icon={<Activity className="h-6 w-6 text-violet-500" />}
        />
      </div>

      {/* Activity Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-10"
      >
        <Card className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/70 backdrop-blur">
          <CardHeader>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Recent Login Activity</h2>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <ActivityRow location="India" device="Chrome on Windows" time="2 hours ago" />
            <ActivityRow location="Germany" device="Firefox on Linux" time="Yesterday" />
            <ActivityRow location="USA" device="Safari on macOS" time="3 days ago" />
          </CardContent>
        </Card>
        <div className="text-center">
          <Button onClick={getUserData}
            variant="outline" className="mt-4">Get current user
          </Button>

          <p>

            {
              user1?.name
            }

          </p>
        </div>
      </motion.div>
    </div>
  )
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <motion.div whileHover={{ scale: 1.03 }}>
      <Card className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/70 backdrop-blur">
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{title}</p>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">{value}</h3>
          </div>
          {icon}
        </CardContent>
      </Card>
    </motion.div>
  )
}

function ActivityRow({ location, device, time }: { location: string; device: string; time: string }) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
      <div>
        <p className="text-zinc-800 dark:text-zinc-200">{location}</p>
        <p className="text-zinc-500 dark:text-zinc-400">{device}</p>
      </div>
      <span className="text-zinc-500 dark:text-zinc-400">{time}</span>
    </div>
  )
}