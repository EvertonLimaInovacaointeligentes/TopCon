import { postagemService } from '../services/api';

export const testCriarPostagem = async (usuarioId = 6) => {
  console.log('🧪 Testando criação de postagem via React...');
  
  const dadosPostagem = {
    titulo: `Postagem Teste ${Date.now()}`,
    conteudo: 'Este é um teste de criação de postagem via React frontend.',
    usuarioId: usuarioId
  };
  
  console.log('📤 Dados da postagem:', dadosPostagem);
  
  try {
    const resultado = await postagemService.criarPostagem(dadosPostagem);
    console.log('✅ Postagem criada com sucesso!', resultado);
    return resultado;
  } catch (error) {
    console.error('❌ Erro ao criar postagem:', error.message);
    throw error;
  }
};

export const testBuscarPostagens = async () => {
  console.log('🧪 Testando busca de postagens...');
  
  try {
    const postagens = await postagemService.buscarTodasPostagens();
    console.log('✅ Postagens encontradas:', postagens);
    return postagens;
  } catch (error) {
    console.error('❌ Erro ao buscar postagens:', error.message);
    throw error;
  }
};

export const testFluxoCompletoPostagem = async () => {
  console.log('🧪 Testando fluxo completo de postagem...');
  
  try {
    // 1. Buscar postagens existentes
    console.log('1. Buscando postagens existentes...');
    const postagensAntes = await testBuscarPostagens();
    
    // 2. Criar nova postagem
    console.log('2. Criando nova postagem...');
    const novaPostagem = await testCriarPostagem();
    
    // 3. Buscar postagens novamente
    console.log('3. Verificando se postagem foi criada...');
    const postagensDepois = await testBuscarPostagens();
    
    console.log('📊 Resultado do teste:');
    console.log(`   Postagens antes: ${postagensAntes.length}`);
    console.log(`   Postagens depois: ${postagensDepois.length}`);
    console.log(`   Nova postagem ID: ${novaPostagem.id}`);
    
    return {
      success: true,
      postagensAntes: postagensAntes.length,
      postagensDepois: postagensDepois.length,
      novaPostagem
    };
    
  } catch (error) {
    console.error('❌ Erro no fluxo completo:', error.message);
    throw error;
  }
};

// Disponibilizar no console do navegador
if (typeof window !== 'undefined') {
  window.testCriarPostagem = testCriarPostagem;
  window.testBuscarPostagens = testBuscarPostagens;
  window.testFluxoCompletoPostagem = testFluxoCompletoPostagem;
  console.log('🛠️ Funções de teste de postagem disponíveis:');
  console.log('   - testCriarPostagem(usuarioId): Testa criação de postagem');
  console.log('   - testBuscarPostagens(): Testa busca de postagens');
  console.log('   - testFluxoCompletoPostagem(): Testa fluxo completo');
}