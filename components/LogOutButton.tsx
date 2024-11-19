"use client";

import { signOut } from "next-auth/react";

export function LogOutButton() {
    return (
        <div>
            <button onClick={() => signOut()}>Logout</button>
        </div>
    )
}