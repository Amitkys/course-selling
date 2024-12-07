import { User, TeacherName, Opinion } from "@prisma/client";

// type based on model in prisma

export type UserType = User;
export type OpinionType = Opinion;




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

// export interface Opinion{
//     statement: string;
//     teacher: TeacherName;
//     authorId: string;
// }
export interface addNewStudentType{
    email: string;
    rollNumber: string;
}