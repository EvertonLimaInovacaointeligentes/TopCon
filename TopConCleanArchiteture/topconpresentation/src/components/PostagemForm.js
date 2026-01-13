import React, { useState, useEffect } from 'react';

const PostagemForm = ({ 
  usuarioId, 
  postagemParaEditar, 
  onSuccess, 
  onError,
  criarPostagem,
  atualizarPostagem,
  loading,
  error
}) => {
  const [formData, setFormData] = useState({
    titulo: postagemParaEditar?.titulo || '',
    conteudo: postagemParaEditar?.conteudo || '',
  });

  const isEdicao = !!postagemParaEditar;

  // Atualizar formulário quando postagemParaEditar mudar
  useEffect(() => {
    if (postagemParaEditar) {
      console.log('📝 Carregando dados para edição:', postagemParaEditar);
      setFormData({
        titulo: postagemParaEditar.titulo || '',
        conteudo: postagemParaEditar.conteudo || '',
      });
    } else {
      // Limpar formulário quando não estiver editando
      setFormData({
        titulo: '',
        conteudo: '',
      });
    }
  }, [postagemParaEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!usuarioId) {
      onError?.('Você precisa estar logado para criar uma postagem!');
      return;
    }

    try {
      let resultado;
      
      if (isEdicao) {
        resultado = await atualizarPostagem(postagemParaEditar.id, {
          ...formData,
          usuarioId,
        });
      } else {
        resultado = await criarPostagem({
          ...formData,
          usuarioId,
        });
      }
      
      onSuccess?.(resultado);
      
      // Limpar formulário se não for edição
      if (!isEdicao) {
        setFormData({
          titulo: '',
          conteudo: '',
        });
      }
    } catch (err) {
      console.error('Erro ao salvar postagem:', err);
      onError?.(`Erro ao ${isEdicao ? 'atualizar' : 'criar'} postagem: ${err.message}`);
    }
  };

  return (
    <div className="postagem-form">
      <h2>{isEdicao ? 'Editar Postagem' : 'Nova Postagem'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
            disabled={loading}
            maxLength={200}
          />
        </div>

        <div className="form-group">
          <label htmlFor="conteudo">Conteúdo:</label>
          <textarea
            id="conteudo"
            name="conteudo"
            value={formData.conteudo}
            onChange={handleChange}
            required
            disabled={loading}
            rows={6}
          />
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : (isEdicao ? 'Atualizar' : 'Criar Postagem')}
        </button>
      </form>
    </div>
  );
};

export default PostagemForm;