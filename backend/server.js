import express from "express"
import cors from "cors"

import { prizes, weightedRandom } from "../src/assets/utils/Prize.js"


const app = express()

app.use(cors())
app.use(express.json())
app.post("/api/spin", (req,res)=>{

    const resultIndex = weightedRandom(prizes)

    res.json({
        resultIndex,
    })
})

app.listen(5000, ()=>{
    console.log("server running on 5000")
})