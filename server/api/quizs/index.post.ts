import prisma from '@/lib/prisma'


eventHandler(async (event) =>{
    const postQuiz = await prisma.quiz.create({})
    return postQuiz
})