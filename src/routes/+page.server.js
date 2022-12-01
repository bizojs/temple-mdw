import { invalid, redirect } from "@sveltejs/kit"

import { db } from "$lib/database"


/** @type {import('./$types').Action} */
export const startShift = async ({ cookies, request }) => {
    const data = await request.formData()
    const callsign = data.get("callsign")
    const username = data.get("username")

    const user = await db.user.findUnique({
        where: { username }
    })

    if (!user) {
        return invalid(400, { credentials: true })
    }

    await db.user.update({
        where: { username: user.username },
        data: {
            callsign
        }
    })

    throw redirect(302, "/leo")
}

/** @type {import('./$types').Actions} */
export const actions = { startShift }