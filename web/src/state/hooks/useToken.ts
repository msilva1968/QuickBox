import { useRecoilValue } from "recoil"
import { token } from "../atom"

export const useToken = () => {
    return useRecoilValue(token)   
}
