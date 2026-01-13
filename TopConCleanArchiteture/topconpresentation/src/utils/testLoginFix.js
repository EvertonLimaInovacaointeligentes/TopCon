// Teste para verificar se o login está funcionando após a correção
import { usuarioService } from '../services/api';

export const testLoginFix = async () => {
  console.log('🧪 Testando login após correção da URL da API...');
  
  try {
    // Testar login do admin
    console.log('\n1️⃣ Testando login do administrador...');
    console.log('📍 URL da API:', process.env.REACT_APP_API_URL);
    
    const adminLogin = await usuarioService.login('admin@test.com', '123456');
    console.log('✅ Login admin bem-sucedido:', adminLogin);

    // Testar login do usuário comum
    console.log('\n2️⃣ Testando login do usuário comum...');
    const userLogin = await usuarioService.login('user@test.com', '123456');
    console.log('✅ Login usuário comum bem-sucedido:', userLogin);

    console.log('\n🎉 Teste de login concluído com sucesso!');
    console.log('\n📋 Resumo dos resultados:');
    console.log(`- Admin login: ✅ ${adminLogin.usuario.nomeUsuario} (${adminLogin.usuario.role})`);
    console.log(`- User login: ✅ ${userLogin.usuario.nomeUsuario} (${userLogin.usuario.role})`);
    console.log(`- URL da API: ${process.env.REACT_APP_API_URL}`);

    return {
      success: true,
      adminLogin,
      userLogin,
      apiUrl: process.env.REACT_APP_API_URL
    };

  } catch (error) {
    console.error('❌ Erro no teste de login:', error);
    console.error('📍 URL da API:', process.env.REACT_APP_API_URL);
    console.error('🔍 Detalhes do erro:', {
      message: error.message,
      stack: error.stack
    });
    
    return {
      success: false,
      error: error.message,
      apiUrl: process.env.REACT_APP_API_URL
    };
  }
};

// Para usar no console do navegador:
// import { testLoginFix } from './utils/testLoginFix';
// testLoginFix().then(result => console.log('Resultado:', result));