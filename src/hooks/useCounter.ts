import { useState } from "react"

export const useCounter = () => {
    const [count, setCount] = useState(0)

    const increase = () => setCount((current) => current + 1)
    const decrease = () => setCount((current) => current - 1)

    return { count, increase, decrease }
}