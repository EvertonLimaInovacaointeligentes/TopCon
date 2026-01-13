import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegistroForm from './RegistroForm';
import PostagemForm from './PostagemForm';
import ListaPostagens from './ListaPostagens';
import { useToast } from './Toast';
import { usePostagem } from '../hooks/usePostagem';
import { apiUtils } from '../services/api';

const AppPrincipal = () => {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [telaAtiva, setTelaAtiva] = useState('login'); // 'login', 'registro', 'postagens'
  const [postagemEditando, setPostagemEditando] = useState(null);
  const { showToast, ToastContainer } = useToast();
  
  // Hook compartilhado para postagens
  const {
    postagens,
    criarPostagem,
    atualizarPostagem,
    deletarPostagem,
    loading: postagemLoading,
    error: postagemError
  } = usePostagem();

  const handleLoginSuccess = (resultado) => {
    setUsuarioLogado(resultado.usuario); // Extrair o objeto usuario do resultado
    setTelaAtiva('postagens');
    
    const roleText = resultado.usuario.role === 'admin' ? 'Administrador' : 'Usuário';
    showToast(`Bem-vindo, ${resultado.usuario.nomeUsuario}! (${roleText})`, 'success');
    
    // Se houver token, configurar no axios
    if (resultado.token) {
      apiUtils.setAuthToken(resultado.token);
    }
  };

  const handleRegistroSuccess = () => {
    showToast('Conta criada com sucesso! Faça login para continuar.', 'success');
    setTelaAtiva('login');
  };

  const handleLogout = () => {
    setUsuarioLogado(null);
    setTelaAtiva('login');
    setPostagemEditando(null);
    apiUtils.setAuthToken(null);
  };

  const handleEditarPostagem = (postagem) => {
    // Só admin pode editar postagens
    if (usuarioLogado?.role !== 'admin') {
      showToast('Apenas administradores podem editar postagens!', 'error');
      return;
    }
    setPostagemEditando(postagem);
  };

  const handlePostagemSuccess = (postagem) => {
    setPostagemEditando(null);
    if (postagem) {
      showToast('Postagem salva com sucesso! Lista atualizada.', 'success');
    }
  };

  const renderTela = () => {
    switch (telaAtiva) {
      case 'login':
        return <LoginForm onLoginSuccess={handleLoginSuccess} />;
      
      case 'registro':
        return <RegistroForm onRegistroSuccess={handleRegistroSuccess} />;
      
      case 'postagens':
        const isAdmin = usuarioLogado?.role === 'admin';
        
        return (
          <div className="postagens-container">
            <div className="header-postagens">
              <h1>
                Bem-vindo, {usuarioLogado?.nomeUsuario || 'Usuário'}!
                {isAdmin && <span className="admin-badge"> (Administrador)</span>}
              </h1>
              <button onClick={handleLogout} className="btn-logout">
                Sair
              </button>
            </div>
            
            {!isAdmin && (
              <div className="user-info">
                <p>📖 Você está visualizando as postagens como usuário comum. Apenas administradores podem criar, editar ou deletar postagens.</p>
              </div>
            )}
            
            {isAdmin && (
              <>
                <PostagemForm
                  usuarioId={usuarioLogado?.id}
                  postagemParaEditar={postagemEditando}
                  onSuccess={handlePostagemSuccess}
                  onError={(message) => showToast(message, 'error')}
                  criarPostagem={criarPostagem}
                  atualizarPostagem={atualizarPostagem}
                  loading={postagemLoading}
                  error={postagemError}
                />
                
                {postagemEditando && (
                  <button 
                    onClick={() => setPostagemEditando(null)}
                    className="btn-cancelar"
                  >
                    Cancelar Edição
                  </button>
                )}
              </>
            )}
            
            <ListaPostagens
              usuarioLogado={usuarioLogado}
              onEditarPostagem={handleEditarPostagem}
              postagens={postagens}
              deletarPostagem={deletarPostagem}
              loading={postagemLoading}
              error={postagemError}
              isAdmin={isAdmin}
            />
          </div>
        );
      
      default:
        return <div>Tela não encontrada</div>;
    }
  };

  return (
    <div className="app-principal">
      <header className="app-header">
        <h1>TopCon - Sistema de Postagens</h1>
        
        {!usuarioLogado && (
          <nav className="nav-auth">
            <button
              onClick={() => setTelaAtiva('login')}
              className={telaAtiva === 'login' ? 'active' : ''}
            >
              Login
            </button>
            <button
              onClick={() => setTelaAtiva('registro')}
              className={telaAtiva === 'registro' ? 'active' : ''}
            >
              Criar Conta
            </button>
          </nav>
        )}
      </header>

      <main className="app-main">
        {renderTela()}
      </main>

      <footer className="app-footer">
        <p>&copy; 2026 TopCon. Todos os direitos reservados.</p>
      </footer>

      <ToastContainer />
    </div>
  );
};

export default AppPrincipal;