import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

// Admin credentials (in production, these should be in environment variables or database)
const ADMIN_CREDENTIALS = {
  username: 'Regalow400',
  password: 'Regalow090100',
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Validate credentials
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // Generate a simple token (in production, use JWT or proper auth library)
      const token = Buffer.from(`${username}:${Date.now()}`).toString('base64')
      
      return NextResponse.json({
        success: true,
        token,
        username,
        message: 'Login successful',
      })
    }

    return NextResponse.json(
      { error: 'Username atau password salah' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat login' },
      { status: 500 }
    )
  }
}
