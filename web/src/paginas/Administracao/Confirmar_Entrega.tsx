import { Box, Button, TableBody, TableCell, TableRow, TextField, Typography } from "@mui/material"
import { useState } from "react"
import http from "../../http"
import { useNavigate } from 'react-router-dom';

const ConfirmarEntrega = () => {
    const navigate = useNavigate();
    const [codigoConfirmacao, setCodigoConfirmacao] = useState('');

    const aoConfirmarEntrega = (
        codigoConfirmacao: string
    ) => {
            http.put(`entrega/${codigoConfirmacao}/`, {
            })
            .then(resposta => {
                setCodigoConfirmacao('');
                alert('Entrega confirmada com sucesso!');
            })
            .catch(erro => alert(erro.response.data.message));
        }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h6" color="primary" gutterBottom>
                Confirmar Entrega
            </Typography>
            <Box
                component="form"
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                <TextField
                    id="codigoConfirmacao"
                    label="Código de Confirmação"
                    variant="outlined"
                    value={codigoConfirmacao}
                    onChange={e => setCodigoConfirmacao(e.target.value)}
                />
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Button
                                type="button"
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={e => aoConfirmarEntrega(codigoConfirmacao)}
                            >
                                Confirmar
                            </Button>
                        </TableCell>
                        <TableCell>
                            <Button
                                type="button"
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => navigate(-1)}
                            >
                                Voltar
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Box>
        </Box>
    )
}

export default ConfirmarEntrega