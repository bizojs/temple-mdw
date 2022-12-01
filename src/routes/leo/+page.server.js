import { redirect } from "@sveltejs/kit"

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals }) => {
    if (!locals.user || !locals.user.callsign) {
        throw redirect(302, "/")
    }
}