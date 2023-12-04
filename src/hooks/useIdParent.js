import { useContext } from "react"
import { IdContext } from "../context/IdParentContext"

export const useContextIdParent = ()=>{
    return useContext(IdContext)
}