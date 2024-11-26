import prisma from "@/lib/db";

interface FormData{
    
}

export async function addOpinion(formData){
    const data = await prisma.opinion.create({
        data: formData
    }) 
}