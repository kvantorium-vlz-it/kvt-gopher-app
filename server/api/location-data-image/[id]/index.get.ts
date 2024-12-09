import prisma from '@/lib/prisma'

export default eventHandler(async (event) =>{
     const id = +getRouterParam(event, 'id')!

     const getLocationDataImage = await prisma.locationDataImage.findUnique({
          where: {id:+id}
     })

     return getLocationDataImage
})