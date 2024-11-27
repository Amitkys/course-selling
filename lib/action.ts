"use server";
import prisma from "@/lib/db";
import { Opinion } from "@/lib/types";
import { addNewStudentType } from "@/lib/types";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

// add feedback
export async function addOpinion(data: Opinion) {
    const prismaData = {
        statement: data.statement,
        teacher: data.teacher,
        author: {connect : {id: data.authorId}}, //map relation
    }

    const res = await prisma.opinion.create({
        data: prismaData,
    });
    console.log(res);
}

// add new student with roll number
export async function addNewStudent(data: addNewStudentType ) {
    const prismaData = {
        email: data.email,
        rollNumber: data.rollNumber
    }

    const res = await prisma.emailWithRoll.create({
        data: prismaData
    });

    console.log('data added');
}

// getting all feedback
export async function getPost() {
    const data = await prisma.opinion.findMany({
        include: {
            author: {
                select: {
                    name: true, // Include author's name
                    email: true, // Include author's email
                },
            },
        },
    });

    // Add rollNumber by joining with EmailWithRoll model
    const postsWithRollNumbers = await Promise.all(
        data.map(async (post) => {
            const emailWithRoll = await prisma.emailWithRoll.findUnique({
                where: { email: post.author.email }, // Match on email
                select: { rollNumber: true }, // Get the rollNumber
            });

            return {
                ...post,
                rollNumber: emailWithRoll?.rollNumber || "Unknown", // Include rollNumber or default value
            };
        })
    );

    return postsWithRollNumbers;
}
