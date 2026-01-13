import api from '../services/api';

export const testLoginDirect = async () => {
  console.log('🔍 Testando login direto no endpoint /api/Login...');
  
  try {
    // Teste com dados válidos
    console.log('1. Testando com dados válidos...');
    const loginData = {
      email: 'teste@login.com',
      senha: 'senha123'
    };
    
    console.log('   📤 Enviando:', loginData);
    
    const response = await api.post('/Login', loginData);
    
    console.log('   ✅ Resposta recebida!');
    console.log('   📄 Status:', response.status);
    console.log('   📄 Dados:', response.data);
    
    return response.data;
    
  } catch (error) {
    console.log('   ❌ Erro na requisição:', error.message);
    
    if (error.response) {
      console.log('   📄 Status do erro:', error.response.status);
      console.log('   📄 Dados do erro:', error.response.data);
      
      // Mostrar erros de validação se existirem
      if (error.response.data?.errors) {
        console.log('   📋 Erros de validação:');
        Object.entries(error.response.data.errors).forEach(([field, messages]) => {
          console.log(`     ${field}: ${messages.join(', ')}`);
        });
      }
    }
    
    throw error;
  }
};

export const testLoginValidation = async () => {
  console.log('🔍 Testando validação do login...');
  
  const testCases = [
    {
      name: 'Email vazio',
      data: { email: '', senha: 'senha123' }
    },
    {
      name: 'Email inválido',
      data: { email: 'email-invalido', senha: 'senha123' }
    },
    {
      name: 'Senha vazia',
      data: { email: 'teste@email.com', senha: '' }
    },
    {
      name: 'Senha muito curta',
      data: { email: 'teste@email.com', senha: '123' }
    },
    {
      name: 'Dados válidos',
      data: { email: 'teste@login.com', senha: 'senha123' }
    }
  ];
  
  for (const testCase of testCases) {
    console.log(`\n📋 Teste: ${testCase.name}`);
    console.log('   📤 Dados:', testCase.data);
    
    try {
      const response = await api.post('/Login', testCase.data);
      console.log('   ✅ Sucesso:', response.data);
    } catch (error) {
      if (error.response?.status === 400) {
        console.log('   ⚠️ Erro de validação (esperado):', error.response.data.errors);
      } else if (error.response?.status === 401) {
        console.log('   🔒 Não autorizado (esperado):', error.response.data.message);
      } else {
        console.log('   ❌ Erro inesperado:', error.message);
      }
    }
  }
};

// Disponibilizar no console do navegador
if (typeof window !== 'undefined') {
  window.testLoginDirect = testLoginDirect;
  window.testLoginValidation = testLoginValidation;
  console.log('🛠️ Funções disponíveis:');
  console.log('   - testLoginDirect(): Testa login direto');
  console.log('   - testLoginValidation(): Testa validações');
}