"use server";
import prisma from "@/lib/db";
import { Opinion } from "@/lib/types";
import { addNewStudentType } from "@/lib/types";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { MainRenderPageType, UserSession } from "@/lib/types";

import {  z } from "zod";

const OpninonSchema = z.object({
    teacher: z.string(),
    statement: z.string(),
})

export async function getSessionFromServer(): Promise<UserSession> {
    const session = await getServerSession(authOptions);

    return {
        user: session?.user || null, // Return the `user` object or `null` if the session doesn't exist
    };
}



// add feedback
export async function addOpinion(formData: FormData) {
    
     // Extract form data
    const teacher = formData.get("teacher")?.toString();
    const statement = formData.get("statement")?.toString();
    console.log(teacher, statement);



    // const prismaData = {
    //     statement: data.statement,
    //     teacher: data.teacher,
    //     author: {connect : {id: data.authorId}}, //map relation
    // }

    // const res = await prisma.opinion.create({
    //     data: prismaData,
    // });
    // console.log(res);
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
export async function getPost(isSessionAvailable: boolean): Promise<MainRenderPageType[]> {
    let data;

    if (isSessionAvailable) {
        const session = await getServerSession(authOptions) as UserSession;
        if (!session || !session.user) {
            throw new Error("User not authenticated");
        }

        const currentUserId = session.user.id;

        // Fetch data for authenticated users
        data = await prisma.opinion.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                reactions: {
                    where: { userId: currentUserId },
                    select: {
                        likeStatus: true,
                        dislikeStatus: true,
                    },
                },
                teacher: { // Ensure the teacher is fetched
                    select: {
                        name: true,
                    },
                },
            },
        });

        const postsWithRollNumbers = await Promise.all(
            data.map(async (post) => {
                const emailWithRoll = await prisma.emailWithRoll.findUnique({
                    where: { email: post.author.email },
                    select: { rollNumber: true },
                });

                return {
                    ...post,
                    rollNumber: emailWithRoll?.rollNumber || "Unknown",
                    likeStatus: post.reactions[0]?.likeStatus || false,
                    dislikeStatus: post.reactions[0]?.dislikeStatus || false,
                    teacher: post.teacher?.name || "Unknown", // Ensure `teacher` is always populated
                };
            })
        );

        return postsWithRollNumbers;
    } else {
        data = await prisma.opinion.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                teacher: { // Ensure the teacher is fetched
                    select: {
                        name: true,
                    },
                },
            },
        });

        const postsWithRollNumbers = await Promise.all(
            data.map(async (post) => {
                const emailWithRoll = await prisma.emailWithRoll.findUnique({
                    where: { email: post.author.email },
                    select: { rollNumber: true },
                });

                return {
                    ...post,
                    rollNumber: emailWithRoll?.rollNumber || "Unknown",
                    teacher: post.teacher?.name || "Unknown", // Ensure `teacher` is always populated
                };
            })
        );

        return postsWithRollNumbers;
    }
}


async function increaseLike(opinionId: string) {
    await prisma.opinion.update({
        where: {
            id: opinionId,
        },
        data: {
            likeCount: {
                increment: 1, // Increases the likeCount by 1
            },
        },
    });
    revalidatePath('/feedback')
}


async function decreaseLike(opinionId: string) {
    await prisma.opinion.update({
        where: {
            id: opinionId,
        },
        data: {
            likeCount: {
                decrement: 1, // decrease the likeCount by 1
            },
        },
    });
    revalidatePath('/feedback')
}

async function increaseDisLike(opinionId: string) {
    await prisma.opinion.update({
        where: {
            id: opinionId,
        },
        data: {
            dislikeCount: {
                increment: 1, // decrease the likeCount by 1
            },
        },
    });
    revalidatePath('/feedback')
}

async function decreaseDisLike(opinionId: string) {
    await prisma.opinion.update({
        where: {
            id: opinionId,
        },
        data: {
            dislikeCount: {
                decrement: 1, // decrease the likeCount by 1
            },
        },
    });
    revalidatePath('/feedback')
}



export async function handleLike(opinionId: string) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        throw new Error("User not authenticated");
    }

    const userId = session.user.id;

    // Check the existing reaction
    const existingReaction = await prisma.reaction.findUnique({
        where: {
            opinionId_userId: {
                opinionId,
                userId,
            },
        },
    });

    if (existingReaction) {
        if (existingReaction.likeStatus) {
            // If already liked, remove the reaction
            await prisma.reaction.delete({
                where: { id: existingReaction.id },
            });
            await decreaseLike(opinionId); // Decrease the like count
        } else if (existingReaction.dislikeStatus) {
            // If disliked, switch to like
            await prisma.reaction.update({
                where: { id: existingReaction.id },
                data: {
                    likeStatus: true,
                    dislikeStatus: false,
                },
            });
            await increaseLike(opinionId); // Increase the like count
            await decreaseDisLike(opinionId); // Decrease the dislike count
        }
    } else {
        // If no reaction exists, add a like
        await prisma.reaction.create({
            data: {
                opinionId,
                userId,
                likeStatus: true,
                dislikeStatus: false,
            },
        });
        await increaseLike(opinionId); // Increase the like count
    }

    const likeStatus = await prisma.reaction.findUnique({
        where: {
            opinionId_userId: {
                opinionId,
                userId,
            },
        },
    })
    return likeStatus;
}

export async function handleDislike(opinionId: string) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        throw new Error("User not authenticated");
    }

    const userId = session.user.id;

    // Check the existing reaction
    const existingReaction = await prisma.reaction.findUnique({
        where: {
            opinionId_userId: {
                opinionId,
                userId,
            },
        },
    });

    if (existingReaction) {
        if (existingReaction.dislikeStatus) {
            // If already disliked, remove the reaction
            await prisma.reaction.delete({
                where: { id: existingReaction.id },
            });
            await decreaseDisLike(opinionId); // Decrease the dislike count
        } else if (existingReaction.likeStatus) {
            // If liked, switch to dislike
            await prisma.reaction.update({
                where: { id: existingReaction.id },
                data: {
                    likeStatus: false,
                    dislikeStatus: true,
                },
            });
            await decreaseLike(opinionId); // Decrease the like count
            await increaseDisLike(opinionId); // Increase the dislike count
        }
    } else {
        // If no reaction exists, add a dislike
        await prisma.reaction.create({
            data: {
                opinionId,
                userId,
                likeStatus: false,
                dislikeStatus: true,
            },
        });
        await increaseDisLike(opinionId); // Increase the dislike count
    }

    const dislikeStatus = await prisma.reaction.findUnique({
        where: {
            opinionId_userId: {
                opinionId,
                userId,
            },
        },
    })
    return dislikeStatus;
}
