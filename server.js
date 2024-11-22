import express from 'express'; // Importa o framework Express.js para criar a aplicação web
import routes from './src/routes/postsRoutes.js';

// Cria uma instância da aplicação Express
const app = express();
app.use(express.static("uploads"));
routes(app);

app.listen(3000, () => {
  console.log("Servidor escutando..."); // Inicia o servidor na porta 3000 e exibe uma mensagem no console
});