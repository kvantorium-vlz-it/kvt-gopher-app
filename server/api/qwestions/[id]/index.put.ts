import prisma from '@/lib/prisma'

interface Body {
     text: string
}

export default eventHandler(async (event) => {
     const { text } = await readBody<Body>(event)
     const id = +getRouterParam(event, 'id')!

     const putQuestion = await prisma.question.update({
          where: { id },
          data: {
               text
          }
     })

     return putQuestion

})