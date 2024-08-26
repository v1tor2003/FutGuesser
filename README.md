# Jogo de Adivinhação de Times (Fut Guesser)

Este projeto é um jogo de adivinhação simples onde o usuário precisa adivinhar qual time é exibido com base em uma lista de opções. O jogo utiliza uma API externa (football-data.org) para buscar informações de times de futebol, e o usuário ganha ou perde dependendo de suas escolhas.

## Estrutura do Projeto

- `Game.ts`: Classe responsável por gerenciar a lógica do jogo, incluindo a busca de dados de times e a verificação de respostas.
- `Router.ts`: Classe responsável por gerenciar as rotas e navegação dentro da aplicação.
- `index.html`: Ponto de entrada da aplicação, onde o jogo é inicializado e renderizado.
- `styles.css`: Estilos básicos para a interface do jogo.

## Como Rodar o Projeto

### Pré-requisitos

- Node.js instalado na máquina.
- Gerenciador de pacotes npm ou yarn.
- Chave de API válida para acessar os dados dos times.

### Passos para Rodar

1. **Clonar o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/FutGuesser.git
   cd FutGuesser
   ```

2. **Instalar as dependências**:
   ```bash
   npm install
   ```
   ou, se estiver usando yarn:
   ```bash
   yarn install
   ```

3. **Configurar a chave da API**:
   - Crie um arquivo `.env` na raiz do projeto.
   - Adicione sua chave de API no arquivo:
     ```env
     VITE_API_KEY=sua-chave-api
     ```

4. **Rodar o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```
   ou, se estiver usando yarn:
   ```bash
   yarn dev
   ```

5. **Acessar a aplicação**:
   - Abra o navegador e acesse `http://localhost:5173` para jogar.

## Ideias para Melhorias Futuras

1. **Sanitização e Validação de Dados**: Implementar sanitização do conteúdo das páginas carregadas dinamicamente para evitar possíveis vulnerabilidades de segurança.

2. **Melhoria na Performance**: Utilizar `Promise.all` na busca dos times para reduzir o tempo de carregamento, reestruturando a lógica para lidar com múltiplas promessas de forma eficiente.

3. **Implementação de Testes**: Adicionar testes unitários para as classes `Game` e `Router`, garantindo que a lógica de jogo e roteamento funcione conforme o esperado em diferentes cenários.

4. **Interface Amigável**: Melhorar o design da interface com feedback visual mais claro para o usuário, como animações ao mostrar o resultado e uma melhor transição entre as páginas.

5. **Persistência de Dados**: Implementar a persistência de dados para que o progresso do jogo seja salvo no navegador, permitindo ao usuário continuar de onde parou em caso de recarregamento da página.

6. **Responsividade**: Garantir que a interface do jogo seja responsiva, adaptando-se bem a diferentes tamanhos de tela, especialmente em dispositivos móveis.

7. **Modo Multiplayer**: Expandir o jogo para permitir um modo multiplayer, onde usuários podem competir entre si em tempo real para adivinhar os times corretamente.

## Contribuições

Sinta-se à vontade para contribuir com este projeto! Sugestões, correções e melhorias são sempre bem-vindas. Abra uma issue ou envie um pull request para colaborar.

