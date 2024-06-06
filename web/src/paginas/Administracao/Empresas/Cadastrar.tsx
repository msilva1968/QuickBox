import { Box, Button, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import http from "../../../http"
import ICliente from "../../../Interfaces/ICliente";
import { useParams } from "react-router-dom";

const CadastrarClientes = () => {

    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [cep, setCep] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setestado] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [coordenada, setCoordenada] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const parametros = useParams();

    useEffect(() => {
        if (parametros.id) {
            http.get<ICliente>(`cliente/${parametros.id}/`)
                .then((resposta) => {
                    setNome(resposta.data.nome);
                    setCnpj(resposta.data.cnpj);
                    setCep(resposta.data.cep);
                    setBairro(resposta.data.bairro);
                    setCidade(resposta.data.cidade);
                    setestado(resposta.data.estado);
                    setLogradouro(resposta.data.logradouro);
                    setNumero(resposta.data.numero);
                    setComplemento(resposta.data.complemento);
                    setCoordenada(resposta.data.coordenada);
                    setEmail(resposta.data.email);
                    setSenha(resposta.data.senha);
                })
        }
    }, [parametros])

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        

        if (parametros.id) {
            http.put<ICliente>(`cliente/${parametros.id}/`, {
                nome: nome,
                cnpj: cnpj,
                cep: cep,
                bairro: bairro,
                cidade: cidade,
                estado: estado,
                logradouro: logradouro,
                numero: numero,
                complemento: complemento,
                coordenada: coordenada,
                email: email,
                senha: senha
            })
                .then(() => {
                    alert("Cliente atualizado com sucesso!");
                })
                .catch(erro => alert(JSON.stringify(erro)));
        } else {
            http.post<ICliente>('cliente/', {
                nome: nome,
                cnpj: cnpj,
                cep: cep,
                bairro: bairro,
                cidade: cidade,
                estado: estado,
                logradouro: logradouro,
                numero: numero,
                complemento: complemento,
                coordenada: coordenada,
                email: email,
                senha: senha
            })
                .then(() => {
                    setNome('');
                    setCnpj('');
                    setCep('');
                    setBairro('');
                    setCidade('');
                    setestado('');
                    setLogradouro('');
                    setNumero('');
                    setComplemento('');
                    setCoordenada('');
                    setEmail('');
                    setSenha('');
                    alert("Cliente cadastrado com sucesso!");
                })
                .catch(erro => alert(JSON.stringify(erro)));
        }        

    }

    return (
        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
            <Typography component="h1" variant="h6">Formulário de Clientes</Typography>
            <Box component="form" sx={{ width: '70%' }} onSubmit={aoSubmeterForm}>
                <TextField
                    value={nome}
                    onChange={evento => setNome(evento.target.value)}
                    label="Nome"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />

                <TextField
                    value={cnpj}
                    onChange={evento => setCnpj(evento.target.value)}
                    label="CNPJ"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />
                
                <TextField
                    value={cep}
                    onChange={evento => setCep(evento.target.value)}
                    label="CEP"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />

                <TextField
                    value={bairro}
                    onChange={evento => setBairro(evento.target.value)}
                    label="Bairro"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />

                <TextField
                    value={cidade}
                    onChange={evento => setCidade(evento.target.value)}
                    label="Cidade"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />

                <TextField  
                    value={estado}
                    onChange={evento => setestado(evento.target.value)}
                    label="Estado"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />

                <TextField
                    value={logradouro}
                    onChange={evento => setLogradouro(evento.target.value)}
                    label="Logradouro"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />

                <TextField
                    value={numero}
                    onChange={evento => setNumero(evento.target.value)}
                    label="Número"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />

                <TextField
                    value={complemento}
                    onChange={evento => setComplemento(evento.target.value)}
                    label="Complemento"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />

                <TextField
                    value={coordenada}
                    onChange={evento => setCoordenada(evento.target.value)}
                    label="Coordenada"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />

                <TextField
                    value={email}
                    onChange={evento => setEmail(evento.target.value)}
                    label="Email"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />

                <TextField
                    value={senha}
                    onChange={evento => setSenha(evento.target.value)}
                    label="Senha"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />

                <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>
            </Box>
        </Box>
    )
}

export default CadastrarClientes