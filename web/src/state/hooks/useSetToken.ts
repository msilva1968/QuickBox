import { useSetRecoilState } from "recoil"
import { token } from "../atom"

export const useSetToken = () => {
    const setToken = useSetRecoilState<string>(token)
    return setToken
}
