// Utilitário para testar a conexão com a API
import { usuarioService, postagemService, apiUtils } from '../services/api';

export const testApiConnection = async () => {
  console.log('🔍 Testando conexão com a API...');
  
  try {
    // Teste 1: Verificar se a API está online
    console.log('1. Verificando status da API...');
    const isOnline = await apiUtils.verificarStatus();
    console.log(`   Status: ${isOnline ? '✅ Online' : '❌ Offline'}`);
    
    // Teste 2: Tentar buscar postagens
    console.log('2. Testando busca de postagens...');
    try {
      const postagens = await postagemService.buscarTodasPostagens();
      console.log(`   ✅ Postagens encontradas: ${postagens.length}`);
    } catch (error) {
      console.log(`   ❌ Erro ao buscar postagens: ${error.message}`);
    }
    
    // Teste 3: Testar criação de usuário (dados de teste)
    console.log('3. Testando criação de usuário...');
    try {
      const usuarioTeste = {
        nomeUsuario: `teste_${Date.now()}`,
        email: `teste${Date.now()}@email.com`,
        senhaHash: 'senha123'
      };
      
      const novoUsuario = await usuarioService.criarUsuario(usuarioTeste);
      console.log(`   ✅ Usuário criado: ID ${novoUsuario.id}`);
      
      // Teste 4: Testar criação de postagem
      console.log('4. Testando criação de postagem...');
      const postagemTeste = {
        titulo: 'Postagem de Teste',
        conteudo: 'Esta é uma postagem de teste criada automaticamente.',
        usuarioId: novoUsuario.id
      };
      
      const novaPostagem = await postagemService.criarPostagem(postagemTeste);
      console.log(`   ✅ Postagem criada: ID ${novaPostagem.id}`);
      
      // Teste 5: Testar busca por ID
      console.log('5. Testando busca de postagem por ID...');
      const postagemEncontrada = await postagemService.buscarPostagemPorId(novaPostagem.id);
      console.log(`   ✅ Postagem encontrada: "${postagemEncontrada.titulo}"`);
      
      console.log('🎉 Todos os testes passaram! A integração está funcionando.');
      
    } catch (error) {
      console.log(`   ❌ Erro nos testes: ${error.message}`);
    }
    
  } catch (error) {
    console.log(`❌ Erro geral: ${error.message}`);
  }
};

// Função para testar endpoints específicos
export const testSpecificEndpoint = async (endpoint, method = 'GET', data = null) => {
  console.log(`🔍 Testando ${method} ${endpoint}...`);
  
  try {
    let response;
    const api = (await import('../services/api')).default;
    
    switch (method.toUpperCase()) {
      case 'GET':
        response = await api.get(endpoint);
        break;
      case 'POST':
        response = await api.post(endpoint, data);
        break;
      case 'PUT':
        response = await api.put(endpoint, data);
        break;
      case 'DELETE':
        response = await api.delete(endpoint, { data });
        break;
      default:
        throw new Error(`Método ${method} não suportado`);
    }
    
    console.log(`✅ Sucesso: Status ${response.status}`);
    console.log('📄 Resposta:', response.data);
    return response.data;
    
  } catch (error) {
    console.log(`❌ Erro: ${error.message}`);
    if (error.response) {
      console.log(`   Status: ${error.response.status}`);
      console.log(`   Dados: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
};

// Executar testes no console do navegador
if (typeof window !== 'undefined') {
  window.testApiConnection = testApiConnection;
  window.testSpecificEndpoint = testSpecificEndpoint;
  console.log('🛠️ Funções de teste disponíveis:');
  console.log('   - testApiConnection(): Testa toda a integração');
  console.log('   - testSpecificEndpoint(endpoint, method, data): Testa endpoint específico');
}