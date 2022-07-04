import React, { useState, useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner'
import styled from 'styled-components';

export default function Entrada() {
    const { token } = useContext(UserContext);

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    const [valor, setValor] = useState("");
    const [descricao, setDescricao] = useState("");

    function handleEntrada(e) {
        e.preventDefault();
        setLoading(true);

        const promise = axios.post(
            "https://mywallet-phbodias.herokuapp.com/posts",
            {
                descricao,
                tipo: "entrada",
                valor,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        promise.then((response) => {
            navigate("/home");
        });
        promise.catch((error) => {
            alert(`Erro ao logar: \n\n${error.response.status} - ${error.response.data.message}`);
            setLoading(false);
        });
    }

    return (
        <Container>
            <Titulo> Nova Entrada </Titulo>
            <form onSubmit={handleEntrada}>
                <Input
                    type="number"
                    placeholder="Valor"
                    value={valor}
                    name={valor}
                    onChange={(e) => setValor(e.target.value)}
                    desabilitado={loading}
                />
                <Input
                    type="text"
                    placeholder="Descrição"
                    value={descricao}
                    name={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    desabilitado={loading}
                />
                <Button type="submit">
                    {loading ? <ThreeDots color="#FFF" height={30} width={30} /> : 'Salvar entrada'}
                </Button>
            </form>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #8C11BE;
    height: 100vh;

    form {
      display: flex;
      flex-direction: column;
    }
`

const Titulo = styled.p`
  font-family: Saira Stencil One;
  font-size: 32px;
  color: #FFFFFF;
  margin-bottom: 24px;
`

const Input = styled.input`
  padding: 18px;
  background-color: ${props => props.desabilitado ? '#CFCFCF' : '#ffffff'};
  border: 1px solid #bebebe;
  color: #222222;
  width: 100%;
  max-width: 303px;
  height: 45px;
  border-radius: 4px;
  margin-bottom: 6px;
  font-style: normal;
  font-weight: 400;
  font-size: 19.976px;
  line-height: 25px;

  ::placeholder {
    color: #888888;
    font-style: italic;
  }
`;

const Button = styled.button`
  height: 45px;
  text-align: center;
  background-color: #A328D6;
  border: none;
  color: #222222;
  width: 100%;
  max-width: 303px;
  border-radius: 4px;
  margin-bottom: 36px;
  color: #ffffff;
  cursor: pointer;
  font-size: 20.976px;
  line-height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    filter: brightness(1.2);
  }
`;