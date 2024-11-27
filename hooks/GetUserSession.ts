"use client";

import { useSession, SessionContextValue } from "next-auth/react";

// Define the hook with proper TypeScript typings
export function useUserSession() {
    const { data: session, status } = useSession();

    return { session, status };
}
