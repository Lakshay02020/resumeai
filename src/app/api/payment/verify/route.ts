import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { 
      razorpay_payment_id, 
      razorpay_order_id, 
      razorpay_signature, 
      profileId 
    } = await req.json();

    const expectedSig = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isValid = expectedSig === razorpay_signature;

    if (isValid) {
      // Update profile with payment success
      const { error } = await supabaseAdmin
        .from('profiles')
        .update({
          payment_status: 'paid',
          razorpay_payment_id,
          razorpay_order_id,
          amount_paid: 19900
        })
        .eq('id', profileId);

      if (error) {
        console.error("Supabase payment update error:", error);
        return NextResponse.json({ success: false, error: "Database update failed" });
      }

      // Success! The caller will redirect to /success
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: "Invalid signature" });
    }
  } catch (error) {
    console.error("Razorpay verification error:", error);
    return NextResponse.json({ success: false, error: "Verification processing failed" }, { status: 500 });
  }
}
