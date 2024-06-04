import {  selector } from "recoil";
import { idLogado, itemPagina, token } from "../atom";

export const itemPaginaGet = selector({
  key: 'itemPagina',
  get: ({ get }) => get(itemPagina)
});

export const tokenGet = selector({
  key: 'token',
  get: ({ get }) => get(token)
});

export const idLogadoGet = selector({
  key: 'idLogado',
  get: ({ get }) => get(idLogado)
})