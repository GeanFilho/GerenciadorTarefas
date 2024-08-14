import React, { useEffect, useState } from 'react';
import './App.css';

// Componente de Cadastro de Tarefas
const Cadastro = ({ onAddTask, editingTask }) => {
  // Estados para armazenar os dados do formulário
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  // Efeito para preencher o formulário quando uma tarefa está sendo editada
  useEffect(() => {
    if (editingTask) {
      // Define os valores dos campos com base nos dados da tarefa em edição
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setDueDate(editingTask.dueDate);
    }
  }, [editingTask]); // O efeito depende do editingTask

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    // Valida se todos os campos estão preenchidos
    if (!title || !description || !dueDate) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Adiciona ou atualiza a tarefa
    onAddTask({
      title,
      description,
      dueDate,
      id: editingTask ? editingTask.id : Date.now(), // Usa o ID da tarefa existente ou cria um novo
    });

    // Limpa os campos do formulário após o envio
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // Atualiza o estado do título
          placeholder="Digite o título da tarefa"
        />
      </div>
      <div>
        <label>Descrição</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)} // Atualiza o estado da descrição
          placeholder="Digite a descrição da tarefa"
        ></textarea>
      </div>
      <div>
        <label>Data de Vencimento</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)} // Atualiza o estado da data de vencimento
        />
      </div>
      <button className='teste1' type="submit">
        {editingTask ? 'Atualizar Tarefa' : 'Adicionar Tarefa'} {/* Texto do botão baseado no modo de edição */}
      </button>
    </form>
  );
};

export default Cadastro;
