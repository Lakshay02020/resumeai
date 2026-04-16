import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";

export async function POST(req: Request) {
  try {
    const { profileId, amount = 19900 } = await req.json(); // in paise
    
    const options = {
      amount: amount,
      currency: "INR",
      receipt: `receipt_${profileId}`,
      notes: { profileId }
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({ 
      orderId: order.id, 
      amount: order.amount, 
      currency: order.currency, 
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID 
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json({ error: "Order Creation Failed" }, { status: 500 });
  }
}
