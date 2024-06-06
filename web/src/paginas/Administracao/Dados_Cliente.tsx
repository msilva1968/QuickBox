import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import http from "../../http"
import { Link as RouterLink } from 'react-router-dom'
import ICliente from "../../Interfaces/ICliente"
import { useItemPagina } from "../../state/hooks/useItemPagina"
import { paginaBaseAdmin } from "../../types/PaginaAdministracao"
import { useIdLogado } from '../../state/hooks/useIdLogado';

const ListarClientes = () => {

    const [clientes, setClientes] = useState<ICliente[]>([])
    const itemsPaginaAdmin = useItemPagina()
    const idLogado = useIdLogado().id

    useEffect(() => {
        http.get<ICliente[]>(`cliente/${idLogado}`)
            .then(resposta => setClientes(resposta.data))
    })

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
                    {clientes.map((cliente: any ) => <TableRow key={cliente.id}>
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
                            >editar</RouterLink> ]
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ListarClientes