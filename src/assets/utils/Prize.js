export const prizes = [
    { name: "1등", weight: 0.5, color:"#f4abab"},
    { name: "2등", weight: 1, color:"#ffe4e4"},
    { name: "3등", weight: 48.5, color:"#f3c4c4"},
    { name: "1등", weight: 0.5, color:"#f4abab"},
    { name: "3등", weight: 48.5, color:"#f3c4c4"},
    { name: "2등", weight: 1, color:"#ffe4e4"},
]

export function weightedRandom(prizes) {
    let total = prizes.reduce((sum, p)=>sum + p.weight, 0)
    let rand = Math.random() * total

    for(let i=0; i<prizes.length; i++) {
        if(rand < prizes[i].weight) {
            return i
        }

        rand -= prizes[i].weight
    }

    return prizes.length - 1
}