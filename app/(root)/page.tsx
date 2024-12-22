import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  console.log({ session });
  return (
    <>
      <h1 className="text-3xl font-black text-white">
        Welcome to the world of Nexjt
      </h1>
    </>
  );
}
