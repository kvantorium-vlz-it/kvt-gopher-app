import prisma from '@/lib/prisma'


export default eventHandler(async (event) =>{
    const postQuiz = await prisma.quiz.create({
     
    })
    return postQuiz
})