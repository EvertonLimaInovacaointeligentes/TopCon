import axios from 'axios';

// Configuração base da API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://localhost:7213/api';

// Instância do axios com configurações padrão
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requisições (adicionar token de autenticação se necessário)
api.interceptors.request.use(
  (config) => {
    // Aqui você pode adicionar token de autenticação se implementar
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para respostas (tratamento de erros globais)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Tratamento de erros globais
    if (error.response?.status === 401) {
      // Token expirado ou não autorizado
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ===== SERVIÇOS DE USUÁRIO =====

export const usuarioService = {
  // Criar novo usuário (registro)
  async criarUsuario(usuario) {
    try {
      console.log('🔄 Enviando dados para API:', usuario);
      console.log('🌐 URL da API:', api.defaults.baseURL);
      
      const response = await api.post('/Usuario', {
        nomeUsuario: usuario.nomeUsuario,
        email: usuario.email,
        senhaHash: usuario.senhaHash, // Em produção, a senha deve ser hasheada no backend
        role: usuario.role || 'user', // Padrão é user
        dataCadastro: new Date().toISOString(),
      });
      
      console.log('✅ Resposta da API:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erro detalhado:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          baseURL: error.config?.baseURL,
          data: error.config?.data
        }
      });
      
      // Melhor tratamento de erro com mais detalhes
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.response?.data?.errors) {
        // Tratar erros de validação do ModelState
        const validationErrors = Object.entries(error.response.data.errors)
          .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
          .join('; ');
        throw new Error(`Erros de validação: ${validationErrors}`);
      } else if (error.response?.status) {
        throw new Error(`Erro HTTP ${error.response.status}: ${error.response.statusText}`);
      } else if (error.code === 'ERR_NETWORK') {
        throw new Error('Erro de rede: Não foi possível conectar à API');
      } else {
        throw new Error(error.message || 'Erro ao criar usuário');
      }
    }
  },

  // Atualizar usuário existente
  async atualizarUsuario(usuarioId, usuario) {
    try {
      const response = await api.put(`/Usuario/${usuarioId}`, {
        nomeUsuario: usuario.nomeUsuario,
        email: usuario.email,
        senhaHash: usuario.senhaHash,
        dataAtualizacao: new Date().toISOString(),
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar usuário');
    }
  },

  // Login usando o LoginController
  async login(email, senha) {
    try {
      const response = await api.post('/Login', {
        email: email,
        senha: senha,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro no login');
    }
  },
};

// ===== SERVIÇOS DE POSTAGEM =====

export const postagemService = {
  // Criar nova postagem
  async criarPostagem(postagem) {
    try {
      console.log('🔄 Criando postagem - Dados enviados:', postagem);
      console.log('🌐 URL da API:', api.defaults.baseURL);
      
      const response = await api.post('/Postagem', {
        titulo: postagem.titulo,
        conteudo: postagem.conteudo,
        usuarioId: postagem.usuarioId,
        dataCriacao: new Date().toISOString(),
      });
      
      console.log('✅ Postagem criada com sucesso:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao criar postagem:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          baseURL: error.config?.baseURL,
          data: error.config?.data
        }
      });
      
      // Melhor tratamento de erro
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.response?.data?.errors) {
        const validationErrors = Object.entries(error.response.data.errors)
          .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
          .join('; ');
        throw new Error(`Erros de validação: ${validationErrors}`);
      } else if (error.response?.status) {
        throw new Error(`Erro HTTP ${error.response.status}: ${error.response.statusText}`);
      } else if (error.code === 'ERR_NETWORK') {
        throw new Error('Erro de rede: Não foi possível conectar à API');
      } else {
        throw new Error(error.message || 'Erro ao criar postagem');
      }
    }
  },

  // Buscar todas as postagens
  async buscarTodasPostagens() {
    try {
      const response = await api.get('/Postagem/postagens');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar postagens');
    }
  },

  // Buscar postagem por ID
  async buscarPostagemPorId(postagemId) {
    try {
      const response = await api.get(`/Postagem/postagens/${postagemId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar postagem');
    }
  },

  // Atualizar postagem existente
  async atualizarPostagem(postagemId, postagem) {
    try {
      console.log('🔄 Atualizando postagem - ID:', postagemId, 'Dados:', postagem);
      console.log('🌐 URL da API:', api.defaults.baseURL);
      
      const response = await api.put(`/Postagem/${postagemId}`, {
        titulo: postagem.titulo,
        conteudo: postagem.conteudo,
        usuarioId: postagem.usuarioId,
        dataAtualizacao: new Date().toISOString(),
      });
      
      console.log('✅ Postagem atualizada com sucesso:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao atualizar postagem:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          baseURL: error.config?.baseURL,
          data: error.config?.data
        }
      });
      
      // Melhor tratamento de erro
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.response?.data?.errors) {
        const validationErrors = Object.entries(error.response.data.errors)
          .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
          .join('; ');
        throw new Error(`Erros de validação: ${validationErrors}`);
      } else if (error.response?.status) {
        throw new Error(`Erro HTTP ${error.response.status}: ${error.response.statusText}`);
      } else if (error.code === 'ERR_NETWORK') {
        throw new Error('Erro de rede: Não foi possível conectar à API');
      } else {
        throw new Error(error.message || 'Erro ao atualizar postagem');
      }
    }
  },

  // Deletar postagem
  async deletarPostagem(postagemId, usuarioId) {
    try {
      const response = await api.delete(`/Postagem/${postagemId}`, {
        data: {
          usuarioId: usuarioId,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao deletar postagem');
    }
  },
};

// ===== UTILITÁRIOS =====

export const apiUtils = {
  // Verificar se a API está online
  async verificarStatus() {
    try {
      const response = await api.get('/health'); // Endpoint de health check se existir
      return response.status === 200;
    } catch (error) {
      return false;
    }
  },

  // Configurar URL base da API
  setBaseURL(url) {
    api.defaults.baseURL = url;
  },

  // Configurar token de autenticação
  setAuthToken(token) {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('authToken', token);
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('authToken');
    }
  },

  // Obter token de autenticação
  getAuthToken() {
    return localStorage.getItem('authToken');
  },
};

// Exportar instância do axios para uso direto se necessário
export default api;