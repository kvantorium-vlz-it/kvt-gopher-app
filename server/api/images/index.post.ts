import prisma from '@/lib/prisma'

interface Body{
     src: string
     alt: string
}

export default eventHandler( async (event) =>{
     const {src, alt} = await readBody<Body>(event)

     const createImg = await prisma.image.create({
          data: {
               src,
               alt
          }
     })

     return createImg
})