import express from "express"
import { listPosts } from "../controllers/postsController.js";

const routes = (app) => {
    //Permite que o servidor interprete requisições em formato JSON
    app.use(express.json()); 

    //Rota para buscar todos os posts
    app.get("/posts", listPosts);
}

export default routes;
