import { User, Opinion } from "@prisma/client";

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
            isAdmin?: boolean | null;
            isSuperAdmin?: boolean | null;
        };
    }
}

export type UserSession = {
    user: {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
        isAdmin?: boolean | null;
        isSuperAdmin?: boolean | null;
    };
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

export type OpinionDataTypeForUser = {
    id: string;
    teacherId: string;
    statement: string;
    createdAt: Date;
    authorId: string;
    likeCount: number;
    dislikeCount: number;
    reactions: {
        likeStatus: boolean;
        dislikeStatus: boolean;
    }[];
    teacher: {
        name: string;
    };
    author: {
        email: string;
        name: string;
        avatar: string;
    };
};

export type MainRenderPageType = {
    rollNumber: string;
    author: {
        email: string;
        name: string;
    };
    id: string;
    teacherId: string;
    statement: string;
    createdAt: Date;
    authorId: string;
    likeCount: number;
    dislikeCount: number;
    likeStatus: boolean;
    dislikeStatus: boolean;
    teacher: string;
}

