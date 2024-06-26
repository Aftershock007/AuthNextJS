import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import { getDataFromToken } from "@/utils/getDataFromToken"

connect()

export async function GET(request: NextRequest) {
  const userId = await getDataFromToken(request)
  const user = await User.findOne({ _id: userId }).select("-password")
  if (!user) {
    return NextResponse.json({ error: "User does not exists" }, { status: 400 })
  }
  return NextResponse.json({
    message: "User found",
    data: user
  })
}
