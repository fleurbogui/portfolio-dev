import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nom, email et message sont requis." },
        { status: 400 }
      )
    }

    // Save to Supabase
    const supabase = await createClient()
    const { error: dbError } = await supabase.from("messages").insert({
      name,
      email,
      subject: subject || null,
      message,
    })

    if (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.json(
        { error: "Erreur lors de la sauvegarde du message." },
        { status: 500 }
      )
    }

    // Send via EmailJS if configured
    const emailjsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const emailjsTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const emailjsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

    if (emailjsServiceId && emailjsTemplateId && emailjsPublicKey) {
      try {
        await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: emailjsServiceId,
            template_id: emailjsTemplateId,
            user_id: emailjsPublicKey,
            template_params: {
              from_name: name,
              from_email: email,
              subject: subject || "Nouveau message portfolio",
              message,
            },
          }),
        })
      } catch (emailError) {
        console.error("EmailJS error:", emailError)
        // Don't fail the whole request if email fails
      }
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Erreur interne du serveur." },
      { status: 500 }
    )
  }
}
