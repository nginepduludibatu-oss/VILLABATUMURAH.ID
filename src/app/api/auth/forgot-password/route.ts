import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Authorized email for password reset
const AUTHORIZED_EMAIL = 'regalow400@gmail.com'

// Initialize Resend
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

async function sendResetEmail(email: string, resetLink: string) {
  if (!resend) {
    // Fallback: log to console if Resend not configured
    console.log('=== PASSWORD RESET LINK (RESEND NOT CONFIGURED) ===')
    console.log(`Email: ${email}`)
    console.log(`Reset Link: ${resetLink}`)
    console.log('===================================================')
    console.log('')
    console.log('To enable email sending with Resend:')
    console.log('1. Sign up at https://resend.com/signup')
    console.log('2. Verify your email')
    console.log('3. Get API key from dashboard')
    console.log('4. Add RESEND_API_KEY=your-api-key to .env file')
    console.log('')
    return false
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'VillaBatuMurah.ID <noreply@villabatumurah.id>',
      to: [email],
      subject: 'Reset Password - VillaBatuMurah.ID Admin',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Reset Password</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">VillaBatuMurah.ID Admin Panel</p>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
            <p style="color: #333; line-height: 1.6;">Halo,</p>
            <p style="color: #333; line-height: 1.6;">Anda telah meminta untuk mereset password akun admin Anda. Klik tombol di bawah ini untuk membuat password baru:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset Password</a>
            </div>
            
            <p style="color: #666; font-size: 14px; line-height: 1.6;">Atau copy dan paste link ini ke browser:</p>
            <p style="color: #666; font-size: 12px; word-break: break-all; background: #f0f0f0; padding: 10px; border-radius: 5px;">${resetLink}</p>
            
            <p style="color: #666; font-size: 14px; line-height: 1.6; margin-top: 30px;">Link ini akan kadaluarsa dalam 24 jam.</p>
            <p style="color: #666; font-size: 14px; line-height: 1.6;">Jika Anda tidak meminta reset password, abaikan email ini.</p>
            
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center;">© 2024 VillaBatuMurah.ID. All rights reserved.</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return false
    }

    console.log(`Reset email sent to ${email}`, data)
    return true
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: 'Email harus diisi' },
        { status: 400 }
      )
    }

    // Check if email is authorized
    if (email.toLowerCase() !== AUTHORIZED_EMAIL.toLowerCase()) {
      // For security, still return success but don't actually send
      // This prevents email enumeration attacks
      return NextResponse.json({
        success: true,
        message: 'Jika email terdaftar, link reset akan dikirim.',
      })
    }

    // Generate reset token (in production, store this in database with expiration)
    const resetToken = Buffer.from(`${email}:${Date.now()}:${Math.random()}`).toString('base64')
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/reset-password?token=${resetToken}`

    // Send email
    const emailSent = await sendResetEmail(email, resetLink)

    if (emailSent) {
      return NextResponse.json({
        success: true,
        message: 'Link reset password telah dikirim ke email Anda.',
      })
    } else {
      // Email not configured, but still return success with info
      return NextResponse.json({
        success: true,
        message: 'Link reset password telah dikirim (cek console untuk link jika email tidak terkonfigurasi).',
        resetLink, // Include for development
      })
    }
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat memproses permintaan' },
      { status: 500 }
    )
  }
}
