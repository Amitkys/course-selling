"use client";
import { signIn  } from "next-auth/react"
export default function test() {

    return (
        <div>
        <button onClick={() => signIn('google')}>sing as google</button>
        </div>
    )
}