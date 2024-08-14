// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebase';
import './login.css'

function Login({ onLogin }) {
  // Estados para armazenar o email, senha e mensagens de erro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Hook para navegação programática
  const navigate = useNavigate();

  // Função para lidar com o envio do formulário de login
  const handleLogin = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    try {
      // Tenta autenticar o usuário com email e senha
      await signInWithEmailAndPassword(auth, email, password);
      onLogin(); // Atualiza o estado de login na aplicação
      navigate('/tasks'); // Redireciona para a página de tarefas
    } catch (error) {
      // Define a mensagem de erro em caso de falha na autenticação
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do email
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da senha
          />
        </div>
        {/* Exibe a mensagem de erro se houver */}
        {error && <p style={{color: 'red'}}>{error}</p>}
        <button className='entrar' type="submit">Entrar</button>
      </form>
      <div className="register-links">
        {/* Link para a página de registro */}
        <a href="/register">Não tem uma conta? Registre-se!</a>
      </div>
    </div>
  );
}

export default Login;
