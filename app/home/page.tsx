"use client";

import { useUserSession } from "@/hooks/GetUserSession";

export default function Home() {
    const { session, status } = useUserSession();

    if (status === "loading") {
        return <p>Loading session...</p>;
    }

    if (!session) {
        return <p>No session found. Please log in.</p>;
    }
    console.log(session)

    return (
        <div>
            <h1>Hello, {session.user?.name}</h1>
            <p>Email: {session.user?.email}</p>
        </div>
    );
}
