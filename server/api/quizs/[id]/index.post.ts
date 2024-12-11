import prisma from '@/lib/prisma'



eventHandler(async (event) =>{
    const id = +getRouterParam(event,'id')!


    const getQuiz = await prisma.quiz.findUnique({
        where:{
            id
        }
    })

    return getQuiz
})