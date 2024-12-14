"use client";
import { TeacherType } from "@/lib/definitions";
import { deleteTeacher } from "@/lib/actions/teacher";
import { TableHeader, Table, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function ShowAllTeacher({ teachers }: { teachers: TeacherType[] }) {


    return (
        <div>
            <h1 className="text-lg font-bold mb-4">All Teachers</h1>
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
                                <TableCell>{teacher.branch ? teacher.branch : 'not given'}</TableCell>
                                <TableCell>
                                    <Button onClick={async () => await deleteTeacher(teacher.id)}>Remove</Button>
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