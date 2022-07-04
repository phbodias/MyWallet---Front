import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import UserContext from "../contexts/UserContext";
import Login from "./Login/Login";
import Cadastro from "./Login/Cadastro";
import Home from "./Home/Home";
import Entrada from "./Entrada/Entrada";
import Saida from "./Saida/Saida";

export default function App() {

    const [token, setToken] = useState("");
    const [name, setName] = useState("");

    return (
        <UserContext.Provider value={{ token, setToken, name, setName }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/entrada" element={<Entrada />} />
                    <Route path="/saida" element={<Saida />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}