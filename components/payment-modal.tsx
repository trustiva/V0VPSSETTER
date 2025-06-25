"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Copy, QrCode, Clock } from "lucide-react"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  plan: {
    name: string
    price: number
    currency: string
    features: string[]
  }
  userInfo: {
    name: string
    email: string
    telegram?: string
  }
}

export function PaymentModal({ isOpen, onClose, plan, userInfo }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<"shaparak" | "crypto">("shaparak")
  const [cryptoCurrency, setCryptoCurrency] = useState<"usdt" | "btc">("usdt")
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [paymentData, setPaymentData] = useState<any>(null)

  const handleShaparakPayment = async () => {
    setPaymentStatus("processing")

    try {
      const response = await fetch("/api/payments/shaparak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: plan.price * 50000, // Convert USD to IRR (approximate)
          planType: plan.name.toLowerCase(),
          userInfo,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Redirect to Shaparak payment gateway
        window.location.href = data.paymentUrl
      } else {
        setPaymentStatus("error")
      }
    } catch (error) {
      setPaymentStatus("error")
    }
  }

  const handleCryptoPayment = async () => {
    setPaymentStatus("processing")

    try {
      const response = await fetch("/api/payments/crypto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: plan.price,
          planType: plan.name.toLowerCase(),
          currency: cryptoCurrency,
          userInfo,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setPaymentData(data)
        setPaymentStatus("success")
      } else {
        setPaymentStatus("error")
      }
    } catch (error) {
      setPaymentStatus("error")
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-slate-800 text-white border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Complete Your Purchase</DialogTitle>
          <div className="text-center">
            <Badge variant="outline" className="text-amber-400 border-amber-400">
              {plan.name} Plan - ${plan.price}/month
            </Badge>
          </div>
        </DialogHeader>

        <Tabs value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as "shaparak" | "crypto")}>
          <TabsList className="grid w-full grid-cols-2 bg-slate-700">
            <TabsTrigger value="shaparak" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
              پرداخت ریالی (Shaparak)
            </TabsTrigger>
            <TabsTrigger value="crypto" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
              Crypto Payment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="shaparak" className="space-y-4">
            <Card className="bg-slate-700 border-slate-600">
              <CardHeader>
                <CardTitle className="text-amber-400 flex items-center gap-2">
                  <span>پرداخت امن ریالی</span>
                  <Badge variant="secondary">Recommended</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-slate-300">
                  <p>• پرداخت مستقیم از حساب بانکی ایرانی</p>
                  <p>• امنیت بالا با استاندارد شاپرک</p>
                  <p>• فعال‌سازی فوری سرویس</p>
                </div>

                <div className="bg-slate-600 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span>مبلغ قابل پرداخت:</span>
                    <span className="text-amber-400 font-bold">{(plan.price * 50000).toLocaleString()} تومان</span>
                  </div>
                </div>

                <Button
                  onClick={handleShaparakPayment}
                  disabled={paymentStatus === "processing"}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold"
                >
                  {paymentStatus === "processing" ? "در حال انتقال..." : "پرداخت با شاپرک"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="crypto" className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button
                variant={cryptoCurrency === "usdt" ? "default" : "outline"}
                onClick={() => setCryptoCurrency("usdt")}
                className="flex-1"
              >
                USDT (TRC20)
              </Button>
              <Button
                variant={cryptoCurrency === "btc" ? "default" : "outline"}
                onClick={() => setCryptoCurrency("btc")}
                className="flex-1"
              >
                Bitcoin
              </Button>
            </div>

            {paymentStatus === "success" && paymentData ? (
              <Card className="bg-slate-700 border-slate-600">
                <CardHeader>
                  <CardTitle className="text-amber-400 flex items-center gap-2">
                    <QrCode className="w-5 h-5" />
                    Payment Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <img
                      src={paymentData.qrCode || "/placeholder.svg"}
                      alt="Payment QR Code"
                      className="mx-auto mb-4 rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Amount:</span>
                      <span className="text-amber-400 font-bold">
                        {paymentData.amount} {paymentData.currency}
                      </span>
                    </div>

                    <div className="bg-slate-600 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Address:</span>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(paymentData.paymentAddress)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="text-xs font-mono break-all text-amber-400">{paymentData.paymentAddress}</div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Clock className="w-4 h-4" />
                      <span>Payment expires in 30 minutes</span>
                    </div>
                  </div>

                  <div className="bg-blue-900/50 p-3 rounded-lg text-sm">
                    <p className="text-blue-200">
                      Send exactly{" "}
                      <strong>
                        {paymentData.amount} {paymentData.currency}
                      </strong>{" "}
                      to the address above. Your service will be activated automatically after confirmation.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-slate-700 border-slate-600">
                <CardHeader>
                  <CardTitle className="text-amber-400">{cryptoCurrency.toUpperCase()} Payment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-slate-300">
                    <p>• Fast and secure cryptocurrency payment</p>
                    <p>• No banking restrictions</p>
                    <p>• Automatic service activation</p>
                  </div>

                  <div className="bg-slate-600 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span>Amount:</span>
                      <span className="text-amber-400 font-bold">
                        {plan.price} {cryptoCurrency.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={handleCryptoPayment}
                    disabled={paymentStatus === "processing"}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold"
                  >
                    {paymentStatus === "processing"
                      ? "Generating Address..."
                      : `Pay with ${cryptoCurrency.toUpperCase()}`}
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {paymentStatus === "error" && (
          <div className="bg-red-900/50 p-4 rounded-lg text-red-200 text-center">
            Payment failed. Please try again or contact support.
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
