import { useState, useCallback, useEffect } from 'react';
import { postagemService } from '../services/api';

export const usePostagem = () => {
  const [postagens, setPostagens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const buscarTodasPostagens = useCallback(async () => {
    console.log('🔄 Buscando todas as postagens...');
    setLoading(true);
    setError(null);
    try {
      const dados = await postagemService.buscarTodasPostagens();
      console.log('✅ Postagens carregadas:', dados.length, 'postagens');
      setPostagens(dados);
      return dados;
    } catch (err) {
      console.error('❌ Erro ao buscar postagens:', err.message);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const buscarPostagemPorId = useCallback(async (postagemId) => {
    setLoading(true);
    setError(null);
    try {
      const postagem = await postagemService.buscarPostagemPorId(postagemId);
      return postagem;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const criarPostagem = useCallback(async (dadosPostagem) => {
    console.log('🔄 Criando postagem:', dadosPostagem);
    setLoading(true);
    setError(null);
    try {
      const novaPostagem = await postagemService.criarPostagem(dadosPostagem);
      console.log('✅ Postagem criada:', novaPostagem);
      
      // Após criar com sucesso, buscar todas as postagens novamente para garantir dados atualizados
      console.log('🔄 Atualizando lista após criar postagem...');
      await buscarTodasPostagens();
      
      return novaPostagem;
    } catch (err) {
      console.error('❌ Erro ao criar postagem:', err.message);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [buscarTodasPostagens]);

  const atualizarPostagem = useCallback(async (postagemId, dadosPostagem) => {
    setLoading(true);
    setError(null);
    try {
      const postagemAtualizada = await postagemService.atualizarPostagem(postagemId, dadosPostagem);
      
      // Após atualizar com sucesso, buscar todas as postagens novamente para garantir dados atualizados
      await buscarTodasPostagens();
      
      return postagemAtualizada;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [buscarTodasPostagens]);

  const deletarPostagem = useCallback(async (postagemId, usuarioId) => {
    setLoading(true);
    setError(null);
    try {
      await postagemService.deletarPostagem(postagemId, usuarioId);
      
      // Após deletar com sucesso, buscar todas as postagens novamente para garantir dados atualizados
      await buscarTodasPostagens();
      
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [buscarTodasPostagens]);

  // Carregar postagens automaticamente quando o hook é usado
  useEffect(() => {
    buscarTodasPostagens();
  }, [buscarTodasPostagens]);

  return {
    postagens,
    buscarTodasPostagens,
    buscarPostagemPorId,
    criarPostagem,
    atualizarPostagem,
    deletarPostagem,
    refreshPostagens: buscarTodasPostagens, // Alias para refresh manual
    loading,
    error,
  };
};