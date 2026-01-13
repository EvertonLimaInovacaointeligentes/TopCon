import { useState, useCallback } from 'react';
import { usuarioService } from '../services/api';

export const useUsuario = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const criarUsuario = useCallback(async (dadosUsuario) => {
    setLoading(true);
    setError(null);
    try {
      const usuario = await usuarioService.criarUsuario(dadosUsuario);
      return usuario;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const atualizarUsuario = useCallback(async (usuarioId, dadosUsuario) => {
    setLoading(true);
    setError(null);
    try {
      const usuario = await usuarioService.atualizarUsuario(usuarioId, dadosUsuario);
      return usuario;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, senha) => {
    setLoading(true);
    setError(null);
    try {
      const resultado = await usuarioService.login(email, senha);
      return resultado;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    criarUsuario,
    atualizarUsuario,
    login,
    loading,
    error,
  };
};