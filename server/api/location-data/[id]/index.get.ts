import prisma from "@/lib/prisma"

export default eventHandler(async (event) =>{
     const id = +getRouterParam(event, 'id')!

     const getLocationData = await prisma.locationData.findUnique({
          where: {id:+id}
     })

     return getLocationData

})