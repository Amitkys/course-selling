import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AddUser() {
  return (
      <div className="grid w-full max-w-sm items-center gap-1.5 ml-3">
          <form action="">
              <Label htmlFor="roll">Roll</Label>
              <Input className="mb-2" type="number" id="roll" name="rollNumber"></Input>
              <Label htmlFor="email">Email</Label>
              <Input className="mb-2" type="email" id="email" placeholder="Email" name="email" />
              <Button type="submit">Add new student</Button>
          </form>
      </div>
  )
}
