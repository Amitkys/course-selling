"use server";

import prisma from "@/lib/db";
import { z } from 'zod';

const addUserSchema = z.object({
    rollNumber: z.string(),
    email: z.string().email({message: 'email is not valid'}),
})

export async function addUser(formData: FormData){
    const verifiedData = addUserSchema.safeParse({
        rollNumber: formData.get('rollNumber'),
        email: formData.get('email'),
    })

    if(!verifiedData.success){
        const error = verifiedData.error.format();
        // console.log(error.email?._errors[0]);
        return { success: false,  message: 'Invalid Data was sent'};
    }

    const {rollNumber, email} = verifiedData.data;

    try{
        const isAlreadyExist = await prisma.emailWithRoll.findUnique({
            where: {rollNumber},
        });

        if(isAlreadyExist){
            return {rollError: true, message: `${rollNumber} is Associated with ${isAlreadyExist.email}`}
        }

        await prisma.emailWithRoll.create({
            data: {
                rollNumber,
                email,
            },
        });
        return {success: true, message: 'New user added.'};
    }catch(e){
        return {
            success: false,
            message: 'Internal error while adding a new user',
            e // from catch
        }
    }


}