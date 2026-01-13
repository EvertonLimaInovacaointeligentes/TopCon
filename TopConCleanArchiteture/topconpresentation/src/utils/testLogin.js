import { usuarioService } from '../services/api';

export const testLogin = async () => {
  console.log('🔍 Testando login...');
  
  try {
    // Primeiro, criar um usuário de teste
    console.log('1. Criando usuário de teste...');
    const usuarioTeste = {
      nomeUsuario: 'teste_login',
      email: 'teste@login.com',
      senhaHash: 'senha123'
    };
    
    try {
      await usuarioService.criarUsuario(usuarioTeste);
      console.log('   ✅ Usuário de teste criado');
    } catch (error) {
      console.log('   ⚠️ Usuário pode já existir:', error.message);
    }
    
    // Testar login com endpoint /api/Login
    console.log('2. Testando login no endpoint /api/Login...');
    const resultado = await usuarioService.login('teste@login.com', 'senha123');
    
    console.log('   ✅ Login realizado com sucesso!');
    console.log('   📄 Resultado:', resultado);
    
    if (resultado.success) {
      console.log('   👤 Usuário:', resultado.usuario?.nomeUsuario);
      console.log('   🔑 Token:', resultado.token);
    }
    
    return resultado;
    
  } catch (error) {
    console.log('   ❌ Erro no login:', error.message);
    console.log('   📄 Detalhes do erro:', error);
    
    // Tentar mostrar detalhes do erro de validação
    if (error.response?.data?.errors) {
      console.log('   📋 Erros de validação:');
      Object.entries(error.response.data.errors).forEach(([field, messages]) => {
        console.log(`     ${field}: ${messages.join(', ')}`);
      });
    }
    
    throw error;
  }
};

// Disponibilizar no console do navegador
if (typeof window !== 'undefined') {
  window.testLogin = testLogin;
  console.log('🛠️ Função testLogin() disponível no console');
}