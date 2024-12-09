import prisma from '@/lib/prisma'

interface Body {
     name: string
     description: string
     point_id: number
     map_id: number
}


export default eventHandler( async (event) => {
     const {name, description, point_id, map_id} = await readBody<Body>(event)

     const createLocationData = await prisma.locationData.create({
          data: {
               name,
               description,
               point_id,
               map_id
          }
     })

     return createLocationData
})