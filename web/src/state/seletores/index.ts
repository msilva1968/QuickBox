import {  selector } from "recoil";
import { itemPagina, token } from "../atom";

export const itemPaginaGet = selector({
  key: 'itemPagina',
  get: ({ get }) => get(itemPagina)
});

export const tokenGet = selector({
  key: 'token',
  get: ({ get }) => get(token)
});