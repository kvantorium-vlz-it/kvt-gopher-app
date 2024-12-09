import prisma from '@/lib/prisma'

interface Body{
     src: string
     alt: string
}

export default eventHandler(async (event) => {
     const id = +getRouterParam(event, 'id')!
     const {src, alt} = await readBody<Body>(event)

     const putImg = await prisma.image.update({
          where: {
               id
          },
          data: {
               src,
               alt
          }
     })
     return putImg
})