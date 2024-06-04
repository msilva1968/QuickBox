import { Box, Button, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import http from "../../http"
import IEntrega from "../../Interfaces/IEntrega";
import { useItemPagina } from "../../state/hooks/useItemPagina";
import { useParams } from "react-router-dom";

const Entregas = () => {

    const [clienteId, setClienteId] = useState('');
    const [cep, setCep] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [largura, setLargura] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const itemsPaginaAdmin = useItemPagina();
    const [parametros] = useState(useParams());
    
    useEffect(()=>{
        if(parametros.id){
            http.get<IEntrega>(`entrega/${parametros.id}/`)
                .then(resposta => {
                    setClienteId(resposta.data.clienteId);
                    setCep(resposta.data.cep);
                    setBairro(resposta.data.bairro);
                    setCidade(resposta.data.cidade);
                    setEstado(resposta.data.estado);
                    setLogradouro(resposta.data.logradouro);
                    setNumero(resposta.data.numero);
                    setComplemento(resposta.data.complemento);
                    setPeso(resposta.data.peso);
                    setAltura(resposta.data.altura);
                    setLargura(resposta.data.largura);
                    setLatitude(resposta.data.latitude);
                    setLongitude(resposta.data.longitude);
                })
        }
    }, [parametros])

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        if (parametros.id) {
            http.put<IEntrega>(`entrega/${parametros.id}/`, {
                clienteId,
                cep,
                bairro,
                cidade,
                estado,
                logradouro,
                numero,
                complemento,
                peso,
                altura,
                largura,
                latitude,
                longitude
            })
                .then(resposta => {
                    setClienteId('');
                    setCep('');
                    setBairro('');
                    setCidade('');
                    setEstado('');
                    setLogradouro('');
                    setNumero('');
                    setComplemento('');
                    setPeso('');
                    setAltura('');
                    setLargura('');
                    setLatitude('');
                    setLongitude('');
                    alert('Entrega alterada com sucesso!');
                })
                .catch(erro => alert(JSON.stringify(erro.response.data.message)));
        } else {
            http.post<IEntrega>('entrega/', {
                clienteId,
                cep,
                bairro,
                cidade,
                estado,
                logradouro,
                numero,
                complemento,
                peso,
                altura,
                largura,
                latitude,
                longitude
            })
                .then(resposta => {
                    setClienteId('');
                    setCep('');
                    setBairro('');
                    setCidade('');
                    setEstado('');
                    setLogradouro('');
                    setNumero('');
                    setComplemento('');
                    setPeso('');
                    setAltura('');
                    setLargura('');
                    setLatitude('');
                    setLongitude('');
                    alert('Entrega criada com sucesso!');
            })
                .catch(erro =>alert(JSON.stringify(erro.response.data)));
        }
    
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
            <Typography component="h1" color="primary" variant="h6">Cadastro de Entregas</Typography>
            <Box component="form" sx={{ width: '70%' }} onSubmit={aoSubmeterForm}>
                <TextField
                    value={clienteId}
                    onChange={event => setClienteId(event.target.value)}
                    id="clienteId"
                    label="ClienteId"
                    variant="outlined"
                    name="clienteId"
                    margin="normal"
                    fullWidth
                    required
                />
                <TextField
                    value={cep}
                    onChange={event => setCep(event.target.value)}
                    id="cep"
                    label="Cep"
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
                    onChange={event => setEstado(event.target.value)}
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
                <TextField
                    value={peso}
                    onChange={event => setPeso(event.target.value)}
                    id="peso"
                    label="Peso"
                    variant="outlined"
                    name="peso"
                    margin="normal"
                    fullWidth
                    required
                />
                <TextField
                    value={altura}
                    onChange={event => setAltura(event.target.value)}
                    id="altura"
                    label="Altura"
                    variant="outlined"
                    name="altura"
                    margin="normal"
                    fullWidth
                    required
                />
                <TextField
                    value={largura}
                    onChange={event => setLargura(event.target.value)}
                    id="largura"
                    label="Largura"
                    variant="outlined"
                    name="largura"
                    margin="normal"
                    fullWidth
                    required
                />
                <TextField
                    value={latitude}
                    onChange={event => setLatitude(event.target.value)}
                    id="latitude"
                    label="Latitude"
                    variant="outlined"
                    name="latitude"
                    margin="normal"
                    fullWidth
                    required
                />
                <TextField
                    value={longitude}
                    onChange={event => setLongitude(event.target.value)}
                    id="longitude"
                    label="Longitude"
                    variant="outlined"
                    name="longitude"
                    margin="normal"
                    fullWidth
                    required
                />
                
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Cadastrar Entrega
                </Button>
            </Box>
        </Box>
    )

}
export default Entregas;
