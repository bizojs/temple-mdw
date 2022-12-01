import { db } from "$lib/database"
import { invalid, redirect } from "@sveltejs/kit"

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params, locals }) => {

    if (!locals.user) {
        throw redirect(302, "/")
    }

    if (!params.id) {
        throw redirect(302, "/")
    }

    let character = await db.character.findUnique({
        where: { id: params.id },
        select: {
            id: true,
            name: true,
            dob: true,
            age: true,
            ethnicity: true,
            vehicles: true
        }
    })
    if (!character) {
        throw redirect(302, "/")
    }
    return { character }
}

/** @type {import('./$types').Action} */
export const deleteCharacter = async ({ cookies, request }) => {
    const data = await request.formData()
    const id = data.get("id")

    let character = await db.character.findUnique({
        where: { id }
    })

    if (!character) {
        return invalid(400, { credentials: true })
    }

    await db.character.delete({
        where: { id }
    })

    throw redirect(302, "/")
}

/** @type {import('./$types').Action} */
export const registerVehicle = async ({ cookies, request }) => {
    const data = await request.formData()
    const username = data.get("username")
    const character = data.get("character")
    const make = data.get("make")
    const model = data.get("model")
    const plate = data.get("plate")
    const stolen = data.get("stolen") === "on" ? true : false

    let plateExists = await db.vehicle.findUnique({
        where: { plate }
    })

    if (plateExists) {
        return invalid(400, { message: "That plate already exists" })
    }

    let user = await db.user.findUnique({
        where: { username }
    })

    if (!user) {
        return invalid(400, { message: "Invalid user found" })
    }

    await db.vehicle.create({
        data: {
            make,
            model,
            plate,
            stolen,
            character: {
                connect: {
                    id: character
                }
            }
        }
    })

    return invalid(200, { message: "Vehicle registered" })
}

/** @type {import('./$types').Action} */
export const deleteVehicle = async ({ cookies, request }) => {
    const data = await request.formData()
    const vehicleId = parseInt(data.get("vehicleId"))
    const id = data.get("id")

    let character = await db.character.findUnique({
        where: { id }
    })

    if (!character) {
        return invalid(400, { message: "Character not found" })
    }

    let vehicle = await db.vehicle.findUnique({ 
        where: { id: vehicleId }
    })

    await db.vehicle.delete({
        where: { id: vehicleId }
    })

    return invalid(200, {
        message: `Vehicle ${vehicle.make} ${vehicle.model} with plate "${vehicle.plate}" is no longer registered to you`
    })
}

/** @type {import('./$types').Action} */
export const editVehicle = async ({ cookies, request }) => {
    const data = await request.formData()
    const username = data.get("username")
    const id = parseInt(data.get("id"))
    const make = data.get("make")
    const model = data.get("model")
    const plate = data.get("plate")
    const stolen = data.get("stolen") === "true" ? true : false
    const current = data.get("currentStolen") === "true" ? true : false

    let user = await db.user.findUnique({
        where: { username }
    })

    if (!user) {
        return invalid(400, { message: "Invalid user found" })
    }

    await db.vehicle.update({
        where: { id },
        data: {
            make,
            model,
            plate,
            stolen: current && stolen ? current : stolen
        }
    })

    return invalid(200, { message: "Vehicle details updated" })
}

/** @type {import('./$types').Action} */
export const editCharacter = async ({ cookies, request }) => {
    const data = await request.formData()
    const fullname = data.get("fullname")
    const ethnicity = data.get("ethnicity")
    const dob = data.get("dob")
    const username = data.get("username")
    const id = data.get("character")

    let birthYear = parseInt(dob.split("-")[0])
    let currentYear = new Date().getFullYear()

    let age = currentYear - birthYear

    let birthDate = new Date(dob)

    let user = await db.user.findUnique({
        where: { username }
    })

    if (!user) {
        return invalid(400, { message: "Invalid user found" })
    }

    await db.character.update({
        where: { id },
        data: {
            name: fullname,
            ethnicity,
            age,
            dob: birthDate
        }
    })

    return invalid(200, { message: "Your character has been updated" })
}

/** @type {import('./$types').Actions} */
export const actions = { deleteCharacter, registerVehicle, deleteVehicle, editVehicle, editCharacter }