import NextAuth from "next-auth";
import { TeacherName } from "@prisma/client";

// add this code for removing red squally in 'id'
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}

export interface Opinion{
    statement: string;
    teacher: TeacherName;
    authorId: string;
}
export interface addNewStudentType{
    email: string;
    rollNumber: string;
}
