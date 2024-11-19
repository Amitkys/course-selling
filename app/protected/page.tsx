
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
import { LogOutButton } from "@/components/LogOutButton";

export default async function Protected() {
    const session = await getServerSession();
    if (!session || !session.user) {
        redirect("/api/auth/signin");
    }
    return (
        <div>
            <h1>this is protected route</h1>
            <LogOutButton />            
        </div>
    )
}