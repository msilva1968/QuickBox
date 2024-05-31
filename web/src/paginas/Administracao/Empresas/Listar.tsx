import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import http from "../../../http"


import { Link as RouterLink } from 'react-router-dom'
import ICliente from "../../../Interfaces/ICliente"
import { useItemPagina } from "../../../state/hooks/useItemPagina"
import { paginaBaseAdmin } from "../../../types/PaginaAdministracao"

const ListarClientes = () => {

    const [clientes, setClientes] = useState<ICliente[]>([])
    const itemsPaginaAdmin = useItemPagina()

    useEffect(() => {
        http.get<ICliente[]>('cliente/')
            .then(resposta => setClientes(resposta.data))
    }, [])

    const excluir = (clienteAhSerExcluido: ICliente) => {
        http.delete(`cliente/${clienteAhSerExcluido.id}/`)
            .then(() => {
                const listaClientes = clientes.filter(cliente => cliente.id !== clienteAhSerExcluido.id)
                setClientes([...listaClientes])
            })
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
                            Cnpj
                        </TableCell>
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
                    {clientes.map(cliente => <TableRow key={cliente.id}>
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
                            [ <RouterLink to={`${paginaBaseAdmin}${itemsPaginaAdmin.nomePagina}/Cadastrar/${cliente.id}`}
                            //</TableCell>{`/admin/cliente/${cliente.id}`}
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

export default ListarClientes