import prisma from '@/lib/prisma'



eventHandler(async (event) =>{
    const id = +getRouterParam(event,'id')!


    const getQuiz = await prisma.quiz.findUnique({
        where:{
            id
        }
    })



//     const getUtils = await prisma.question.findMany({
//         where:{  QuizQuestions:id  },
//         include:{
//             QuizQuestions:true,
//             AnswerQuestions:true
//         }
//     })

    const getQuestion = await prisma.question.findMany({
        where:{  quiz_id:id  },
        include:{
            // QuizQuestions:true,
            // AnswerQuestions:true
            // Quiz:true,
            Answer:true
        }
    })


    return getQuestion.map((v) => ({
        text: v.text,
        answers:[v.Answer.text, v.Answer.is_true]


    }))
})