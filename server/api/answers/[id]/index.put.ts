import prisma from '@/lib/prisma'

interface Body {
     text: string
     is_true: boolean
}

export default eventHandler(async (event) => {
     const { text, is_true } = await readBody<Body>(event)
     const id = +getRouterParam(event, 'id')!

     const putAnswer = await prisma.answer.update({
          where: { id },
          data: {
               text,
               is_true
          }
     })

     return putAnswer

})