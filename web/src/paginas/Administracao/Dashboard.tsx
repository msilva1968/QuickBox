import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import http from "../../http"

import { useItemPagina } from "../../state/hooks/useItemPagina"
import IListaEntrega from "../../Interfaces/IEntrega"
import { useIdLogado } from "../../state/hooks/useIdLogado"
import IEntrega from "../../Interfaces/IEntrega"
import {  useNavigate } from "react-router-dom"
import { paginaBaseAdmin } from "../../types/PaginaAdministracao"

const Dashboard = () => {

    const id = useIdLogado();
    const [entregas, setEntregas] = useState<IListaEntrega[]>([])
    
    const itemsPaginaAdmin = useItemPagina()
    const navigate = useNavigate()

    useEffect(() => {
        if (itemsPaginaAdmin.nomePagina === 'Entregadores') {
            http.get(`entrega/entregador/${id.id}`)	
                .then(resposta => {
                       const entregas: IListaEntrega[] = []
                       Object.assign(entregas,resposta.data)
                       setEntregas(entregas)
                       }
                    )
                .catch(error => {
                    alert(error.response.data.message)
                });
        } else {
            http.get(`entrega/empresa/${id.id}`)	    
                .then(resposta => {
                       const entregas: IListaEntrega[] = [];
                       Object.assign(entregas,resposta.data);
                       setEntregas(entregas);
                       }
                    )
                .catch(error => {
                    alert(error.response.data.message)
                });
        }
    },[itemsPaginaAdmin, id]);


    const confirmar = (confirmadaColeta: IEntrega) => {
        const path= `${paginaBaseAdmin}Confirmar_Coleta`
        navigate(path);
    }

/*    const confirmar = (ahSerConfirmado: number) => {

        http.put(`entrega/confirmarColeta/${ahSerConfirmado}`, {
        })
        .then(resposta => {
            alert('Coleta confirmada com sucesso!');
        })
        .catch(erro => alert(erro.response.data.message));
        
    } */

    const confirmar_entrega = (ahSerConfirmada: IEntrega) => {
        const path= `${paginaBaseAdmin}Confirmar_Entrega`
        navigate(path);
    }


    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Status
                        </TableCell>
                        <TableCell>
                            Código Entrega
                        </TableCell>
                        <TableCell>
                            Código Coleta
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {entregas.map(entrega => (
                        <TableRow key={entrega.id}>
                            <TableCell>
                                {entrega.status}
                            </TableCell>
                            <TableCell>
                                {entrega.codigoEntrega}
                            </TableCell>
                            <TableCell>
                                {entrega.codigoColeta}
                            </TableCell>
{/*                             {entrega.status.toUpperCase() === 'PENDENTE' ? (
                                
                                itemsPaginaAdmin.nomePagina === 'Empresas' ? 
                                (
                                
                                    <TableCell>
                                        <Button variant="outlined" color="error" onClick={() => excluir( entrega)}>
                                            Excluir
                                        </Button>
                                    </TableCell>
                                ) : null 
                            ) : null} */}

                            {entrega.status.toUpperCase() === 'AGUARDANDO' ? (
                                
                                itemsPaginaAdmin.nomePagina === 'Empresas' ? (
                                    <TableCell>
                                        <Button variant="outlined" color="error" onClick={() => confirmar(entrega)}>
                                            Confirmar Coleta
                                        </Button>
                                    </TableCell>
                                ) : null ) : null}
                            
                            {entrega.status.toUpperCase() === 'EM_ROTA' ? (
                                

                                itemsPaginaAdmin.nomePagina === 'Entregadores' ? (
                                    <TableCell>
                                        <Button variant="outlined" color="error" onClick={() => confirmar_entrega(entrega)}>
                                            Confirmar Entrega
                                        </Button>
                                    </TableCell>
                                ) : null
                            ) : null}
                            
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Dashboard
