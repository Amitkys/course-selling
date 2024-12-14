import {  Opinion } from "@prisma/client";

// type based on model in prisma

export type UserType = {
     emailWithRoll: {
        rollNumber: string | null;
    };
} & {
    name: string;
    id: string;
    email: string;
    avatar: string;
    isAdmin: boolean;
    isSuperAdmin: boolean;
}
export type OpinionType = Opinion;


export type TeacherType = {
    name: string;
    email: string | null;
    branch: string | null;
    id: string;
    createdAt: Date;
}


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
    user?: {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
        isAdmin?: boolean | null;
        isSuperAdmin?: boolean | null;
    } | null;
};


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
    id: string; // Unique identifier for the post
    statement: string; // Feedback or opinion text
    createdAt: Date; // Timestamp of post creation
    teacher: string; // Name of the teacher
    likeCount: number; // Number of likes
    dislikeCount: number; // Number of dislikes
    likeStatus?: boolean; // Whether the user liked the post (if session available)
    dislikeStatus?: boolean; // Whether the user disliked the post (if session available)
    rollNumber: string | null | undefined; // Roll number of the author (if session available)
    author: {
        name: string; // Author's name
        email: string; // Author's email
    };
};



