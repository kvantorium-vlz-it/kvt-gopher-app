import prisma from '@/lib/prisma'

interface Body {
     name: string
     description: string
     point_id: number
     map_id: number
}


export default eventHandler( async (event) => {
     const {name, description, point_id, map_id } = await readBody<Body>(event)
     const id = +getRouterParam(event, 'id')!

     const putLocationData = await prisma.locationData.update({
        where:{
            id
        },  
        data: {
               name,
               description,
               point_id,
               map_id
          }
     })

     return putLocationData
})