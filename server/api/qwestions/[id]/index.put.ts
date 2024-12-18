import prisma from '@/lib/prisma'

interface Body {
     text: string
     quiz_id: number 
 }

export default eventHandler(async (event) => {
     const {text,quiz_id} = await readBody<Body>(event)
     const id = +getRouterParam(event, 'id')!

     const putQuestion = await prisma.question.update({
          where: { id },
          data: {
               text,
               quiz_id
          }
     })

     return putQuestion

})