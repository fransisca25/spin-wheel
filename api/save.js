import { createClient } from "@supabase/supabase-js"


const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {

    console.log("ENV URL:", process.env.SUPABASE_URL)

    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" })
    }

    try {

        console.log("BODY:", req.body)

        const { name, prize } = req.body

        if (!name || name.trim() === "") {
            return res.status(400).json({ message: "Name is required" })
        }

        const { data, error } = await supabase
            .from("results")
            .insert([{ name, prize }])

        if (error) {
            console.error("Supabase error:", error)
            return res.status(500).json({ message: error.message })
        }

        return res.status(200).json({ status: "ok", data })

    } catch (err) {

        console.error("SERVER ERROR:", err)

        return res.status(500).json({
        message: err.message
        })
    }
}