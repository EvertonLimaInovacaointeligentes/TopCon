import React, { useState } from 'react';
import { useUsuario } from '../hooks/useUsuario';

const RegistroForm = ({ onRegistroSuccess }) => {
  const [formData, setFormData] = useState({
    nomeUsuario: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    role: 'user', // Padrão é usuário comum
  });

  const { criarUsuario, loading, error } = useUsuario();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    try {
      const novoUsuario = await criarUsuario({
        nomeUsuario: formData.nomeUsuario,
        email: formData.email,
        senhaHash: formData.senha, // Em produção, hash no backend
        role: formData.role,
      });
      
      onRegistroSuccess?.(novoUsuario);
      alert('Usuário criado com sucesso!');
      
      // Limpar formulário
      setFormData({
        nomeUsuario: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        role: 'user',
      });
    } catch (err) {
      console.error('Erro no registro:', err);
    }
  };

  return (
    <div className="registro-form">
      <h2>Criar Conta</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nomeUsuario">Nome de Usuário:</label>
          <input
            type="text"
            id="nomeUsuario"
            name="nomeUsuario"
            value={formData.nomeUsuario}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmarSenha">Confirmar Senha:</label>
          <input
            type="password"
            id="confirmarSenha"
            name="confirmarSenha"
            value={formData.confirmarSenha}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Tipo de Usuário:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="user">Usuário Comum</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Criando...' : 'Criar Conta'}
        </button>
      </form>
    </div>
  );
};

export default RegistroForm;