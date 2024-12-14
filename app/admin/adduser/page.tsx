"use client";     
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast";
import { addUser } from "@/lib/actions/user";
import React, { useState } from "react"

export default function PageAddUser() {
    const {toast} = useToast();
    const [rollError, setRollError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    async function handleForm(formData: FormData) {
        // "use server";
        setRollError(null);
        setEmailError(null);

        const response = await addUser(formData);
        if (response.rollError) {
            setRollError(response.message);
        } else if (response.emailError) {
            setEmailError(response.message);
        } else {
            toast({ description: response.message });
        }
    }
  return (
      <div className="grid w-full max-w-sm items-center gap-1.5 ml-3">
          <form action={handleForm}  method="POST">
              <Label htmlFor="roll">Roll</Label>
              <Input className="mb-2" type="number" id="roll" name="rollNumber" required></Input>
              <p className=" mb-2 text-sm text-destructive" role="alert" aria-live="polite">
                  {rollError}
              </p>
              <Label htmlFor="text">Email</Label>
              <Input className="mb-2" type="email" id="email" placeholder="Email" name="email" required />
              <p className=" mb-2 text-sm text-destructive" role="alert" aria-live="polite">
                  {emailError}
              </p>
              <Button type="submit">Add new student</Button>
          </form>
      </div>
  )
}
