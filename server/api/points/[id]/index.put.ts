import prisma from '@/lib/prisma'

interface Body {
     long: number
     lat: number
}

export default eventHandler(async (event) => {
     const { long, lat } = await readBody<Body>(event)
     const id = +getRouterParam(event, 'id')!

     const putPoint = await prisma.point.update({
          where: { id },
          data: {
               long,
               lat
          }

     })

     return putPoint

})