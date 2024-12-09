import prisma from '@/lib/prisma'

interface Body {
     name: string
}

export default eventHandler(async (event) => {
     const { name } = await readBody<Body>(event)
     const id = +getRouterParam(event, 'id')!

     const putMap = await prisma.map.update({
          where: { id },
          data: {
               name
          }
     })

     return putMap

})