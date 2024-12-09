import prisma from '@/lib/prisma'

export default eventHandler(async (event) => {
     const id = +getRouterParam(event, 'id')!

     const getImg = await prisma.image.findUnique({
          where: {id:+id}
     })

     return getImg
})