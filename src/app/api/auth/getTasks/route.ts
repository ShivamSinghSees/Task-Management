import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { barrier } = await request.json();
    // console.log(
    //   email,
    //   password,
    //   "kkkk================================================================"
    // );
  } catch (error) {
    console.log(error, "regester handle error");
  }
  return NextResponse.json({
    message: "Success",
  });
}
