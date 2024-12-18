import prisma from '@/lib/prisma'

interface Body {
    text: string
    quiz_id: number 
}


export default eventHandler(async (event) =>{
    const {text,quiz_id} =await readBody<Body>(event)

    const postQuestion = await prisma.question.create({
        data:{
            text,
            quiz_id
        }
    })
    return postQuestion
}) 