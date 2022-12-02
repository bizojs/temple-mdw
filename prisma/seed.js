import bcrypt from "bcrypt"
import crypto from "crypto"
import db from "../src/lib/database.js"
import dotenv from "dotenv"

dotenv.config()

const Admin = {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
}

async function main() {
    console.log("Seeding database...")
    console.time("Database seeded in")
    const roleData = [
        { name: "civ" },
        { name: "leo" }
    ]
    const licenseData = [
        { type: "wl",  name: "Weapon License",              description: "The ability to legally own and carry a firearm"          },
        { type: "dl",  name: "Driver's License",            description: "The ability to own and drive a motor vehicle"            },
        { type: "cdl", name: "Commercial Driver's License", description: "The ability to own and drive a commercial motor vehicle" }
    ]
    roleData.forEach(async (role) => {
        try {
            await db.roles.create({
                data: {
                    name: role.name
                }
            })
            console.log(`Successfully seeded: ROLE:${role.name}`)
        } catch (e) {
            console.log(`Skipping duplicate: ROLE:${role.name}`)
        }
    })
    licenseData.forEach(async (license) => {
        try {
            await db.licenses.create({
                data: {
                    type: license.type,
                    name: license.name,
                    description: license.description,
                }
            })
            console.log(`Successfully seeded: LICENSE:${license.name}`)
        } catch (e) {
            console.log(`Skipping duplicate: LICENSE:${license.name}`)
        }
    })
    try {
        await db.user.create({
            data: {
                username: Admin.username,
                admin: true,
                passwordHash: await bcrypt.hash(Admin.password, 10),
                userAuthToken: crypto.randomUUID(),
            }
        })
        console.log("Successfully seeded: ADMIN")
    } catch (e) {
        console.log("Skipping duplicate: ADMIN")
    }

    console.timeEnd("Database seeded in")
    console.log("Your admin details are:\n", Admin)
}

main()
    .then(async () => {
        await db.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await db.$disconnect()
        process.exit(1)
    })