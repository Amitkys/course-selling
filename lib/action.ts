"use server";
import prisma from "@/lib/db";
import { Opinion } from "@/lib/types";
import { addNewStudentType } from "@/lib/types";

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