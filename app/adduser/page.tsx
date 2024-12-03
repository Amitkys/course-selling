"use client";     
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addNewStudentType } from "@/lib/types"
import React from "react"

export default function AddUser() {
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);

        const data: addNewStudentType = {
            email: formData.get('email') as string,
            rollNumber: formData.get('rollNumber') as string
        }
        console.log(data);

    }
  return (
      <div className="grid w-full max-w-sm items-center gap-1.5 ml-3">
          <form action="" onSubmit={handleSubmit}>
              <Label htmlFor="roll">Roll</Label>
              <Input className="mb-2" type="number" id="roll" name="rollNumber"></Input>
              <Label htmlFor="email">Email</Label>
              <Input className="mb-2" type="email" id="email" placeholder="Email" name="email" />
              <Button  type="submit">Add new student</Button>
          </form>
      </div>
  )
}
