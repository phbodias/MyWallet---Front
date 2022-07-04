import { useState, useEffect, useContext } from "react"
import UserContext from '../../contexts/UserContext';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import styled from 'styled-components';

export default function Home() {
    const { token } = useContext(UserContext);

    const [carteira, setCarteira] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        pegarCarteira();
        // eslint-disable-next-line
    }, [carteira]);

    function pegarCarteira() {
        const promise = axios.get(
            "https://mywallet-phbodias.herokuapp.com/posts",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        promise.then((response) => {
            setCarteira(response.data);
        });
        promise.catch((error) => {
            alert(`Erro ao cadastrar: \n\n${error.response.status} - ${error.response.data.message}`);
            navigate('/');
        });
    }

    return (
        <Container>
            <Ola>Olá, Fulano</Ola>
            <Registros>
                {carteira.map((despesa, index) => {
                    return (
                        <div>
                            <Data>{despesa.data}</Data>
                            <Desc>{despesa.titulo}</Desc>
                            <Valor>{despesa.valor}</Valor>
                        </div>
                    )
                })}
            </Registros>
            <Adicionar>
                <Link to="/entrada" style={{ textDecoration: 'none' }}>
                    <Entrada>Nova Entrada</Entrada>
                </Link>
                <Link to="/saida" style={{ textDecoration: 'none' }}>
                    <Saida>Nova Saida</Saida>
                </Link>
            </Adicionar>
        </Container>
    )
}

const Saida = styled.div`
    width: 47.5%;
    height: 155px;
    background-color: #A328D6;
    padding-top: 40%;
    padding-left: 5px;
`

const Entrada = styled.div`
    width: 47.5%;
    height: 155px;
    margin-right: 5%;
    background-color: #A328D6;
    padding-top: 40%;
    padding-left: 5px;
`

const Adicionar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 85%;
    margin-top: 13px;
`

const Valor = styled.div`
    width: 15%;
`

const Desc = styled.div`
    width: 70%;
`

const Data = styled.div`
    width: 15%;
`

const Registros = styled.div`
    width: 85vw;
    height: 70vh;
    padding-top: 25px;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;

    div{
        display: flex;
    }
`

const Ola = styled.div`
    width: 141px;
    height: 31px;
`

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #8C11BE;
    height: 100vh;
    box-sizing: border-box;
`