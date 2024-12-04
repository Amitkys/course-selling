// "use client";     
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addUser } from "@/lib/actions/user";
import React from "react"

export default function PageAddUser() {
    async function handleForm(formData: FormData) {
        "use server";
        
        const response = await addUser(formData);
    }
  return (
      <div className="grid w-full max-w-sm items-center gap-1.5 ml-3">
          <form action={handleForm} >
              <Label htmlFor="roll">Roll</Label>
              <Input className="mb-2" type="number" id="roll" name="rollNumber"></Input>
              <Label htmlFor="email">Email</Label>
              <Input className="mb-2" type="email" id="email" placeholder="Email" name="email" />
              <p className="mt-2 text-sm text-destructive" role="alert" aria-live="polite">
                  Email is invalidV
              </p>
              {/* <FormDescription>Hello bhai</FormDescription> */}
              <Button type="submit">Add new kkkkkstudent</Button>
          </form>
      </div>
  )
}
