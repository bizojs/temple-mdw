import { redirect, invalid } from "@sveltejs/kit"
import bcrypt from "bcrypt"

import { db } from "$lib/database"

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals }) => {
    if (!locals.user) {
        throw redirect(302, "/login")
    }
}

/** @type {import('./$types').Action} */
export const editUsername = async ({ request, locals }) => {
    const data = await request.formData()
    const newUsername = data.get("username")
    const username = locals.user.username

    if (newUsername === username) {
        return invalid(400, { message: "You must provide a different username" })
    }

    let exists = await db.user.findUnique({
        where: { username: newUsername }
    })

    if (exists) {
        return invalid(400, { message: "That username is taken" })
    }

    await db.user.update({
        where: { username },
        data: {
            username: newUsername
        }
    })

    return invalid(200, { message: "Username has been updated!" })
}

/** @type {import('./$types').Action} */
export const editPassword = async ({ cookies, request }) => {
    const data = await request.formData()
    let oldPassword = data.get("old-password")
    let oldPasswordConfirm = data.get("confirm-old-password")
    let newPassword = data.get("new-password")
    let username = data.get("currentUsername")

    let user = await db.user.findUnique({
        where: {
            username
        }
    })

    const userPassword = await bcrypt.compare(oldPassword, user.passwordHash)

    if (!userPassword) {
        return invalid(400, { message: "Invalid password" })
    }
    if (oldPassword !== oldPasswordConfirm) {
        return invalid(400, { message: "Passwords don't match" })
    }
    if (oldPassword === newPassword) {
        return invalid(400, { message: "Passwords can't be the same" })
    }

    await db.user.update({
        where: {
            username
        },
        data: {
            passwordHash: await bcrypt.hash(newPassword, 10)
        }
    })

    cookies.set("session", "", {
        path: "/",
        expires: new Date(0)
    })
    
    throw redirect(302, "/login")
}

/** @type {import('./$types').Action} */
export const deleteAccount = async ({ request, locals }) => {
    const data = await request.formData()
    const username = data.get("username")


    for (const character of locals.user.characters) {
        await db.character.update({
            where: { id: character.id },
            data: {
                vehicles: {
                    deleteMany: {}
                }
            }
        })
    }

    await db.user.update({
        where: { username },
        data: {
            characters: {
                deleteMany: {}
            }
        }
    })

    await db.user.delete({
        where: { username },
    })

    throw redirect(302, "/")
}

/** @type {import('./$types').Actions} */
export const actions = { editUsername, editPassword, deleteAccount }