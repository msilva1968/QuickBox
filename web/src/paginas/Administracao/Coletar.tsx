import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import http from "../../http";
import { useItemPagina } from "../../state/hooks/useItemPagina";
import IListaEntregador from "../../Interfaces/IEntrega";
import { useIdLogado } from "../../state/hooks/useIdLogado";
//import IEntrega from "../../Interfaces/IEntrega";
//import { useNavigate } from "react-router-dom";
//import { paginaBaseAdmin } from "../../types/PaginaAdministracao";

const Coletar = () => {
    const {id} = useIdLogado();
    const [entregas, setEntregas] = useState<IListaEntregador[]>([]);
    const itemsPaginaAdmin = useItemPagina();
//    const navigate = useNavigate();

    const [open, setOpen] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [inputError, setInputError] = useState(false);
    const [infoProvided, setInfoProvided] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    useEffect(() => {
        if (itemsPaginaAdmin.nomePagina === 'Entregadores' ) {
            http.get(`entrega/localizacao/${inputValue}`)
                .then(resposta => {
                    const entregas: IListaEntregador[] = [];
                    Object.assign(entregas, resposta.data);
                    setEntregas(entregas);
                })
                .catch(error => {
                    alert(error.response.data.message);
                });
        }
    }, [id, itemsPaginaAdmin.nomePagina, infoProvided, entregas, inputValue]);

    const handleConfirm = () => {
        if (inputValue.trim() === '') {
            setInputError(true);
        } else {
            setInputError(false);
            setInfoProvided(true);
            setOpen(false);
            setShowErrorMessage(false);


        }
    };

    const handleCancel = () => {
        setOpen(false);
        setShowErrorMessage(true);
    };

//    const handlePageClick = () => {
//        if (!infoProvided) {
//            setOpen(true);
//        }
//    };
   
    const handleCollect=(idEntrega:number)=> {
        http.put(`entrega/aguardandoEntrega/${idEntrega}/${id}`, {
                })
                .then(resposta => {
                    alert('Coleta confirmada com sucesso!');
                })
                .catch(erro => alert(erro.response.data.message));
            
    };

    const handleRetry = () => {
        setOpen(true);
        setShowErrorMessage(false);
    };

    return (
        <div>
            <Dialog open={open}>
                <DialogTitle>Latitude/Longitude.</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Informe a latitude,longitude. (Ex.:-22.8802816, -43.4725624)
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="inputValue"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        error={inputError}
                        helperText={inputError ? "Este campo é obrigatório." : ""}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirm} color="primary">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>

            {showErrorMessage && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                    <Typography color="error" variant="h6" align="center">
                        Lista não exibida. Por favor, informar latitude e longitude.
                    </Typography>
                    <Button onClick={handleRetry} color="primary" variant="contained" style={{ marginLeft: '10px' }}>
                        Clique aqui e Informe Latitude e Longitude
                    </Button>
                </div>
            )}

            {infoProvided && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Código Entrega
                                </TableCell>
                                <TableCell>
                                    Nome Empresa
                                </TableCell>
                                <TableCell>
                                    Distância
                                </TableCell>
                                <TableCell>
                                   
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {entregas.map((entrega) => (
                                <TableRow key={entrega.entregaId}>
                                    <TableCell>{entrega.codigo_entrega}</TableCell>
                                    <TableCell>{entrega.nome}</TableCell>
                                    <TableCell>{entrega.distancia} KM</TableCell>
                                    <TableCell>
                                        <Button onClick={()=>handleCollect(entrega.entregaId)} color="primary">
                                        
                                            Coletar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
}

export default Coletar;
