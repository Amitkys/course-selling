"use client"

import { signOut } from "next-auth/react"

export default function home() {
    return (
        <div>
           <button onClick={() => signOut}>Logout</button> 
            <h1>Welcome to home app</h1>
        </div>
    )
}