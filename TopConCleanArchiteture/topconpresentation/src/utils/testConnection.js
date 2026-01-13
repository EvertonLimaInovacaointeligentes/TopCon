import api from '../services/api';

export const testApiConnection = async () => {
  console.log('🔍 Testando conexão com a API...');
  console.log(`📡 URL da API: ${api.defaults.baseURL}`);
  
  try {
    // Teste simples de conectividade - mesmo que retorne erro, 
    // se conseguir conectar significa que a URL está correta
    const response = await api.post('/Login', {
      email: 'test@test.com',
      senha: 'test123'
    });
    
    console.log('✅ Conexão bem-sucedida!', response.data);
    return { success: true, data: response.data };
    
  } catch (error) {
    if (error.code === 'ERR_NETWORK' || error.message.includes('ERR_CONNECTION_REFUSED')) {
      console.log('❌ Erro de conexão: API não está acessível');
      console.log(`   Verifique se a API está rodando em: ${api.defaults.baseURL}`);
      return { success: false, error: 'CONNECTION_ERROR', message: error.message };
    } else if (error.response) {
      // Se chegou aqui, a conexão funcionou, mas houve erro de validação/autenticação
      console.log('✅ Conexão OK! (Erro de validação esperado)');
      console.log(`   Status: ${error.response.status}`);
      console.log(`   Dados: ${JSON.stringify(error.response.data)}`);
      return { success: true, connectionOk: true, validationError: error.response.data };
    } else {
      console.log('❌ Erro desconhecido:', error.message);
      return { success: false, error: 'UNKNOWN_ERROR', message: error.message };
    }
  }
};

export const testEnvironmentConfig = () => {
  console.log('🔧 Verificando configuração do ambiente...');
  console.log(`   REACT_APP_API_URL: ${process.env.REACT_APP_API_URL}`);
  console.log(`   API Base URL: ${api.defaults.baseURL}`);
  console.log(`   Timeout: ${api.defaults.timeout}ms`);
  
  const expectedUrl = 'https://localhost:7213/api';
  const currentUrl = api.defaults.baseURL;
  
  if (currentUrl === expectedUrl) {
    console.log('✅ URL da API está correta!');
    return { success: true, url: currentUrl };
  } else {
    console.log('❌ URL da API está incorreta!');
    console.log(`   Esperado: ${expectedUrl}`);
    console.log(`   Atual: ${currentUrl}`);
    return { success: false, expected: expectedUrl, actual: currentUrl };
  }
};

// Disponibilizar no console do navegador
if (typeof window !== 'undefined') {
  window.testApiConnection = testApiConnection;
  window.testEnvironmentConfig = testEnvironmentConfig;
  console.log('🛠️ Funções de teste disponíveis:');
  console.log('   - testApiConnection(): Testa conexão com a API');
  console.log('   - testEnvironmentConfig(): Verifica configuração do ambiente');
}