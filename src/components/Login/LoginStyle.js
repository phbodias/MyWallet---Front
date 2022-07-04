import styled from 'styled-components';
import { Link } from "react-router-dom";

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

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #52B6FF;
  font-weight: 400;
  font-size: 13.976px;
  line-height: 17px;
`;

export {
  Container,
  Titulo,
  Input,
  Button,
  StyledLink
}
