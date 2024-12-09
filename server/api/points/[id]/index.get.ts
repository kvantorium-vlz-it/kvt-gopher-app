import prisma from "@/lib/prisma"

export default eventHandler(async (event) =>{
     const id = +getRouterParam(event, 'id')!

     const getPoint = await prisma.point.findUnique({
          where: {id:+id}
     })

     return getPoint

})