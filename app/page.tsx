"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Shield, Zap, Globe, Check } from "lucide-react"
import { PaymentModal } from "@/components/payment-modal"

export default function LandingPage() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telegram: "",
  })

  const plans = [
    {
      name: "Basic",
      price: 5,
      currency: "USD",
      features: ["50 Mbps Speed", "Basic Support", "1 Device"],
    },
    {
      name: "Pro",
      price: 10,
      currency: "USD",
      features: ["100 Mbps Speed", "Priority Support", "3 Devices", "Auto IP Rotation"],
    },
    {
      name: "Premium",
      price: 20,
      currency: "USD",
      features: ["200 Mbps Speed", "24/7 Support", "Unlimited Devices", "Dedicated IP"],
    },
  ]

  const handlePlanSelect = (plan: any) => {
    setSelectedPlan(plan)
    setIsPaymentOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Waitlist signup:", formData)
    setIsWaitlistOpen(false)
    alert("شما با موفقیت در لیست انتظار قرار گرفتید! / You have been successfully added to the waitlist!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      {/* Hero Section */}
      <section className="relative px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Persian Headline */}
          <h1
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"
            dir="rtl"
            lang="fa"
          >
            فضای کاری اینترنت اختصاصی شما
          </h1>

          {/* English Headline */}
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Your Private, High-Speed Internet Workspace
          </h2>

          {/* Persian Subheading */}
          <p className="text-xl mb-4 text-blue-200" dir="rtl" lang="fa">
            دسترسی به اتصال پایدار از هر مکان - بدون نیاز به تنظیمات پیچیده
          </p>

          {/* English Subheading */}
          <p className="text-xl mb-8 text-blue-200">Access a stable connection from anywhere—no setup required</p>

          <div className="flex gap-4 justify-center">
            <Dialog open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-8 py-4 text-lg">
                  Join Early Access / پیوستن به دسترسی زودهنگام
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-800 text-white border-slate-700">
                <DialogHeader>
                  <DialogTitle className="text-center text-xl">Join the Waitlist / پیوستن به لیست انتظار</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name / نام</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email / ایمیل</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="telegram">Telegram ID (Optional) / آیدی تلگرام (اختیاری)</Label>
                    <Input
                      id="telegram"
                      value={formData.telegram}
                      onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="@username"
                    />
                  </div>
                  <p className="text-sm text-blue-200 text-center" dir="rtl" lang="fa">
                    زمانی که سرویس آماده شد، از طریق تلگرام/ایمیل به شما اطلاع خواهیم داد
                  </p>
                  <p className="text-sm text-blue-200 text-center">We'll notify you via Telegram/email when ready</p>
                  <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold">
                    Join Waitlist / پیوستن به لیست
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Button
              size="lg"
              variant="outline"
              className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black font-bold px-8 py-4 text-lg"
              onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Pricing / مشاهده قیمت‌ها
            </Button>
          </div>
        </div>

        {/* 404 Illustration */}
        <div className="absolute top-10 right-10 opacity-20">
          <div className="text-6xl font-mono text-red-400">404</div>
          <div className="text-sm text-red-300">Access Denied</div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="px-4 py-16 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Workspace? / چرا فضای کاری ما را انتخاب کنید؟
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-700/50 border-slate-600 text-white">
              <CardHeader className="text-center">
                <Zap className="w-12 h-12 mx-auto mb-4 text-amber-400" />
                <CardTitle>No More Interruptions</CardTitle>
                <CardTitle className="text-sm" dir="rtl" lang="fa">
                  بدون قطعی
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-blue-200">99.9% uptime guarantee</p>
                <p className="text-center text-blue-200 text-sm" dir="rtl" lang="fa">
                  تضمین ۹۹.۹٪ آپتایم
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-700/50 border-slate-600 text-white">
              <CardHeader className="text-center">
                <Shield className="w-12 h-12 mx-auto mb-4 text-amber-400" />
                <CardTitle>Flexible Payments</CardTitle>
                <CardTitle className="text-sm" dir="rtl" lang="fa">
                  پرداخت انعطاف‌پذیر
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-blue-200">Shaparak (IRR) or Crypto (USDT, Bitcoin)</p>
                <p className="text-center text-blue-200 text-sm" dir="rtl" lang="fa">
                  شاپرک (ریال) یا کریپتو
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-700/50 border-slate-600 text-white">
              <CardHeader className="text-center">
                <Globe className="w-12 h-12 mx-auto mb-4 text-amber-400" />
                <CardTitle>Universal Access</CardTitle>
                <CardTitle className="text-sm" dir="rtl" lang="fa">
                  دسترسی همگانی
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-blue-200">Works on all devices—no tech skills needed</p>
                <p className="text-center text-blue-200 text-sm" dir="rtl" lang="fa">
                  روی همه دستگاه‌ها کار می‌کند
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section id="pricing" className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Workspace Plans / پلان‌های فضای کاری</h3>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <Card
                key={plan.name}
                className={`bg-slate-700/50 border-slate-600 text-white ${index === 1 ? "bg-gradient-to-b from-amber-500/20 to-slate-700/50 border-amber-400 relative" : ""}`}
              >
                {index === 1 && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardTitle className="text-lg" dir="rtl" lang="fa">
                    {plan.name === "Basic" ? "پایه" : plan.name === "Pro" ? "حرفه‌ای" : "پریمیوم"}
                  </CardTitle>
                  <div className="text-3xl font-bold text-amber-400">${plan.price}</div>
                  <div className="text-sm text-blue-200">per month</div>
                  <div className="text-xs text-slate-400">≈ {(plan.price * 50000).toLocaleString()} تومان</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="w-4 h-4 mr-2 text-green-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => handlePlanSelect(plan)}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold"
                  >
                    Choose Plan / انتخاب پلان
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="px-4 py-16 bg-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-8">Anti-Filtering Technology / فناوری ضد فیلترینگ</h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-700/50 p-6 rounded-lg border border-slate-600">
              <h4 className="text-xl font-bold mb-4 text-amber-400">Direct Server Connection</h4>
              <p className="text-blue-200">100% direct-to-server connection (no shared proxies)</p>
              <p className="text-blue-200 text-sm mt-2" dir="rtl" lang="fa">
                اتصال مستقیم ۱۰۰٪ به سرور
              </p>
            </div>

            <div className="bg-slate-700/50 p-6 rounded-lg border border-slate-600">
              <h4 className="text-xl font-bold mb-4 text-amber-400">Smart IP Management</h4>
              <p className="text-blue-200">Auto-rotating IPs to prevent blocks</p>
              <p className="text-blue-200 text-sm mt-2" dir="rtl" lang="fa">
                تغییر خودکار IP برای جلوگیری از مسدودی
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 text-center text-blue-300">
        <p>© 2024 Private Workspace. Secure. Fast. Reliable.</p>
        <p className="text-sm mt-2" dir="rtl" lang="fa">
          فضای کاری خصوصی - امن، سریع، قابل اعتماد
        </p>
      </footer>

      {/* Payment Modal */}
      {selectedPlan && (
        <PaymentModal
          isOpen={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
          plan={selectedPlan}
          userInfo={formData}
        />
      )}
    </div>
  )
}
