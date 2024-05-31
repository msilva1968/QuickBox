import {  selector } from "recoil";
import { itemPagina } from "../atom";

export const itemPaginaGet = selector({
  key: 'itemPagina',
  get: ({ get }) => get(itemPagina)
});
