import prisma from '@/lib/prisma'
import { Text } from 'vue'



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

const utils = await prisma.quiz.findUnique({
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
    


    // const _ = {...utils,Questions: utils?.Questions.map((v) => v.Answers.filter((vv) => vv.is_true))}

    return utils
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