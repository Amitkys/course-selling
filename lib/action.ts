"use server";
import prisma from "@/lib/db";
import { Opinion } from "@/lib/types";
import { addNewStudentType } from "@/lib/types";

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
                    name: true, // Include only the author's name
                },
            },
        },
    });
    console.log(data[0]); // Check the structure of the data
    return data;
}
