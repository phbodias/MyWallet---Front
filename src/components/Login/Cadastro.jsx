import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner'
import { Container, Input, Button, StyledLink, Titulo } from './LoginStyle';

export default function Cadastro() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)

    const [dados, setDados] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [confirmSenha, setConfirmSenha] = useState("");

    function handleCadastro(e) {
        e.preventDefault();
        if (dados.password !== confirmSenha) {
            return alert("Senhas não coincidem!");
        }
        setLoading(true);

        const promise = axios.post('https://mywallet-phbodias.herokuapp.com/cadastrar', dados);

        promise.then(() => navigate('/'));

        promise.catch(error => {
            alert(`Erro ao cadastrar: \n\n${error.response.status} - ${error.response.data.message}`);
            limparInputs();
            setLoading(false);
        });
    }

    function handleInputChange(e) {
        setDados({ ...dados, [e.target.name]: e.target.value })
    }

    function handleImputConfirm(e) {
        setConfirmSenha(e.target.value)
    }

    function limparInputs() {
        setDados({
            password: ""
        });
        setConfirmSenha("");
    }

    return (
        <Container>
            <Titulo> MyWallet </Titulo>
            <form onSubmit={handleCadastro}>
                <Input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    value={dados.name}
                    onChange={handleInputChange}
                    desabilitado={loading}
                />
                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={dados.email}
                    onChange={handleInputChange}
                    desabilitado={loading}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Senha"
                    value={dados.password}
                    onChange={handleInputChange}
                    desabilitado={loading}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Confirme sua senha"
                    value={confirmSenha}
                    onChange={handleImputConfirm}
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