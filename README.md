# paraswap-arbitrage

Este projeto é um bot de arbitragem para o ParaSwap, construído com Node.js e React.

## Descrição

Este aplicativo realiza arbitragem no ParaSwap, aproveitando as diferenças de preço entre diferentes exchanges para obter lucro. Ele consiste em um backend Node.js (`server.js`) e um frontend React (`src/`).

## Configuração

1.  Clone o repositório:

    ```bash
    git clone git@github.com:oguidomingos/paraswap-arbitrage.git
    ```
2.  Instale as dependências:

    ```bash
    npm install
    ```

## Execução

1.  Inicie o servidor backend:

    ```bash
    node server.js
    ```
2.  Inicie o frontend React (em outro terminal):

    ```bash
    npm run dev
    ```

    O frontend estará disponível em `http://localhost:5173`.

## Arquivos Principais

*   `server.js`: Servidor Node.js que lida com a lógica de arbitragem.
*   `src/`: Código fonte do frontend React.
*   `src/App.tsx`: Componente principal do aplicativo React.
*   `vite.config.ts`: Configuração do Vite para o frontend.
*   `package.json`: Arquivo de manifesto do projeto, contendo as dependências e scripts.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.
