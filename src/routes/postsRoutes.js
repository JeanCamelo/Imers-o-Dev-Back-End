import express from "express"
import multer from "multer"
import { listPosts, postarNovoPost, uploadImg } from "../controllers/postsController.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {
    //Permite que o servidor interprete requisições em formato JSON
    app.use(express.json()); 

    //Rota para buscar todos os posts
    app.get("/posts", listPosts);  // Chama a função controladora para listar de posts

    // Rota para criar um novo post
    app.post("/posts", postarNovoPost); // Chama a função controladora para criação de posts

    // Rota para upload de imagens (assumindo uma única imagem chamada "imagem")
    app.post("/upload", upload.single("imagem"), uploadImg); // Chama a função controladora para processamento da imagem
}

export default routes;
