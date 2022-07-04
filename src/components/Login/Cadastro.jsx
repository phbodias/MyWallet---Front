import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner'
import logo from '../../assets/logo.png'
import { Container, Input, Button, StyledLink } from './LoginStyle';

export default function Cadastro(){
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)

    const [dados, setDados] = useState({
        email: "",
        name: "",
        image: "",
        password: ""
    });

    function handleCadastro(e){
        e.preventDefault();
        setLoading(true);

        const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up', dados);

        promise.then(()=>navigate('/'));

        promise.catch(error => {
            alert(`Erro ao cadastrar: \n\n${error.response.status} - ${error.response.data.message}`);
            limparInputs();
            setLoading(false);
        });
    }

    function handleInputChange(e) {
        setDados({ ...dados, [e.target.name]: e.target.value })
    }

    function limparInputs(){
        setDados({
            email: "",
            name: "",
            image: "",
            password: ""
        })
    }

    return (
        <Container>
            <img src={logo} alt="logo"/>
            <form onSubmit={handleCadastro}>
                <Input
                    type="email"
                    name="email"
                    placeholder="Digite seu email..."
                    value={dados.email}
                    onChange={handleInputChange}
                    desabilitado={loading}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Digite sua senha..."
                    value={dados.password}
                    onChange={handleInputChange}
                    desabilitado={loading}
                />
                <Input
                    type="text"
                    name="name"
                    placeholder="Digite seu nome..."
                    value={dados.name}
                    onChange={handleInputChange}
                    desabilitado={loading}
                />
                <Input
                    type="text"
                    name="image"
                    placeholder="URL da sua foto de perfil"
                    value={dados.image}
                    onChange={handleInputChange}
                    desabilitado={loading}
                />
                <Button type="submit">
                    {loading ? <ThreeDots color="#FFF" height={50} width={100} /> : 'Entrar'}
                </Button>
            </form>
            <StyledLink to="/">Já tem uma conta? Faça login!</StyledLink>
        </Container>
    )
}