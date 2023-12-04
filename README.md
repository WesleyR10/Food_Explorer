Food Explorer

O Food Explorer é um desafio da trilha explorer do curso da Rockseat, que simula um ambiente de restaurante com funcionalidades completas de CRUD (Create, Read, Update, Delete), busca por nome ou ingrediente e capacidade de marcar como favorito, responsivo para mobile e desktop entre outras características.

Funcionalidades CRUD: Capacidade de criar, ler, atualizar e excluir pratos do cardápio. Busca Avançada: Encontre pratos por nome ou ingrediente. Favoritos: Marque seus pratos favoritos para acesso rápido. Frontend & Backend: Ambas as partes estão desenvolvidas e integradas.

🚀 Começando Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

Clone o repositório: Backend. https://github.com/WesleyR10/Food_Explorer.git

Frontend. https://github.com/WesleyR10/Food_Explorer_-Front-end.git

🔧 Instalação 
**1°** Instale as dependecias do backend 
```
npm install
```

**2°** Altere o nome do arquivo .env.example para .env e configure a porta e a chave secreta. Exemplo:
```
AUTH_SECRET=asdf1234
SERVER_PORT=3000
```
**3°** Inicie o backend ```npm run dev```

**4°** Instale as dependecias do frontend ```npm install```

**5°** Na pasta services arquivo api.js alterar o baseURL, para mesma porta que configurou o seu backend 
Exemplo:
```
baseURL: "http://localhost:3000/",
```
**6°** Inicie o frontend ```npm run dev```

Obs: caso o banco de dados nao esteja criado executar no projeto backend ``` npm run migrate ```   

✒️ Autor
 Wesley Ribas Gonçalves

🎁 Expressões de gratidão Se este projeto foi útil para você de alguma forma, considere as seguintes maneiras de expressar sua gratidão:

Compartilhe este projeto com outras pessoas 📢
Convide um membro da equipe para uma cerveja virtual 🍺
Um agradecimento especial em seu próximo evento ou reunião 🫂
Apoie e reconheça publicamente contribuições valiosas 🌟
E, acima de tudo, obrigado por explorar e usar o Food Explorer! 🙏 
⌨️ com ❤️ por Wesley Ribas 😊
