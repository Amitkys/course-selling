"use client";

// import { useSession } from "next-auth/react";
import { addOpinion, getTeachers } from "@/lib/actions/action";
import {  useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function opinion() {
    const router = useRouter();
  const { toast } = useToast();

  // State to track teacher data and loading
  const [teachers, setTeachers] = useState<{ id: string; name: string }[]>([]);
  const [isTeachersLoading, setIsTeachersLoading] = useState(true);

  const handleFetchTeachers = async () => {
    try {
      const data = await getTeachers();
      setTeachers(data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setIsTeachersLoading(false);
    }
  };

  useEffect(() => {
    handleFetchTeachers();
  }, []);

  // Handle form submission
  const handleForm = async (formData: FormData) => {
    try {
      await addOpinion(formData);
      toast({description: "Opinion added"});
    //   redirect('/feedback');
    router.push("/feedback");
    } catch (e) {
      console.error("Error submitting feedback", e);
    //   toast({ description: "Failed to submit feedback." });
    }
  };

  return (
    <div className="flex items-center h-screen w-full flex-col">
      <form className="w-full mt-20" action={handleForm}>
        <Select name="teacher" disabled={isTeachersLoading}>
          <SelectTrigger className="w-[250px] text-sm lg:text-lg mb-3 font-bold">
            <SelectValue  placeholder={isTeachersLoading ? "Loading Teacher.." : "Select Teacher"} />
          </SelectTrigger>

          <SelectContent>
            {teachers.map((teacher) => (
              <SelectItem
                key={teacher.id}
                className="text-sm lg:text-lg font-bold text-center"
                value={teacher.id}
              >
                {teacher.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Label className="text-sm lg:text-lg font-bold" htmlFor="statement">
          Write Statement
        </Label>
        <Textarea
          rows={4}
          name="statement"
          id="statement"
          placeholder="Write your opinion here..."
          required
          className="mb-2 text-sm lg:text-lg font-bold"
        />

        <div className="flex justify-center">
          <Button className="font-bold w-full lg:w-1/3" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
