import { atom } from "recoil";
import { IItemPagina } from "../Interfaces/IItemPagina";

export const itemPagina = atom<IItemPagina>({
    key: 'itemPagina', 
    default: { nomePagina: 'Home', menu: ['Home'] }
    })
