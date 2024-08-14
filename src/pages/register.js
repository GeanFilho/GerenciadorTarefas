import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importar o componente Link para navegação e useNavigate para redirecionamento
import { createUserWithEmailAndPassword } from "firebase/auth"; // Importar o método de criação de usuário do Firebase
import { auth } from '../config/firebase'; // Importar a instância de auth configurada
import './register.css';

function Register() {
  // Estados para armazenar os dados do formulário e mensagem de erro
  const [username, setUsername] = useState(''); // O campo "username" não é utilizado no Firebase Auth diretamente
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Hook para navegação programática
  const navigate = useNavigate();

  // Função para lidar com o envio do formulário de registro
  const handleRegister = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    try {
      // Cria um novo usuário com email e senha
      await createUserWithEmailAndPassword(auth, email, password);
      // Redireciona para a página de login após o registro bem-sucedido
      navigate('/login');
    } catch (error) {
      // Define a mensagem de erro em caso de falha na criação do usuário
      setError(error.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Crie sua conta</h2>
      <form onSubmit={handleRegister}>
        <div className="input-group">
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            id="username"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Atualiza o estado do nome de usuário
          />
        </div>
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
        <button className='cadastro' type="submit">Cadastrar</button>
        <div className="register-links">
          {/* Link para a página de login se o usuário já tiver uma conta */}
          <Link to="/login">Já possui conta? Faça login!</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
