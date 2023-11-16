import { getServerSession } from "next-auth";
import Form from "./form";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const session = await getServerSession();

  if (session) {
    redirect("/dashboard");
  }
  return <Form />;
}
