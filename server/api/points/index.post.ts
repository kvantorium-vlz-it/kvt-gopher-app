import prisma from '@/lib/prisma'

interface Body {
     long: number
     lat: number
}


export default eventHandler( async (event) => {
     const {long,lat} = await readBody<Body>(event)

     const createPoint = await prisma.point.create({
          data: {
               long,
               lat
          }
     })

     return createPoint
})