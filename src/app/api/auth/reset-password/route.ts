import { NextResponse } from 'next/server'

// In production, store reset tokens in database with expiration
// For now, we'll use a simple in-memory approach (not for production)
const RESET_TOKENS = new Map<string, { email: string; expiresAt: number }>()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { token, newPassword } = body

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: 'Token dan password baru diperlukan' },
        { status: 400 }
      )
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: 'Password minimal harus 8 karakter' },
        { status: 400 }
      )
    }

    // In production, validate token from database
    // For now, we'll decode the token and check if it's valid
    try {
      const decoded = Buffer.from(token, 'base64').toString('utf-8')
      const [email, timestamp] = decoded.split(':')
      
      if (!email || !timestamp) {
        return NextResponse.json(
          { error: 'Token tidak valid' },
          { status: 400 }
        )
      }

      // Check if token is expired (24 hours)
      const tokenTime = parseInt(timestamp)
      const currentTime = Date.now()
      const EXPIRY_TIME = 24 * 60 * 60 * 1000 // 24 hours

      if (currentTime - tokenTime > EXPIRY_TIME) {
        return NextResponse.json(
          { error: 'Token telah kadaluarsa. Silakan minta link reset baru.' },
          { status: 400 }
        )
      }

      // In production, update password in database
      // For now, we'll log the new password (in production, NEVER log passwords)
      console.log('=== PASSWORD RESET SUCCESS ===')
      console.log(`Email: ${email}`)
      console.log(`New Password: ${newPassword}`)
      console.log('==============================')

      // In production, you would update the password in your database
      // Example:
      // await prisma.admin.update({
      //   where: { email },
      //   data: { password: await hash(newPassword, 10) }
      // })

      return NextResponse.json({
        success: true,
        message: 'Password berhasil direset',
      })
    } catch (decodeError) {
      return NextResponse.json(
        { error: 'Token tidak valid' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mereset password' },
      { status: 500 }
    )
  }
}
