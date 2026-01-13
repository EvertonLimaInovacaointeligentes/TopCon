import React, { useState } from 'react';

const ListaPostagens = ({ 
  usuarioLogado, 
  onEditarPostagem,
  postagens,
  deletarPostagem,
  loading,
  error,
  isAdmin
}) => {
  const [deletandoId, setDeletandoId] = useState(null);

  const handleDeletar = async (postagemId) => {
    if (!isAdmin) {
      alert('Apenas administradores podem deletar postagens!');
      return;
    }

    if (!window.confirm('Tem certeza que deseja deletar esta postagem?')) {
      return;
    }

    try {
      setDeletandoId(postagemId);
      await deletarPostagem(postagemId, usuarioLogado.id);
      alert('Postagem deletada com sucesso!');
    } catch (err) {
      console.error('Erro ao deletar postagem:', err);
    } finally {
      setDeletandoId(null);
    }
  };

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading && postagens.length === 0) {
    return <div className="loading">Carregando postagens...</div>;
  }

  if (error) {
    return <div className="error-message">Erro ao carregar postagens: {error}</div>;
  }

  if (postagens.length === 0) {
    return <div className="no-posts">Nenhuma postagem encontrada.</div>;
  }

  return (
    <div className="lista-postagens">
      <h2>Postagens</h2>
      {postagens.map((postagem) => (
        <div key={postagem.id} className="postagem-card">
          <div className="postagem-header">
            <h3>{postagem.titulo}</h3>
            <div className="postagem-meta">
              <span className="data">
                {formatarData(postagem.dataCriacao)}
              </span>
              {postagem.dataAtualizacao && (
                <span className="editado">
                  (Editado em {formatarData(postagem.dataAtualizacao)})
                </span>
              )}
            </div>
          </div>
          
          <div className="postagem-conteudo">
            <p>{postagem.conteudo}</p>
          </div>

          {isAdmin && (
            <div className="postagem-acoes">
              <button
                onClick={() => onEditarPostagem?.(postagem)}
                disabled={deletandoId === postagem.id}
              >
                Editar
              </button>
              <button
                onClick={() => handleDeletar(postagem.id)}
                disabled={deletandoId === postagem.id}
                className="btn-deletar"
              >
                {deletandoId === postagem.id ? 'Deletando...' : 'Deletar'}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListaPostagens;