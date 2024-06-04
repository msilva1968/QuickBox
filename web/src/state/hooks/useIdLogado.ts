import { useRecoilValue } from "recoil"
import { idLogado } from "../atom"

export const useIdLogado = () => {
    return useRecoilValue(idLogado)   
}
