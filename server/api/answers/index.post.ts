import prisma from '@/lib/prisma'

interface Body {
    text: string
    is_true: boolean
}


eventHandler(async (event) =>{
    const {text,is_true} =await readBody<Body>(event)

    const postAnswer = await prisma.answer.create({
        data:{
            text,
            is_true
        }
    })
    return postAnswer
}) 