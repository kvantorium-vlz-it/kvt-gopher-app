import prisma from '@/lib/prisma'

interface Body {
    text: string
    is_true: boolean
    question_id: number
}


 export default eventHandler(async (event) =>{
    const {text,is_true,question_id} = await readBody<Body>(event)

    const postAnswer = await prisma.answer.create({
        data:{
            text,
            is_true,
            question_id
        }
    })
    return postAnswer
}) 