import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import http from "../../http"
import { Link as RouterLink } from 'react-router-dom'
import { paginaBaseAdmin } from "../../types/PaginaAdministracao"
import { useIdLogado } from '../../state/hooks/useIdLogado';
import IEntregador from "../../Interfaces/IEntegrador"

const ListarEntregador = () => {

    const [entregador, setEntregador] = useState<IEntregador[]>([])
    const idLogado = useIdLogado().id

    useEffect(() => {
        http.get<IEntregador[]>(`entregador/editaentregador/${idLogado}`)
            .then(resposta => setEntregador(resposta.data))
    },[entregador,idLogado])

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            CPF
                        </TableCell>
                        <TableCell>
                            Email
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {entregador.map((entregador: any ) => (<TableRow key={entregador.id}>
                        <TableCell>
                            {entregador.nome}
                        </TableCell>
                        <TableCell>
                            {entregador.cpf}
                        </TableCell>
                        <TableCell>
                            {entregador.email}
                        </TableCell>
                        <TableCell>
                            [ <RouterLink to={`${paginaBaseAdmin}Cadastrar/${entregador.id}`}
                            >editar</RouterLink> ]
                        </TableCell>
                    </TableRow>))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ListarEntregador