

# TopCon - Sistema de Postagens

## 📋 Visão Geral

O projeto foi criado seguindo as regras
https://topconsuite.notion.site/Teste-t-cnico-d7e65da1eb0542a1a22f963b52978729

Entao montem essa arquitetura do projeto abaixo:

## 🏗️ Arquitetura do Projeto

Observação: Para deixar o projeto pronto para uso dentro do diretório raiz aonde tem o README.md, você vai encontrar o arquivo

### Clean Architecture - Separação por Projetos

O projeto segue os princípios da Clean Architecture, organizando o código em projetos separados para cada camada:

```
TopConCleanArchiteture/
├── 📁 Domain/                          # Camada de Domínio (Core)
├── 📁 TopConApp.Domain/               # Entidades e Interfaces do Domínio
├── 📁 TopConApp.Application/          # Casos de Uso e Lógica de Aplicação
├── 📁 TopConApp.Infrastructure/       # Implementações de Infraestrutura
├── 📁 TopConApp.Api/                  # Camada de Apresentação (API)
├── 📁 TopConApp.*.Tests/              # Projetos de Testes Unitários
└── 📁 topconpresentation/             # Frontend React
```

## 🎯 Funcionalidades Principais

### Sistema de Usuários
- ✅ Cadastro de usuários com roles (admin/user)
- ✅ Sistema de login e autenticação
- ✅ Controle de acesso baseado em roles (RBAC)

### Sistema de Postagens
- ✅ Criação, edição e exclusão de postagens (apenas admins)
- ✅ Visualização de postagens (todos os usuários)
- ✅ Interface diferenciada por tipo de usuário

### Recursos Técnicos
- ✅ API RESTful com .NET 6
- ✅ Frontend responsivo em React
- ✅ Banco de dados PostgreSQL
- ✅ Testes unitários completos
- ✅ Configuração de CORS
- ✅ Padrão CQRS com MediatR

## 🏛️ Detalhamento da Arquitetura

### 1. **TopConApp.Domain** - Camada de Domínio
**Responsabilidade**: Contém as regras de negócio e entidades principais.

```
TopConApp.Domain/
├── Entities/
│   ├── Usuario.cs          # Entidade de usuário com roles
│   ├── Postagem.cs         # Entidade de postagem
│   └── Login.cs            # Modelo de login
└── Interfaces/
    ├── IUsuarioRepository.cs    # Interface do repositório de usuários
    └── IPostagemRepository.cs   # Interface do repositório de postagens
```


### 2. **TopConApp.Application** - Camada de Aplicação
**Responsabilidade**: Implementa os casos de uso e orquestra as operações.

```
TopConApp.Application/
├── Commands/
│   ├── AddUserCommand.cs           # Comando para criar usuário
│   ├── AddPostagemCommand.cs       # Comando para criar postagem
│   ├── UpdatePostagemCommand.cs    # Comando para atualizar postagem
│   ├── DeletePostagemCommand.cs    # Comando para deletar postagem
│   └── LoginCommand.cs             # Comando para login
├── Queries/
│   ├── GetAllPostagemsQuery.cs     # Query para listar postagens
│   ├── GetPostagensByIdQuery.cs    # Query para buscar postagem por ID
│   └── GetUsuarioByIdQuery.cs      # Query para buscar usuário por ID
└── DepencencyInjector.cs           # Configuração de DI
```

**Características**:
- Implementa padrão CQRS (Command Query Responsibility Segregation)
- Usa MediatR para mediação de comandos e queries
- Depende apenas da camada Domain

### 3. **TopConApp.Infrastructure** - Camada de Infraestrutura
**Responsabilidade**: Implementa detalhes técnicos e acesso a dados.

```
TopConApp.Infrastructure/
├── Data/
│   └── AppDBContext.cs             # Contexto do Entity Framework
├── Repositories/
│   ├── UsuarioRepository.cs        # Implementação do repositório de usuários
│   └── PostagemRepository.cs       # Implementação do repositório de postagens
└── Migrations/                     # Migrações do banco de dados
```

**Características**:
- Implementa as interfaces definidas no Domain
- Usa Entity Framework Core com PostgreSQL
- Gerencia migrações e configurações de banco

### 4. **TopConApp.Api** - Camada de Apresentação
**Responsabilidade**: Expõe endpoints REST e gerencia requisições HTTP.

```
TopConApp.Api/
├── Controllers/
│   ├── UsuarioController.cs        # Endpoints de usuários
│   ├── PostagemController.cs       # Endpoints de postagens
│   └── LoginController.cs          # Endpoints de autenticação
├── Program.cs                      # Configuração da aplicação
└── DependencyInjector.cs          # Configuração de dependências
```

**Características**:
- Controllers RESTful
- Configuração de CORS para frontend
- Injeção de dependência configurada
- Swagger para documentação da API

### 5. **Projetos de Testes**
**Responsabilidade**: Garantem a qualidade e funcionamento do código.

```
TopConApp.*.Tests/
├── TopConApp.Domain.Tests/         # Testes das entidades
├── TopConApp.Application.Tests/    # Testes dos casos de uso
├── TopConApp.Infrastructure.Tests/ # Testes dos repositórios
└── TopConApp.Api.Tests/           # Testes dos controllers
```

