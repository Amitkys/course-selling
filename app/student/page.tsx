"use client";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addNewStudentType } from "@/lib/types";
import { addNewStudent } from "@/lib/actions/action";
import { useToast } from "@/hooks/use-toast";


export default function InputWithLabel() {
    const {toast} = useToast();

    const formHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement)

        const data: addNewStudentType = {
            email: formData.get('email') as string,
            rollNumber: formData.get('rollNumber') as string,
        }

        // console.log(data);
        await addNewStudent(data);
        toast({description: 'New Student Added'});

    }
  return (
      <div className="flex items-center justify-center h-screen flex-col">
          <div className="mt-[-200px] font-bold text-xl">Add New Student</div>
          <form onSubmit={formHandler} className="w-full mt-[40px] max-w-sm space-y-4" action="">
              <div>
                  <Label className="lg:text-lg" htmlFor="email">Email</Label>
                  <Input className="lg:text-lg" type="email" name="email" id="email" placeholder="Email" />
              </div>
              <div>
                  <Label className="lg:text-lg" htmlFor="number">Roll Number</Label>
                  <Input className="lg:text-lg" type="number" id="number" name="rollNumber" placeholder="Roll Number" />
              </div>
              <div className="flex justify-center">
                  <Button className="font-bold w-full">Add</Button>
              </div>
          </form>
      </div>
  )
}
                                 