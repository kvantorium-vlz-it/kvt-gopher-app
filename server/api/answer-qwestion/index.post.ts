import prisma from '@/lib/prisma'

interface Body {
    question_id: number
    answer_id: number
}

export default eventHandler( async (event) => {
     const {answer_id, question_id} = await readBody<Body>(event)

     const createAnswerQuestion = await prisma.answerQuestion.create({
          data: {
            answer_id,
            question_id
          }
     })

     return createAnswerQuestion
})