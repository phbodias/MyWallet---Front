import { useState, useEffect, useContext } from "react"
import UserContext from '../../contexts/UserContext';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import styled from 'styled-components';

export default function Home() {
    const { token, name } = useContext(UserContext);

    const [carteira, setCarteira] = useState([]);

    const navigate = useNavigate();

    const [saldo, setSaldo] = useState(0);

    let entradas = [];
    let saidas = [];

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
            entradas = carteira.filter((movimentacao) => (movimentacao.tipo === "entrada"));
            saidas = carteira.filter((movimentacao) => (movimentacao.tipo === "saida"));
            calculaSaldo();
        });
        promise.catch((error) => {
            alert(`Erro ao cadastrar: \n\n${error.response.status} - ${error.response.data.message}`);
            navigate('/');
        });
    }

    function calculaSaldo() {
        let ent = 0;
        let sai = 0;
        for (let i = 0; i < entradas.length; i++) {
            ent += parseFloat(entradas[i].valor);
        }
        for (let i = 0; i < saidas.length; i++) {
            sai -= parseFloat(saidas[i].valor);
        }
        setSaldo(ent + sai);
    }

    return (
        <Container>
            <Ola>
                <p>Olá, {name}</p>
                <BackToLogin to="/" style={{ textDecoration: 'none' }}>
                    <h1><ion-icon name="log-in-outline"></ion-icon></h1>
                </BackToLogin>
            </Ola>
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
                    <Saldo>
                        <p>Saldo</p>
                        <Sal positivo={parseFloat(saldo) >= 0 ? true : false}>{saldo}</Sal>
                    </Saldo>
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

const BackToLogin = styled(Link)`
    text-decoration: none;
    color: #FFFFFF;
`

const Sal = styled.div`
    color: ${props => props.positivo ? '#03AC00' : '#C70000'};
`

const Saldo = styled.div`
    position: absolute;
    bottom: 10px;
    width: 100%;
    height: 20px;
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    color: #000000;
    padding: 5px;
    display: flex;
    justify-content: space-between;
`

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
    width: 50%;
    text-decoration: none;
    color: #FFFFFF;
`

const Saida = styled.div`
    height: 114px;
    background-color: #A328D6;
    padding-top: 40%;
    padding-left: 5px;
`

const Entrada = styled.div`
    height: 114px;
    margin-right: 5%;
    background-color: #A328D6;
    padding-top: 40%;
    padding-left: 5px;
`

const Adicionar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 85vw;
    margin-top: 13px;
`

const Valor = styled.div`
    position: absolute;
    right: 5px;
    color: ${props => props.entrada ? '#03AC00' : '#C70000'};
`

const Desc = styled.div`
    min-width: 30%;
`

const Data = styled.div`
    width: 15%;
    margin-left: 5px;
    margin-right: 7px;
    color: #C6C6C6;
`

const Registros = styled.div`
    position: relative;
    width: 85vw;
    height: 70vh;
    padding-top: 25px;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    overflow-x: scroll;
    box-sizing: border-box;

    div{
        display: flex;
    }
`

const Ola = styled.div`
    width: 85vw;
    margin-top: 25px;
    margin-bottom: 22px;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #FFFFFF;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    display: flex;
    justify-content: space-between;

    h1{
        font-size: 35px;
    }
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