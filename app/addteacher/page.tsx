"use client";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AddTeacher } from "@/lib/actions/action";
import { useToast } from "@/hooks/use-toast";

// Define Zod schema for validation
const teacherSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().nullable(),
  branch: z.string().min(1, "Branch is required"),
});
export type TeacherSchema = z.infer<typeof teacherSchema>;

export default function InputDemo() {
    const { toast } = useToast();
  const handleForm = async (formData: FormData) => {
    // "use server";

    // Convert FormData to an object
    const data = Object.fromEntries(formData.entries());

    // Validate using Zod schema
    const validatedData = teacherSchema.parse(data);

    // Use the validated data
    await AddTeacher(validatedData);
    toast({description: 'Teacher Details added.'});
  };

  return (
    <form action={handleForm}>
      <div className="space-y-2">
        <Label htmlFor="input-name">
          Teacher Name <span className="text-destructive">*</span>
        </Label>
        <Input id="input-name" placeholder="Name" name="name" type="text" required />
      </div>

      <Select name="branch">
        <SelectTrigger className="w-[250px]">
          <SelectValue placeholder="Select Branch" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="B.Tech">B.Tech</SelectItem>
          <SelectItem value="MCA">MCA</SelectItem>
        </SelectContent>
      </Select>
      
      <div className="mb-2 flex items-center justify-between gap-1">
        <Label htmlFor="input-email" className="leading-6">
          Email
        </Label>
        <span className="text-sm text-muted-foreground">Optional</span>
      </div>
      <Input id="input-email" placeholder="Email" name="email" type="email" />


      <Button type="submit" className="mt-2">
        Add Teacher
      </Button>
    </form>
  );
}



