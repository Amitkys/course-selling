"use client";
import { TeacherType } from "@/lib/definitions";
import { deleteTeacher } from "@/lib/actions/teacher";
import {
  TableHeader,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

export default function ShowAllTeacher({ teachers }: { teachers: TeacherType[] }) {
    const {toast} = useToast();
  const handleDelete = async (id: string) => {
    try {
      await deleteTeacher(id);
        toast({description: "Teacher is deleted."})
    } catch (error) {
      console.error("Failed to delete teacher:", error);
    }
  };

  return (
    <div>
      <h1 className="text-lg font-bold mb-4 ml-2">All Teachers</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Branch</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        {teachers.length > 0 ? (
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell className="font-medium">{teacher.name.split(" ")[0]}</TableCell>
                <TableCell>{teacher.branch ? teacher.branch : "not given"}</TableCell>
                <TableCell className="text-right">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline">Remove</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          All posts related to this teacher will remove too, it can not be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                          <Button
                            className="min-w-[140px]"
                            onClick={() => handleDelete(teacher.id)}
                          >
                            Confirm
                          </Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <div>No Teachers found</div>
        )}
      </Table>
    </div>
  );
}
