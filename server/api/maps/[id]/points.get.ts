import prisma from '@/lib/prisma'

export default eventHandler(async (event) => {
     const id = getRouterParam(event, 'id')!

     const locationDataWithPoints = await prisma.locationData.findMany({
        where:{ map_id:+id },
        include: {
            point: true,
        }
    })

    return locationDataWithPoints.map((v) => ({ long: v.point.long, lat: v.point.lat, point_id: v.point_id, location_data_id: v.id }))


})