import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import http from "../../http"


import { Link as RouterLink } from 'react-router-dom'
import ICliente from "../../Interfaces/ICliente"
import IEntregador from "../../Interfaces/IEntegrador"
import { useItemPagina } from "../../state/hooks/useItemPagina"
import { paginaBaseAdmin } from "../../types/PaginaAdministracao"

const Listar = () => {

    const [entregadores, setEntregadores] = useState<IEntregador[]>([])
    const [clientes, setClientes] = useState<ICliente[]>([])
    const itemsPaginaAdmin = useItemPagina()

    useEffect(() => {
        if (itemsPaginaAdmin.nomePagina === 'Entregadores') {
            http.get<IEntregador[]>('entregador/')
                .then(resposta => setEntregadores(resposta.data))
        } else {
            http.get<ICliente[]>('cliente/')    
                .then(resposta => setClientes(resposta.data))
        }
    }, [itemsPaginaAdmin.nomePagina])

    const excluir = (ahSerExcluido: IEntregador | ICliente) => {
        if (itemsPaginaAdmin.nomePagina === 'Entregadores') {
            http.delete(`entregador/${ahSerExcluido.id}/`)
                .then(() => {
                    const listaEntregadores = entregadores.filter(entregador => entregador.id !== ahSerExcluido.id)
                    setEntregadores([...listaEntregadores])
                })
        } else {
            http.delete(`cliente/${ahSerExcluido.id}/`)
                .then(() => {
                    const listaClientes = clientes.filter(cliente => cliente.id !== ahSerExcluido.id)
                    setClientes([...listaClientes])
                })
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            {itemsPaginaAdmin.nomePagina==='Empresas' ? 'Cnpj' : 'Cpf'}
                        </TableCell>
                        {itemsPaginaAdmin.nomePagina==='Entregadores' ? <TableCell>
                            Cnh
                        </TableCell> : null}
                        <TableCell>
                            Email
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {itemsPaginaAdmin.nomePagina === 'Entregadores' ? entregadores.map(entregador => <TableRow key={entregador.id}>
                        <TableCell>
                            {entregador.nome}
                        </TableCell>
                        <TableCell>
                            {entregador.cpf}    
                        </TableCell>
                        <TableCell>
                            {entregador.cnh}
                        </TableCell>
                        <TableCell> 
                            {entregador.email}
                        </TableCell>    
                        <TableCell>
                            [ <RouterLink to={`${paginaBaseAdmin}Cadastrar/${entregador.id}`}
                            >editar</RouterLink> ]
                        </TableCell>
                        <TableCell>
                            <Button variant="outlined" color="error" onClick={() => excluir(entregador)}>
                                Excluir
                            </Button>
                        </TableCell>
                    </TableRow>) : clientes.map(cliente => <TableRow key={cliente.id}>
                        <TableCell>
                            {cliente.nome}
                        </TableCell>
                        <TableCell>
                            {cliente.cnpj}
                        </TableCell>
                        <TableCell>
                            {cliente.email}
                        </TableCell>
                        <TableCell>
                            [ <RouterLink to={`${paginaBaseAdmin}Cadastrar/${cliente.id}`}
                            >editar</RouterLink> ]
                        </TableCell>
                        <TableCell>
                            <Button variant="outlined" color="error" onClick={() => excluir(cliente)}>
                                Excluir
                            </Button>
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Listar