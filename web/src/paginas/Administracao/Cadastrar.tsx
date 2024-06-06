import { Box, Button, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import http from "../../http"
import ICliente from "../../Interfaces/ICliente";
import IEntregador from "../../Interfaces/IEntegrador";
import { useParams } from "react-router-dom";
import { useItemPagina } from "../../state/hooks/useItemPagina";

const Cadastrar_Alterar = () => {

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [cnh, setCnh] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [coordenada, setCoordenada] = useState('');
    const [cep, setCep] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setestado] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [endereco, setEndereco] = useState('');
    const itemsPaginaAdmin = useItemPagina();
    const [parametros] = useState(useParams());

    useEffect(() => {
        if (parametros.id) {
            if (itemsPaginaAdmin.nomePagina === 'Entregadores') {
                http.get<IEntregador>(`entregador/${parametros.id}/`)
                    .then((resposta) => {
                        setNome(resposta.data.nome);
                        setCpf(resposta.data.cpf);
                        setCnh(resposta.data.cnh);
                        setEmail(resposta.data.email);
                        setEndereco(resposta.data.endereco);
                    })
            } else {
                http.get<ICliente>(`cliente/editacliente/${parametros.id}/`)
                    .then((resposta) => {
                        setNome(resposta.data.nome);
                        setCnpj(resposta.data.cnpj);
                        setEmail(resposta.data.email);
                        setCoordenada(resposta.data.coordenada);
                        setCep(resposta.data.cep);
                        setBairro(resposta.data.bairro);
                        setCidade(resposta.data.cidade);
                        setestado(resposta.data.estado);
                        setLogradouro(resposta.data.logradouro);
                        setNumero(resposta.data.numero);
                        setComplemento(resposta.data.complemento);
                    })
            }
        }
    }, [itemsPaginaAdmin.nomePagina, parametros])

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if (parametros.id) {
            if (itemsPaginaAdmin.nomePagina === 'Entregadores') {
                http.put<IEntregador>(`entregador/${parametros.id}/`, {
                    nome: nome,
                    cpf: cpf,
                    cnh: cnh,
                    email: email,
                    senha: senha,
                    endereco: endereco
                })
                    .then(() => {
                        setNome('');
                        setCpf('');
                        setCnh('');
                        setEmail('');
                        setSenha('');
                        setEndereco('');
                    })
                    .catch(erro => alert(JSON.stringify(erro.response.data.message)));
            } else {
                http.put<ICliente>(`cliente/${parametros.id}/`, {
                    nome: nome,
                    cnpj: cnpj,
                    email: email,
                    senha: senha,
                    coordenada: coordenada,
                    cep: cep,
                    bairro: bairro,
                    cidade: cidade,
                    estado: estado,
                    logradouro: logradouro,
                    numero: numero,
                    complemento: complemento
                })
                    .then(() => {
                        setNome('');
                        setCnpj('');
                        setEmail('');
                        setSenha('');
                        setCoordenada('');
                        setCep('');
                        setBairro('');
                        setCidade('');
                        setestado('');
                        setLogradouro('');
                        setNumero('');
                        setComplemento('');
                    })
                    .catch(erro => alert(JSON.stringify(erro.response.data.message)));
            }
        } else {
            if (itemsPaginaAdmin.nomePagina === 'Entregadores') {
                http.post<IEntregador>('entregador/', {
                    nome: nome,
                    cpf: cpf,
                    cnh: cnh,
                    email: email,
                    senha: senha,
                    endereco: endereco
                })
                    .then(() => {
                        setNome('');
                        setCpf('');
                        setCnh('');
                        setEmail('');
                        setSenha('');
                        setEndereco('');
                    })
                    .catch(erro => alert(JSON.stringify(erro.response.data.message)));
            } else {
                http.post<ICliente>('cliente/', {
                    nome: nome,
                    cnpj: cnpj,
                    email: email,
                    senha: senha,
                    coordenada: coordenada,
                    cep: cep,
                    bairro: bairro,
                    cidade: cidade,
                    estado: estado,
                    logradouro: logradouro,
                    numero: numero,
                    complemento: complemento
                })
                    .then(() => {
                        setNome('');
                        setCnpj('');
                        setEmail('');
                        setSenha('');
                        setCoordenada('');
                        setCep('');
                        setBairro('');
                        setCidade('');
                        setestado('');
                        setLogradouro('');
                        setNumero('');
                        setComplemento('');
                    })
                    .catch(erro => alert(JSON.stringify(erro.response.data.message)));
            }
        }

    }

    return (
        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
            <Typography component="h1" variant="h6" color="primary">Formulário {itemsPaginaAdmin.nomePagina}</Typography>
            <Box component="form" sx={{ width: '70%' }} onSubmit={aoSubmeterForm}>
                <TextField
                    value={nome}
                    onChange={event => setNome(event.target.value)}
                    id="nome"
                    label="Nome"
                    variant="outlined"
                    name="nome"
                    margin="normal"
                    fullWidth
                    required
                />
                <TextField
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    id="email"
                    label="Email"
                    variant="outlined"
                    name="email"
                    margin="normal"
                    fullWidth
                    required
                />
                <TextField
                    value={senha}
                    onChange={event => setSenha(event.target.value)}
                    id="senha"
                    label="Senha"
                    variant="outlined"
                    name="senha"
                    margin="normal"
                    fullWidth
                    required
                />
                {itemsPaginaAdmin.nomePagina === 'Entregadores' && (
                    <>
                        <TextField
                            value={cpf}
                            onChange={event => setCpf(event.target.value)}
                            id="cpf"
                            label="CPF"
                            variant="outlined"
                            name="cpf"
                            margin="normal"
                            fullWidth
                            required
                        />
                        <TextField
                            value={cnh}
                            onChange={event => setCnh(event.target.value)}
                            id="cnh"
                            label="CNH"
                            variant="outlined"
                            name="cnh"
                            margin="normal"
                            fullWidth
                            required
                        />
                        <TextField
                            value={endereco}
                            onChange={event => setEndereco(event.target.value)}
                            id="endereco"
                            label="Endereço"
                            variant="outlined"
                            name="endereco"
                            margin="normal"
                            fullWidth
                            required
                        />
                    </>
                )}
                {itemsPaginaAdmin.nomePagina !== 'Entregadores' && (
                    <>
                        <TextField
                            value={cnpj}
                            onChange={event => setCnpj(event.target.value)}
                            id="cnpj"
                            label="CNPJ"
                            variant="outlined"
                            name="cnpj"
                            margin="normal"
                            fullWidth
                            required
                        />
                        <TextField
                            value={coordenada}
                            onChange={event => setCoordenada(event.target.value)}
                            id="coordenada"
                            label="Coordenada"
                            variant="outlined"
                            name="coordenada"
                            margin="normal"
                            fullWidth
                            required
                        />
                        <TextField
                            value={cep}
                            onChange={event => setCep(event.target.value)}
                            id="cep"
                            label="CEP"
                            variant="outlined"
                            name="cep"
                            margin="normal"
                            fullWidth
                            required
                        />
                        <TextField
                            value={bairro}
                            onChange={event => setBairro(event.target.value)}
                            id="bairro"
                            label="Bairro"
                            variant="outlined"
                            name="bairro"
                            margin="normal"
                            fullWidth
                            required
                        />
                        <TextField
                            value={cidade}
                            onChange={event => setCidade(event.target.value)}
                            id="cidade"
                            label="Cidade"
                            variant="outlined"
                            name="cidade"
                            margin="normal"
                            fullWidth
                            required
                        />
                        <TextField
                            value={estado}
                            onChange={event => setestado(event.target.value)}
                            id="estado"
                            label="Estado"
                            variant="outlined"
                            name="estado"
                            margin="normal"
                            fullWidth
                            required
                        />
                        <TextField
                            value={logradouro}
                            onChange={event => setLogradouro(event.target.value)}
                            id="logradouro"
                            label="Logradouro"
                            variant="outlined"
                            name="logradouro"
                            margin="normal"
                            fullWidth
                            required
                        />
                        <TextField
                            value={numero}
                            onChange={event => setNumero(event.target.value)}
                            id="numero"
                            label="Numero"
                            variant="outlined"
                            name="numero"
                            margin="normal"
                            fullWidth
                            required
                        />
                        <TextField
                            value={complemento}
                            onChange={event => setComplemento(event.target.value)}
                            id="complemento"
                            label="Complemento"
                            variant="outlined"
                            name="complemento"
                            margin="normal"
                            fullWidth
                            required
                        />
                    </>
                )}
                
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    {parametros.id ? 'Alterar' : 'Cadastrar'}
                </Button>
            </Box>
        </Box>
    )

}

export default Cadastrar_Alterar;
