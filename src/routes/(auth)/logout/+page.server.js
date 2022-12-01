import { redirect } from "@sveltejs/kit"

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
    throw redirect(302, "/")
}

/** @type {import('./$types').Actions} */
export const actions = {
    default({ cookies }) {
        cookies.set("session", "", {
            path: "/",
            expires: new Date(0)
        })
        throw redirect(302, "/")
    }
}