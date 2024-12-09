import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import Email from "next-auth/providers/email";

export default function InputDemo() {
    const handleForm = async (formData: FormData) => {
        "use server";
        
        const data = {
            email: formData.get('email')?.toString(),
            message: formData.get('message')?.toString(),
        }
        console.log(data);
    }
  return (
      <form action={handleForm}>
          <div className="space-y-2">
              <Label htmlFor="input-02">
                  Required input <span className="text-destructive">*</span>
              </Label>
              <Input id="input-02" placeholder="Email" name="email" type="email" required />
          </div>

            {/* Optional field  */}
          <div className="mb-2 flex items-center justify-between gap-1">
              <Label htmlFor="input-04" className="leading-6">
                  Input with hint
              </Label>
              <span className="text-sm text-muted-foreground">Optional</span>
          </div>
          <Input  id="input-04" placeholder="Email" name="message" type="text" />

          <Select>
              <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Select Branch"></SelectValue>
              </SelectTrigger>
          </Select>
          <Button type="submit" className="mt-2">Add Teacher</Button>
      </form>
  );
}



