import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { amount, planType, userInfo, currency } = await request.json()

    // Validate crypto amount
    const cryptoPrices = {
      basic: { usdt: 5, btc: 0.0001 },
      pro: { usdt: 10, btc: 0.0002 },
      premium: { usdt: 20, btc: 0.0004 },
    }

    const expectedAmount = cryptoPrices[planType as keyof typeof cryptoPrices][currency as "usdt" | "btc"]

    if (Math.abs(amount - expectedAmount) > 0.01) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    // Generate crypto payment address
    const paymentAddress = await generateCryptoAddress(currency)
    const transactionId = `CRYPTO_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Store crypto transaction
    await storeCryptoTransaction({
      transactionId,
      amount,
      currency,
      planType,
      userInfo,
      paymentAddress,
      status: "pending",
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
    })

    return NextResponse.json({
      success: true,
      paymentAddress,
      amount,
      currency: currency.toUpperCase(),
      transactionId,
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${paymentAddress}`,
      expiresIn: 30 * 60, // 30 minutes in seconds
    })
  } catch (error) {
    console.error("Crypto payment error:", error)
    return NextResponse.json({ error: "Payment initiation failed" }, { status: 500 })
  }
}

async function generateCryptoAddress(currency: string) {
  // Mock address generation (integrate with actual crypto service)
  const addresses = {
    usdt: "TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE",
    btc: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  }
  return addresses[currency as keyof typeof addresses] || addresses.usdt
}

async function storeCryptoTransaction(transaction: any) {
  // Implement database storage
  console.log("Storing crypto transaction:", transaction)
}
