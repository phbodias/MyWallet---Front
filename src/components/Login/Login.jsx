import React, { useState, useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner'

import { Container, Input, Button, StyledLink, Titulo } from './LoginStyle';

export default function Login(){

    const { setToken } = useContext(UserContext);

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin(e){
        e.preventDefault();
        setLoading(true);

        const promise = axios.post(
            "https://mywallet-phbodias.herokuapp.com/login",
            {
                email,
                password
            }
        );
    
        promise.then((response) => {
            setToken(response.data)
            navigate("/home");
        });
        promise.catch((error) => {
            alert(`Erro ao logar: \n\n${error.response.status} - ${error.response.data.message}`);
            setLoading(false);
        }); 
    }

    return (
        <Container>
            <Titulo> MyWallet </Titulo>
            <form onSubmit={handleLogin}>
                <Input
                    type="email"
                    placeholder="Email..."
                    value={email}
                    name={email}
                    onChange={(e) => setEmail(e.target.value)}
                    desabilitado={loading}
                />
                <Input
                    type="password"
                    placeholder="Senha..."
                    value={password}
                    name={password}
                    onChange={(e) => setPassword(e.target.value)}
                    desabilitado={loading}
                />
                <Button type="submit">
                    {loading ? <ThreeDots color="#FFF" height={30} width={30} /> : 'Entrar'}
                </Button>
            </form>
            <StyledLink to="/cadastro">Primeira vez? Cadastre-se!</StyledLink>
        </Container>
    )
}

