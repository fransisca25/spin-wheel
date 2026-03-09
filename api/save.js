/* eslint-env node */
import { createClient } from "@supabase/supabase-js"


const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            message: "Method not allowed"
        })
    }

    try {

        const { name, prize } = req.body

        if (!name || name.trim() === "") {
            return res.status(400).json({
                message: "Name is required"
            })
        }

        const { error } = await supabase
            .from("results")
            .insert([
                {
                    name: name,
                    prize: prize
                }
            ])

        if (error) {
            console.error(error)

            return res.status(500).json({
                message: "Database error"
            })
        }

        return res.status(200).json({
            status: "ok"
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            message: "Server error"
        })
    }
}