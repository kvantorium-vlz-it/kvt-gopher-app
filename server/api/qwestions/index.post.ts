import prisma from '@/lib/prisma'

interface Body {
    text: string
}


eventHandler(async (event) =>{
    const {text} =await readBody<Body>(event)

    const postQuestion = await prisma.question.create({
        data:{
            text
        }
    })
    return postQuestion
}) 