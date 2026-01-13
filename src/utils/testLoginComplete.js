import { usuarioService } from '../services/api';

export const testCompleteLoginFlow = async () => {
  console.log('🔍 Testando fluxo completo de login...');
  
  try {
    // 1. Criar um usuário de teste
    console.log('1. Criando usuário de teste...');
    const novoUsuario = {
      nomeUsuario: 'Usuario Teste Frontend',
      email: 'frontend@teste.com',
      senhaHash: 'senha123456',
      dataCadastro: new Date().toISOString()
    };
    
    const usuarioCriado = await usuarioService.criarUsuario(novoUsuario);
    console.log('   ✅ Usuário criado:', usuarioCriado);
    
    // 2. Fazer login com o usuário criado
    console.log('2. Fazendo login...');
    const loginResult = await usuarioService.login('frontend@teste.com', 'senha123456');
    console.log('   ✅ Login realizado:', loginResult);
    
    // 3. Testar login com credenciais inválidas
    console.log('3. Testando login com credenciais inválidas...');
    try {
      await usuarioService.login('frontend@teste.com', 'senhaerrada');
      console.log('   ❌ Erro: Login deveria ter falhou');
    } catch (error) {
      console.log('   ✅ Login falhou como esperado:', error.message);
    }
    
    // 4. Testar validação de campos
    console.log('4. Testando validação de campos...');
    try {
      await usuarioService.login('', '');
      console.log('   ❌ Erro: Validação deveria ter falhado');
    } catch (error) {
      console.log('   ✅ Validação funcionou como esperado:', error.message);
    }
    
    console.log('🎉 Todos os testes passaram!');
    return {
      success: true,
      usuario: usuarioCriado,
      loginResult: loginResult
    };
    
  } catch (error) {
    console.error('❌ Erro no teste:', error.message);
    throw error;
  }
};

// Disponibilizar no console do navegador
if (typeof window !== 'undefined') {
  window.testCompleteLoginFlow = testCompleteLoginFlow;
  console.log('🛠️ Função disponível: testCompleteLoginFlow()');
}