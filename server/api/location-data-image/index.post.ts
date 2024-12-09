import prisma from '@/lib/prisma'

interface Body {
     image_id: number
     location_data_id: number
}

export default eventHandler( async (event) => {
     const {image_id, location_data_id} = await readBody<Body>(event)

     const createLocationDataImage = await prisma.locationDataImage.create({
          data: {
               image_id,
               location_data_id
          }
     })

     return createLocationDataImage
})