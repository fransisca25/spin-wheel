import { useState } from "react"
import { prizes } from "../utils/Prize.js"
import "../styles/wheel.css"


export default function SpinWheel() {
    const sliceAngle = 360 / prizes.length;

    const [spinning,setSpinning] = useState(false)
    const [rotation,setRotation] = useState(-sliceAngle / 2)
    const [result,setResult] = useState(null)
    const [showPopup,setShowPopup] = useState(false)

    const gradient = prizes.map((p, i)=>{
        const start = i * sliceAngle
        const end = start + sliceAngle

        return `${p.color} ${start}deg ${end}deg`
    })
    .join(",")


    async function spin() {
        if(spinning) return

        const res = await fetch("http://localhost:5000/api/spin", {method:"POST"})
        const data = await res.json()
        const resultIndex = data.resultIndex

        setSpinning(true)

        const centerAngle = resultIndex * sliceAngle + sliceAngle / 2
        const pointerAngle = 0
        const targetAngle = pointerAngle - centerAngle
        const extraSpin = 360 * 20
        const finalRotation = rotation + extraSpin + (targetAngle - (rotation % 360))

        setRotation(finalRotation);

        setTimeout(()=>{
            setSpinning(false)
            setResult(prizes[resultIndex].name)
            setShowPopup(true)
        }, 5000)
    }

    return(
        <div className="wheel-container">
            <div className="pointer"></div>
            <div
                className="wheel"
                style={{
                    transform:`rotate(${rotation}deg)`,
                    background:`conic-gradient(${gradient})`
                }}
            >
                {prizes.map((p,i)=>{
                    const angle = sliceAngle * i + sliceAngle/2

                    return(
                        <div
                            key={i}
                            className="label"
                            style={{
                                transform:`rotate(${angle}deg) translate(-50%,-180px)`
                            }}
                        > {p.name}
                        </div>
                    )
                })}
            </div>
            
            <button
                onClick={spin}
                className="spin-button"
            > SPIN </button>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>You got {result}!</h2>
                        <button onClick={()=>setShowPopup(false)}>OK</button>
                    </div>
                </div>
            )}
        </div>   
    )
}