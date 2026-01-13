# =====================================================
# DOCKERFILE PARA API .NET 6 - TOPCON
# =====================================================

# Usar imagem base do .NET 6 SDK para build
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

# Copiar arquivos de projeto e restaurar dependências
COPY ["TopConApp.Api/TopConApp.Api.csproj", "TopConApp.Api/"]
COPY ["TopConApp.Application/TopConApp.Application.csproj", "TopConApp.Application/"]
COPY ["TopConApp.Domain/TopConApp.Domain.csproj", "TopConApp.Domain/"]
COPY ["TopConApp.Infrastructure/TopConApp.Infrastructure.csproj", "TopConApp.Infrastructure/"]

# Restaurar dependências
RUN dotnet restore "TopConApp.Api/TopConApp.Api.csproj"

# Copiar todo o código fonte
COPY . .

# Build da aplicação
WORKDIR "/src/TopConApp.Api"
RUN dotnet build "TopConApp.Api.csproj" -c Release -o /app/build

# Publicar aplicação
FROM build AS publish
RUN dotnet publish "TopConApp.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Imagem final para runtime
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app

# Instalar curl para health check
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copiar aplicação publicada
COPY --from=publish /app/publish .

# Criar diretório para logs
RUN mkdir -p /app/logs

# Configurar usuário não-root para segurança
RUN addgroup --system --gid 1001 dotnet
RUN adduser --system --uid 1001 --ingroup dotnet dotnet
RUN chown -R dotnet:dotnet /app
USER dotnet

# Expor porta
EXPOSE 80

# Variáveis de ambiente
ENV ASPNETCORE_URLS=http://+:80
ENV ASPNETCORE_ENVIRONMENT=Production

# Comando de entrada
ENTRYPOINT ["dotnet", "TopConApp.Api.dll"]