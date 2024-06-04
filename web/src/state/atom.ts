import { atom } from "recoil";
import { IItemPagina } from "../Interfaces/IItemPagina";

export const itemPagina = atom<IItemPagina>({
    key: 'itemPagina', 
    default: { nomePagina: 'Home', menu: ['Home'] }
    })

export const token = atom<string>({
        key: 'token', 
        default: '' 
    })

export const idLogado = atom({
        key: 'idLogado', 
        default: { id: '', nome: '' }
    })