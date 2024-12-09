import prisma from "@/lib/prisma"

interface Body{
     id: number
}

export default eventHandler(async (event) =>{
     const id = getRouterParam(event, 'id')!

     const getMap = await prisma.map.findUnique({
          where: { id: +id }
     })

     return getMap
})