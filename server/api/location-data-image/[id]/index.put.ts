import prisma from '@/lib/prisma'

interface Body {
     image_id: number
     location_data_id: number
}

export default eventHandler(async (event) => {
     const id = +getRouterParam(event, 'id')!
     const { image_id, location_data_id} = await readBody<Body>(event)

     const putLocationDataImage = await prisma.locationDataImage.update({
          where: { id },
          data: {
               image_id,
               location_data_id
          }

     })

     return putLocationDataImage

})