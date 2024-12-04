"use client"
import { useFormStatus } from "react-dom";

export function Button() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending}>{pending ? "Adding..." : "Add"}</button>
    )
}