import { useSetRecoilState } from "recoil"
import { idLogado } from "../atom"

export const useSetIdLogado = () => {
    const setIdLogado = useSetRecoilState(idLogado)
    return setIdLogado
}
