import {getAllPosts, criarPost, atualizaPost} from "../models/postModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js";
import fs from "fs";

export async function listPosts(req, res) 
{
    // Chama a função para obter todos os posts
    const posts = await getAllPosts();
    // Envia os posts como resposta em formato JSON com status 200 (sucesso)
    res.status(200).json(posts); 
}

export async function postarNovoPost(req, res) 
{
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);  
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}

export async function atualizarNovoPost(req, res) 
{
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`

    

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricaoGemini = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            descricao: descricaoGemini,
            imgUrl: urlImagem,
            alt: req.body.alt
        };

        const postCriado = await atualizaPost(id, post);
        res.status(200).json(postCriado);  
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}

export async function uploadImg(req, res) 
{
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)
        res.status(200).json(postCriado);  
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}