**Características**:
- Testes unitários com xUnit
- Mocking com Moq
- Cobertura completa das funcionalidades

## ⚛️ Frontend - TopConPresentation (React)

### Estrutura do Projeto React

```
topconpresentation/
├── src/
│   ├── components/
│   │   ├── AppPrincipal.js         # Componente principal da aplicação
│   │   ├── LoginForm.js            # Formulário de login
│   │   ├── RegistroForm.js         # Formulário de registro
│   │   ├── PostagemForm.js         # Formulário de postagens (admin)
│   │   ├── ListaPostagens.js       # Lista de postagens
│   │   ├── Toast.js                # Sistema de notificações
│   │   └── styles.css              # Estilos da aplicação
│   ├── hooks/
│   │   ├── useUsuario.js           # Hook para operações de usuário
│   │   └── usePostagem.js          # Hook para operações de postagem
│   ├── services/
│   │   └── api.js                  # Serviços de comunicação com API
│   └── utils/                      # Utilitários e testes
├── .env                            # Variáveis de ambiente
└── package.json                    # Dependências do projeto
```

### Características do Frontend
- **React Hooks**: Gerenciamento de estado moderno
- **Axios**: Comunicação HTTP com a API
- **Responsive Design**: Interface adaptável a diferentes telas
- **Role-Based UI**: Interface diferenciada por tipo de usuário
- **Toast Notifications**: Sistema de feedback visual
- **Custom Hooks**: Reutilização de lógica de estado

## 🔐 Sistema de Controle de Acesso (RBAC)

### Roles Implementadas

#### 👑 Administrador (role: "admin")
- ✅ Visualizar todas as postagens
- ✅ Criar novas postagens
- ✅ Editar postagens existentes
- ✅ Deletar postagens
- ✅ Badge visual de "Administrador"
- ✅ Acesso completo ao sistema

#### 👤 Usuário Comum (role: "user")
- ✅ Visualizar todas as postagens
- ❌ Criar postagens (formulário não exibido)
- ❌ Editar postagens (botões não visíveis)
- ❌ Deletar postagens (botões não visíveis)
- ✅ Mensagem informativa sobre limitações

### Implementação do RBAC

#### Backend
- Campo `Role` na entidade `Usuario`
- Validação de permissões nos handlers (preparado para JWT)
- Estrutura preparada para `[Authorize(Roles = "admin")]`

#### Frontend
- Controle visual baseado na role do usuário
- Renderização condicional de componentes
- Hooks personalizados para gerenciar permissões

## 🗄️ Banco de Dados

### Tecnologia
- **PostgreSQL**: Banco de dados relacional
- **Entity Framework Core**: ORM para .NET
- **Migrations**: Controle de versão do schema

### Estrutura das Tabelas

#### Tabela: Usuarios
```sql
- Id (int, PK, Identity)
- NomeUsuario (varchar(100))
- Email (varchar, unique)
- SenhaHash (varchar)
- Role (varchar(20), default: 'user')
- DataCadastro (timestamp)
- DataAtualizacao (timestamp, nullable)
```

#### Tabela: Postagens
```sql
- Id (int, PK, Identity)
- Titulo (varchar(200))
- Conteudo (text)
- UsuarioId (int, FK -> Usuarios.Id)
- DataCriacao (timestamp)
- DataAtualizacao (timestamp, nullable)
```

## 🚀 Como Executar o Projeto

### Pré-requisitos
- .NET 6 SDK
- Node.js 16+
- PostgreSQL
- Git



### Cobertura de Testes
- ✅ **Domain**: Testes de entidades e validações
- ✅ **Application**: Testes de commands e queries
- ✅ **Infrastructure**: Testes de repositórios
- ✅ **API**: Testes de controllers

## 📡 Endpoints da API

### Usuários
- `POST /api/Usuario` - Criar usuário
- `PUT /api/Usuario/{id}` - Atualizar usuário
- `GET /api/Usuario/{id}` - Buscar usuário por ID

### Autenticação
- `POST /api/Login` - Fazer login

### Postagens
- `GET /api/Postagem/postagens` - Listar todas as postagens
- `GET /api/Postagem/postagens/{id}` - Buscar postagem por ID
- `POST /api/Postagem` - Criar postagem (admin)
- `PUT /api/Postagem/{id}` - Atualizar postagem (admin)
- `DELETE /api/Postagem/{id}` - Deletar postagem (admin)

## 🔧 Tecnologias Utilizadas

### Backend
- **.NET 6**: Framework principal
- **Entity Framework Core**: ORM
- **PostgreSQL**: Banco de dados
- **MediatR**: Padrão Mediator/CQRS
- **Swagger**: Documentação da API
- **xUnit**: Framework de testes
- **Moq**: Biblioteca de mocking

### Frontend
- **React 18**: Biblioteca de UI
- **Axios**: Cliente HTTP
- **CSS3**: Estilização
- **React Hooks**: Gerenciamento de estado
