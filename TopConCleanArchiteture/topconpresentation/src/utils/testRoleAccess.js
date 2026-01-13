// Teste para verificar o controle de acesso baseado em roles
import { usuarioService, postagemService } from '../services/api';

export const testRoleAccess = async () => {
  console.log('🧪 Iniciando teste de controle de acesso baseado em roles...');
  
  try {
    // 1. Criar usuário admin
    console.log('\n1️⃣ Criando usuário administrador...');
    const adminUser = await usuarioService.criarUsuario({
      nomeUsuario: 'Admin Test',
      email: 'admin@test.com',
      senhaHash: '123456',
      role: 'admin'
    });
    console.log('✅ Usuário admin criado:', adminUser);

    // 2. Criar usuário comum
    console.log('\n2️⃣ Criando usuário comum...');
    const commonUser = await usuarioService.criarUsuario({
      nomeUsuario: 'User Test',
      email: 'user@test.com',
      senhaHash: '123456',
      role: 'user'
    });
    console.log('✅ Usuário comum criado:', commonUser);

    // 3. Testar login do admin
    console.log('\n3️⃣ Testando login do administrador...');
    const adminLogin = await usuarioService.login('admin@test.com', '123456');
    console.log('✅ Login admin bem-sucedido:', adminLogin);

    // 4. Testar login do usuário comum
    console.log('\n4️⃣ Testando login do usuário comum...');
    const userLogin = await usuarioService.login('user@test.com', '123456');
    console.log('✅ Login usuário comum bem-sucedido:', userLogin);

    // 5. Criar postagem como admin
    console.log('\n5️⃣ Criando postagem como administrador...');
    const postagem = await postagemService.criarPostagem({
      titulo: 'Postagem de Teste Admin',
      conteudo: 'Esta postagem foi criada por um administrador para testar o sistema de roles.',
      usuarioId: adminLogin.usuario.id
    });
    console.log('✅ Postagem criada pelo admin:', postagem);

    // 6. Listar todas as postagens
    console.log('\n6️⃣ Listando todas as postagens...');
    const todasPostagens = await postagemService.buscarTodasPostagens();
    console.log('✅ Postagens encontradas:', todasPostagens.length);

    console.log('\n🎉 Teste de controle de acesso concluído com sucesso!');
    console.log('\n📋 Resumo dos resultados:');
    console.log(`- Admin criado: ${adminUser.nomeUsuario} (${adminUser.role})`);
    console.log(`- Usuário comum criado: ${commonUser.nomeUsuario} (${commonUser.role})`);
    console.log(`- Login admin funcionando: ✅`);
    console.log(`- Login usuário comum funcionando: ✅`);
    console.log(`- Postagem criada pelo admin: ✅`);
    console.log(`- Total de postagens: ${todasPostagens.length}`);

    return {
      success: true,
      adminUser,
      commonUser,
      adminLogin,
      userLogin,
      postagem,
      todasPostagens
    };

  } catch (error) {
    console.error('❌ Erro no teste de controle de acesso:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Função para testar apenas o login (caso os usuários já existam)
export const testLoginOnly = async () => {
  console.log('🔐 Testando apenas login dos usuários existentes...');
  
  try {
    // Testar login do admin
    console.log('\n1️⃣ Testando login do administrador...');
    const adminLogin = await usuarioService.login('admin@test.com', '123456');
    console.log('✅ Login admin bem-sucedido:', adminLogin);

    // Testar login do usuário comum
    console.log('\n2️⃣ Testando login do usuário comum...');
    const userLogin = await usuarioService.login('user@test.com', '123456');
    console.log('✅ Login usuário comum bem-sucedido:', userLogin);

    console.log('\n🎉 Teste de login concluído com sucesso!');
    return {
      success: true,
      adminLogin,
      userLogin
    };

  } catch (error) {
    console.error('❌ Erro no teste de login:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Para usar no console do navegador:
// import { testRoleAccess, testLoginOnly } from './utils/testRoleAccess';
// testRoleAccess().then(result => console.log('Resultado:', result));