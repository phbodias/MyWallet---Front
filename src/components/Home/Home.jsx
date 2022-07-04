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
            {carteira.length > 0 ?
                (<Registros>
                    {carteira.map((despesa, index) => {
                        return (
                            <div key={index}>
                                <Data>{despesa.date}</Data>
                                <Desc>{despesa.descricao}</Desc>
                                <Valor entrada={despesa.tipo === "entrada" ? true : false}>{despesa.valor}</Valor>
                            </div>
                        )
                    })}
                </Registros>) : (<Registros>
                    <SemRegistro>
                        <p>Não há registros de entrada ou saída</p>
                    </SemRegistro>
                </Registros>)
            }
            <Adicionar>
                <Styledlink to="/entrada" style={{ textDecoration: 'none' }}>
                    <Entrada>Nova Entrada</Entrada>
                </Styledlink>
                <Styledlink to="/saida" style={{ textDecoration: 'none' }}>
                    <Saida>Nova Saida</Saida>
                </Styledlink>
            </Adicionar>
        </Container>
    )
}

const SemRegistro = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: #868686;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;

    p{
        width: 55%;
    }
`

const Styledlink = styled(Link)`
    width: 47.5%;
    text-decoration: none;
    color: #FFFFFF;
`

const Saida = styled.div`
    height: 155px;
    background-color: #A328D6;
    padding-top: 40%;
    padding-left: 5px;
`

const Entrada = styled.div`
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
    margin-right: 5px;
    color: ${props => props.entrada ? '#03AC00' : '#C70000'};
`

const Desc = styled.div`
    min-width: 50%;
    max-width: 70%;
`

const Data = styled.div`
    width: 15%;
    margin-left: 5px;
    margin-right: 7px;
    color: #C6C6C6;
`

const Registros = styled.div`
    width: 85vw;
    height: 70vh;
    padding-top: 25px;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    overflow-x: scroll;

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