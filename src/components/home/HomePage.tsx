import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShieldCheck, Lock, Fingerprint, Zap } from "lucide-react"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-zinc-100 to-white dark:from-black dark:via-zinc-900 dark:to-black text-zinc-900 dark:text-white transition-colors">
      
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent"
        >
          Secure Authentication
          <br />
          Built for the Future
        </motion.h1>

        <p className="mt-6 max-w-2xl text-zinc-600 dark:text-zinc-400 text-lg">
          A next-generation authentication platform with biometric security,
          lightning-fast access, and developer-first design.
        </p>

        <div className="mt-10 flex gap-4">
          <Button size="lg" className="rounded-2xl">
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="rounded-2xl">
            View Docs
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          Features
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur">
                <CardContent className="p-6 space-y-4">
                  <feature.icon className="h-10 w-10 text-cyan-500" />
                  <h3 className="text-xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Security Section */}
      <section className="px-6 py-24 border-y border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Enterprise-Grade Security
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              Built with zero-trust architecture, end-to-end encryption,
              and compliance-ready security layers.
            </p>
            <Button size="lg" className="rounded-2xl">
              Learn More
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-violet-500/20 blur-3xl" />
            <Card className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <CardContent className="p-10 flex justify-center">
                <ShieldCheck className="h-20 w-20 text-violet-500" />
              </CardContent>
            </Card>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-32 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Upgrade Your Auth?
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mb-10">
          Start building secure, scalable authentication flows in minutes.
        </p>
        <Button size="lg" className="rounded-2xl px-10">
          Create Free Account
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-10 text-center text-zinc-500 text-sm">
        © {new Date().getFullYear()} AuthFuture. All rights reserved.
      </footer>

    </div>
  )
}

const features = [
  {
    title: "Multi-Factor Auth",
    description: "Passwordless, OTP, and biometric authentication.",
    icon: Fingerprint,
  },
  {
    title: "Zero Trust",
    description: "Every request verified with advanced security policies.",
    icon: ShieldCheck,
  },
  {
    title: "Fast Integration",
    description: "Drop-in SDKs and APIs for rapid development.",
    icon: Zap,
  },
  {
    title: "Data Encryption",
    description: "End-to-end encrypted user credentials.",
    icon: Lock,
  },
]
