import { NextResponse } from "next/server";

export function GET(reques, { params }) {
  console.log({params})
  return NextResponse.json({ message: "ok" + params.taskId })
}