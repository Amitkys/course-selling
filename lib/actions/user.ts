"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from 'zod';
// import { UserType } from "@/lib/types";

const addUserSchema = z.object({
    rollNumber: z.string().max(3),
    email: z.string().email({message: 'email is not valid'}),
})

export async function addUser(formData: FormData){
    const verifiedData = addUserSchema.safeParse({
        rollNumber: formData.get('rollNumber'),
        email: formData.get('email'),
    })

    if(!verifiedData.success){
        // const error = verifiedData.error.format();
        // console.log(error.email?._errors[0]);
        return { success: false,  message: 'Invalid Data was sent'};
    }

    const {rollNumber, email} = verifiedData.data;

    try{
        const isEmailExist = await prisma.emailWithRoll.findUnique({
            where: {email}
        })
        if (isEmailExist) {
            return { emailError: true, message: 'Email already exist' }
        }

        const isRollExist = await prisma.emailWithRoll.findUnique({
            where: {rollNumber},
        });

        if(isRollExist){
            return {rollError: true, message: `Roll number already exist`}
        }

        await prisma.emailWithRoll.create({
            data: {
                rollNumber,
                email,
            },
        });
        revalidatePath('/admin/adduser');
        return {success: true, message: 'New user added.'};
    }catch(e){
        return {
            success: false,
            message: 'Internal error while adding a new user',
            e // from catch
        }
    }


}

export async function getAllUsers(){
    const data = prisma.user.findMany({
        // where:{isSuperAdmin: false}, //exclude super admin
        orderBy: {id: 'desc'},
        include: {
            emailWithRoll: {
                select: {
                    rollNumber: true
                }
            }
        }
    })
    revalidatePath('/admin/users');
    return data;
    
}

export async function removeAdmin(id : string ) {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    await prisma.user.update({
        where: {id},
        data: {isAdmin: false}
    })
    revalidatePath('/admin/users')
}

export async function makeAdmin(id : string ) {
    await prisma.user.update({
        where: {id},
        data: {isAdmin: true}
    })
    revalidatePath('/admin/users')
}

export async function getAllUserPosts(id: string){
    const data = await prisma.opinion.findMany({
        where: {authorId: id},
        include: {
            author: {
                select: {
                    name: true,
                    email: true,
                    avatar:true
                },
            },
            teacher: {
                select: {
                    name: true
                },
            },
            reactions: {
                where: {userId: id},
                select: {
                    likeStatus: true,
                    dislikeStatus: true,
                },
            },
        }
    });
    return data;
}