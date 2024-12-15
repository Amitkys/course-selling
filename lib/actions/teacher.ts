"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";


export async function deleteTeacher(id: string) {
    try {
        // Start a transaction to ensure all deletions are performed atomically
        await prisma.$transaction(async (tx) => {
            // Delete reactions related to opinions by the teacher
            await tx.reaction.deleteMany({
                where: {
                    opinion: {
                        teacherId: id,
                    },
                },
            });

            // Delete opinions by the teacher
            await tx.opinion.deleteMany({
                where: {
                    teacherId: id,
                },
            });

            // Delete the teacher
            await tx.teacher.delete({
                where: {
                    id: id,
                },
            });
        });

        // Revalidate the path to update any related data on the front-end
        revalidatePath('/');
    } catch (error) {
        console.error("Failed to delete teacher and related data:", error);
        throw new Error("Unable to delete teacher. Please try again later.");
    }
}