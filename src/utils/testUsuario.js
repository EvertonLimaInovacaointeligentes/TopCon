import { usuarioService } from '../services/api';

export const testCriarUsuario = async () => {
  console.log('🧪 Testando criação de usuário via React...');
  
  const dadosUsuario = {
    nomeUsuario: 'Teste Frontend',
    email: `teste${Date.now()}@frontend.com`, // Email único
    senhaHash: 'senha123456'
  };
  
  console.log('📤 Dados do usuário:', dadosUsuario);
  
  try {
    const resultado = await usuarioService.criarUsuario(dadosUsuario);
    console.log('✅ Usuário criado com sucesso!', resultado);
    return resultado;
  } catch (error) {
    console.error('❌ Erro ao criar usuário:', error.message);
    throw error;
  }
};

export const testValidacaoUsuario = async () => {
  console.log('🧪 Testando validações de usuário...');
  
  const testCases = [
    {
      name: 'Email vazio',
      data: { nomeUsuario: 'Teste', email: '', senhaHash: 'senha123' }
    },
    {
      name: 'Nome vazio',
      data: { nomeUsuario: '', email: 'teste@email.com', senhaHash: 'senha123' }
    },
    {
      name: 'Senha vazia',
      data: { nomeUsuario: 'Teste', email: 'teste@email.com', senhaHash: '' }
    },
    {
      name: 'Email inválido',
      data: { nomeUsuario: 'Teste', email: 'email-invalido', senhaHash: 'senha123' }
    }
  ];
  
  for (const testCase of testCases) {
    console.log(`\n📋 Teste: ${testCase.name}`);
    console.log('   📤 Dados:', testCase.data);
    
    try {
      const resultado = await usuarioService.criarUsuario(testCase.data);
      console.log('   ❌ Erro: Validação deveria ter falhado', resultado);
    } catch (error) {
      console.log('   ✅ Validação funcionou:', error.message);
    }
  }
};

// Disponibilizar no console do navegador
if (typeof window !== 'undefined') {
  window.testCriarUsuario = testCriarUsuario;
  window.testValidacaoUsuario = testValidacaoUsuario;
  console.log('🛠️ Funções de teste de usuário disponíveis:');
  console.log('   - testCriarUsuario(): Testa criação de usuário');
  console.log('   - testValidacaoUsuario(): Testa validações');
}