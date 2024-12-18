import prisma from '@/lib/prisma'



export default eventHandler(async (event) =>{
    const id = +getRouterParam(event,'id')!


    // const getQuiz = await prisma.quiz.findUnique({
    //     where:{
    //         id
    //     }
    // })



//     const getUtils = await prisma.question.findMany({
//         where:{  QuizQuestions:id  },
//         include:{
//             QuizQuestions:true,
//             AnswerQuestions:true
//         }
//     })

return  await prisma.quiz.findUnique({
        where: {
            id,
        },
        
        include: {
            Questions: {
                include: {
                    Answers: true,
                }
            }
        }
    })

//     const getQuestion = await prisma.question.findMany({
//         where:{  quiz_id:id  },
//         include:{
//             // QuizQuestions:true,
//             // AnswerQuestions:true
//             Quiz:true,
//             // Answer:true
//         }
//     })

//   const question_id = getQuestion.map((v) => ({id: v.id})) 
            
//  const getAnswer = await prisma.answer.findMany({
//     where{
//         question_id
//     },
  
    
//  })

    // return getQuestion.map((v) => ({
    //     text: v.text,
    //     answers:[v.Answer.text, v.Answer.is_true]


    // }))
})