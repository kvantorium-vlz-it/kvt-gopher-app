import prisma from '@/lib/prisma'

interface Body {
     name: string
}


export default eventHandler( async (event) => {
     const {name} = await readBody<Body>(event)

     const createMap = await prisma.map.create({
          data: {
               name
          }
     })

     return createMap
})