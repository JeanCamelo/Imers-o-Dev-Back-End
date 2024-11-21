import getAllPosts from "../models/postModel.js";

export async function listPosts(req, res) 
{
    // Chama a função para obter todos os posts
    const posts = await getAllPosts();
    // Envia os posts como resposta em formato JSON com status 200 (sucesso)
    res.status(200).json(posts); 
}