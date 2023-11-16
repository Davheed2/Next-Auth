import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    //validate email and password, maybe with zod

    console.log(email, password);
    const res = await axios.post(
      "https://vigoplace.com/server/api/admin/auth/sign-up",
      {
        email: email,
        password: password,
      }
    );

    //response from api
    res.message = "success";
    return NextResponse.json(res.message);
  } catch (err) {
    console.log(err);
  }
  //response from api
  let res = {};
  res.message = "success";
  return NextResponse.json(res.message);
}
