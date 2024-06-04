import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react"
import http from "../../http"

const ConfirmarEntrega = () => {
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
                <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={e => aoConfirmarEntrega(codigoConfirmacao)}
                >
                    Confirmar
                </Button>
            </Box>
        </Box>
    )
}

export default ConfirmarEntrega