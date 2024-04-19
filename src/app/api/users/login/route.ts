import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import toast from "react-hot-toast"

connect()

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        { error: "User does not exists" },
        { status: 400 }
      )
    }

    const validPassword = await bcryptjs.compare(password, user.password)
    if (!validPassword) {
      return NextResponse.json(
        { error: "Check your credentials" },
        { status: 400 }
      )
    }

    if (!user.isVerified) {
      return NextResponse.json({ error: "Verify this user" }, { status: 400 })
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email
    }
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d"
    })

    const response = NextResponse.json({
      message: "Logged In successfully",
      success: true
    })
    response.cookies.set("token", token, {
      httpOnly: true
    })
    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
