import { Box, Button, MenuItem,  Select, TextField, Typography } from "@mui/material"
import http from "../../http"
import { TipoLoginEnum } from "../../types/tipo-login.enum";
import { ILogin } from "../../Interfaces/ILogin";
import { useState } from "react";
import { useSetToken } from "../../state/hooks/useSetToken";

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [tipo, setTipo] = useState(TipoLoginEnum.EMPRESA);
    const tokenSet = useSetToken();

    const aoSubmeter = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const login: ILogin = {
            email,
            senha,
            tipo
        }
        http
            .post(`/autenticacao/login`, login)
            .then((resposta) => {
                tokenSet(tipo);
                alert('Login efetuado com sucesso!');
            })
            .catch(error => {
                alert(error.response.data.message);
            })
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h6" color="primary" gutterBottom>
                Login
            </Typography>
            <Box
                component="form"
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} 
                onSubmit={aoSubmeter}
            >
                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    id="senha"
                    label="Senha"
                    variant="outlined"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    required
                    type="password"
                    fullWidth
                    margin="normal"
                    
                />
                
                <Select
                    id="tipo"
                    name="tipo"
                    value={tipo}
                    onChange={e => setTipo(e.target.value as TipoLoginEnum)}
                    fullWidth
                    required
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value={TipoLoginEnum.ENTREGADOR}>Entregador</MenuItem>
                    <MenuItem value={TipoLoginEnum.EMPRESA}>Empresa</MenuItem>
                </Select>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2 }}
                    fullWidth
                    onClick={e => aoSubmeter}
                >
                    Login
                </Button>
                
            </Box>            
        </Box>
    )
}

export default Login