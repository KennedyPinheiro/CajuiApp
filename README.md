# CajuiApp

# Documentação de Teste Prático

## Sumário

- [Descrição do Projeto](#descrição-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Funcionalidades Implementadas](#funcionalidades-implementadas)
  - [Tela de Login](#tela-de-login)
  - [Tela Home](#tela-home)
  - [Modal de Atividades e Notas](#modal-de-atividades-e-notas)
- [Análise de Requisitos](#análise-de-requisitos)
  - [Requisitos Funcionais](#requisitos-funcionais)
  - [Requisitos Técnicos](#requisitos-técnicos)
- [Decisões Técnicas](#decisões-técnicas)
  - [Backend (Laravel)](#backend-laravel)
  - [Frontend (React Native)](#frontend-react-native)
- [Como Rodar o Projeto](#como-rodar-o-projeto)

---

## Descrição do Projeto

Este projeto consiste em um sistema educacional simplificado, desenvolvido com foco em autenticação de usuários, visualização de disciplinas, controle de atividades e acompanhamento de notas.

A aplicação foi dividida entre backend, desenvolvido com Laravel, e frontend mobile, construído com React Native.

O sistema permite que usuários com diferentes níveis de acesso (definidos por meio do `role_id`) interajam de formas distintas com a aplicação. Alunos podem visualizar suas disciplinas, acessar atividades e consultar suas notas. O fluxo de autenticação está integrado entre backend e frontend, garantindo segurança e persistência de sessão com tokens via Sanctum e AsyncStorage.

O objetivo principal do projeto é demonstrar domínio prático sobre:

- Desenvolvimento de APIs RESTful com Laravel;
- Autenticação segura;
- Consumo eficiente de API no React Native;
- Estruturação de interfaces intuitivas e funcionais;
- Gerenciamento de estado e dados no aplicativo mobile.

Além disso, o projeto adota boas práticas de usabilidade e performance, com foco em uma navegação fluida, responsiva e amigável ao usuário final.

---

## Tecnologias Utilizadas

### Backend

- PHP 7.4+
- Laravel 8
- MySQL
- Sanctum (para autenticação)

### Frontend

- React Native
- Axios (para consumo da API)
- React Navigation
- AsyncStorage (para armazenar o token)

---

## Funcionalidades Implementadas

### Tela de Login

- Campo de e-mail
- Campo de senha
- Validação de formulário
- Feedback de erro ao usuário
- Integração com a API Laravel
- Armazenamento do token e dados do usuário com AsyncStorage
- Redirecionamento para a tela inicial após login

### Tela Home

- Exibição do nome e matrícula do usuário no topo (componente ImagemPerfil)
- Listagem das disciplinas disponíveis, vindas da API
- Integração com a API Laravel para carregamento de:
  - Disciplinas
  - Atividades
  - Notas
- Armazenamento e uso dos dados do usuário (nome, ID, matrícula, `role_id`) a partir do AsyncStorage
- Filtragem de atividades por disciplina selecionada
- Filtragem de notas apenas das atividades visíveis
- Exibição de mensagem caso não haja disciplinas

### Modal de Atividades e Notas

- Exibido ao selecionar uma disciplina (usuário com perfil de aluno)
- Lista todas as atividades da disciplina selecionada
- Ao tocar em uma atividade, exibe a nota individual do aluno relacionada àquela atividade
- Integração com a API Laravel para buscar:
  - Lista de atividades
  - Notas por atividade
  - Nota final (soma de pontos obtidos e total máximo possível)

#### Informações exibidas no rodapé do modal:
- **Max Pontos**: soma de `max_pontos` de todas as atividades
- **Total Nota**: soma das notas do aluno
- **Média Final**: nota final calculada pela API

**Recursos adicionais:**

- Animação suave na abertura do modal (fade)
- Estilo limpo e acessível para leitura rápida
- Fechamento do modal ao tocar fora da área principal

---

## Análise de Requisitos

### Requisitos Funcionais

| Requisito                                                    | Implementado | Observações                                                      |
|--------------------------------------------------------------|--------------|------------------------------------------------------------------|
| Tela de login para autenticação do aluno                     | ✅ Sim       | Com validação de campos, feedback de erro e redirecionamento    |
| Seleção da disciplina                                        | ✅ Sim       | Feita na tela principal após login                              |
| Exibição de nome da disciplina e semestre                    | ✅ Sim       | Mostrado no modal ao selecionar uma disciplina                  |
| Exibição de três notas atribuídas por disciplina             | ✅ Sim       | Mostrado por atividade individual no modal                      |
| Exibição da média final calculada pelo backend               | ✅ Sim       | Exibida no rodapé do modal com base nos dados da API            |

### Requisitos Técnicos

| Requisito                                | Implementado | Observações                                             |
|------------------------------------------|--------------|---------------------------------------------------------|
| Backend com Laravel (PHP 8+)             | ✅ Sim       | Utilizado Laravel 8 e PHP 7.4+                          |
| API RESTful com autenticação             | ✅ Sim       | Utilizado Sanctum e rotas protegidas                   |
| Frontend em React Native                 | ✅ Sim       | Interface mobile com navegação fluida                  |
| Layout limpo e usável                    | ✅ Sim       | Interface enxuta com foco em usabilidade               |
| Comunicação via API RESTful              | ✅ Sim       | Axios usado no frontend para chamadas à API            |

---

## Decisões Técnicas

### Backend (Laravel)

- Laravel 8 foi escolhido por sua robustez e familiaridade no ambiente educacional.
- Sanctum foi utilizado para autenticação por ser simples de configurar e compatível com SPAs e aplicações mobile.
- As rotas protegidas utilizam middleware `auth:sanctum` para garantir segurança nas requisições.
- A média final é calculada no backend para garantir a integridade dos dados e evitar manipulações no cliente.

### Frontend (React Native)

- Utilizado React Native para desenvolvimento multiplataforma mobile.
- A biblioteca Axios foi escolhida para facilitar o consumo da API RESTful.
- O token de autenticação é armazenado de forma segura com AsyncStorage.
- Navegação entre telas feita com React Navigation.
- Componentes modulares reutilizáveis foram usados para manter o código limpo e escalável.
- As informações do usuário (nome, matrícula, `role_id`) são persistidas localmente para exibição e uso na interface.

---

## Como Rodar o Projeto

### 🖥️ Backend (Laravel)

1. Clone o repositório:
   ```bash
   git clone https://github.com/KennedyPinheiro/CajuiApp.git
   cd CajuiApp/backend

2. Instale as dependências:
   ```bash
   composer install

3. Copie o .env e configure:
   ```bash
   cp .env.example .env

4. Altere as variáveis de ambiente, especialmente:
   ```bash
   DB_DATABASE=cajui
   DB_USERNAME=root
   DB_PASSWORD=

5. Gere a chave da aplicação:
   ```bash
   php artisan key:generate

6. Rode as migrations e seeders:
   ```bash
    php artisan migrate --seed
   
7. Inicie o servidor Laravel:
   ```bash
    php artisan serve --host=0.0.0.0 --port=8000
   
A API ficará acessível em http://SEU-IP-LOCAL:8000

Para descobrir seu IP local (Windows):

    ```bash
     ipconfig
     
Para descobrir seu IP local (Linux/macOS):

    ```bash
    ip addr show
    
### Frontend (React Native com Expo)

1. Acesse a pasta do frontend:

    ```bash
    cd ../frontend

2. Instale as dependências:

    ```bash
    npm install

3.Altere a URL da API (api_base_url):

  Localize o arquivo onde a API_BASE_URL é definida (ex: services/api.ts).

  Substitua:

    ```bash
    const API_BASE_URL = "http://192.168.X.X:8000/api";

 4. Inicie o app com Expo:

    ```bash
    npx expo start

5. Escaneie o QR code com o app Expo Go no seu smartphone (ambos os dispositivos precisam estar na mesma rede Wi-Fi).
<p align="center">
  <img src="https://github.com/user-attachments/assets/19139ca8-cd42-4d1f-ba39-e96ab22967d4" width="30%" alt="Tela 1" />
  <img src="https://github.com/user-attachments/assets/ad924b64-3e54-472d-bdc5-20cb7e3dbea9" width="30%" alt="Tela 2" />
  <img src="https://github.com/user-attachments/assets/d948b92f-5c3e-40e6-a272-f252d144ec2b" width="30%" alt="Tela 3" />
</p>
    


