import { redirect } from "@sveltejs/kit"

import { db } from "$lib/database"

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals }) => {
    if (!locals.user || !locals.user.callsign) {
        throw redirect(302, "/")
    }
    let vehicles = await db.vehicle.findMany({
        select: {
            make: true,
            model: true,
            plate: true,
            character: true,
            stolen: true
        }
    })
    let characters = await db.character.findMany({
        select: {
            id: true,
            name: true,
            dob: true,
            age: true,
            ethnicity: true,
            vehicles: true,
            licenses: true
        }
    })

    return { characters, vehicles }
}

/** @type {import('./$types').Action} */
export const resetCallsign = async ({ cookies, request, locals }) => {

    await db.user.update({
        where: {
            id: locals.user.id
        },
        data: {
            callsign: null
        }
    })

    throw redirect(302, "/")
}

/** @type {import('./$types').Actions} */
export const actions = { resetCallsign }