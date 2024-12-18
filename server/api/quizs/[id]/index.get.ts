import prisma from '@/lib/prisma'



export default eventHandler(async (event) =>{
    const id = +getRouterParam(event,'id')!
// console.log(id);


    const getQuiz = await prisma.quiz.findUnique({
        where:{
            id
        }
    })

    return getQuiz
})