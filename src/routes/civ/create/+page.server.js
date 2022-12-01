import { invalid, redirect } from "@sveltejs/kit"

import { db } from "$lib/database"

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals }) => {
    if (!locals.user) {
        throw redirect(302, "/")
    }
}


/** @type {import('./$types').Action} */
export const createCharacter = async ({ cookies, request }) => {
    const data = await request.formData()
    const fullname = data.get("fullname")
    const ethnicity = data.get("ethnicity")
    const dob = data.get("dob")
    const username = data.get("username")

    let birthYear = parseInt(dob.split("-")[0])
    let currentYear = new Date().getFullYear()

    let age = currentYear - birthYear

    let birthDate = new Date(dob)

    let user = await db.user.findUnique({
        where: {
            username
        }
    })

    if (!user) {
        return invalid(400, { credentials: true })
    }

    let newCharacter = await db.character.create({
        data: {
            name: fullname,
            dob: birthDate,
            ethnicity,
            age,
            User: {
                connect: {
                    id: user.id
                }
            }
        }
    })

    throw redirect(302, "/civ/" + newCharacter.id)
}

/** @type {import('./$types').Actions} */
export const actions = { createCharacter }