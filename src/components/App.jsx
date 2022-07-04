import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import UserContext from "../contexts/UserContext";
import Login from "./Login/Login";

export default function App() {

    const [token, setToken] = useState("");

    return (
        <UserContext.Provider value={{ token, setToken }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}