"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteTeacher(id: string){
    await prisma.teacher.delete({
        where: {
            id: id
        }
    })
    revalidatePath('/');
}

