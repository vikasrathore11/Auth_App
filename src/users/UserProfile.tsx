import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, User, Shield, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import useAuth from "@/auth/store"

export default function UserProfile() {

    const user =useAuth((state)=>state.user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-zinc-100 to-white dark:from-black dark:via-zinc-900 dark:to-black p-6 transition-colors">


      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">User Profile</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Manage and view your personal information
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="rounded-2xl bg-white/80 dark:bg-zinc-900/70 backdrop-blur border border-zinc-200 dark:border-zinc-800">
            <CardContent className="flex flex-col items-center text-center p-6 space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://i.pravatar.cc/300" />
                <AvatarFallback>VK</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                 {user?.name} 
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Full Stack Developer
                </p>
              </div>
              <Button variant="outline" className="rounded-xl">
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:col-span-2"
        >
          <Card className="rounded-2xl bg-white/80 dark:bg-zinc-900/70 backdrop-blur border border-zinc-200 dark:border-zinc-800">
            <CardHeader>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                Account Information
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <InfoRow icon={<User className="h-4 w-4" />} label="Full Name" value="Vikas Kumar" />
              <InfoRow icon={<Mail className="h-4 w-4" />} label="Email" value="vikas@example.com" />
              <InfoRow icon={<Shield className="h-4 w-4" />} label="Role" value="USER" />
              <InfoRow icon={<Calendar className="h-4 w-4" />} label="Joined" value="12 Jan 2024" />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
      <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
        {icon}
        <span>{label}</span>
      </div>
      <span className="text-zinc-900 dark:text-white font-medium">
        {value}
      </span>
    </div>
  )
}
