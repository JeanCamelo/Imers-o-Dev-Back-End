import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbMongo.js"

// Estabelece a conexão com o banco de dados MongoDB usando a string de conexão obtida da variável de ambiente STRING_CONEXAO
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

//Função assíncrona para buscar todos os posts no banco de dados 
export async function getAllPosts() {
    // Seleciona o banco de dados 'imersao-alura' da conexão estabelecida  
    const db = conexao.db('imersao-alura'); 
    // Seleciona a coleção 'posts' dentro do banco de dados
    const colecao = db.collection('posts');
    // Retorna um array com todos os documentos da coleção 'posts' 
    return colecao.find().toArray(); 
}

export async function criarPost(novoPost) {
    const db = conexao.db('imersao-alura');
    const colecao = db.collection('posts');
    return colecao.insertOne(novoPost)
}

export async function atualizaPost(id, novoPost) {
    const objId = ObjectId.createFromHexString(id)

    const db = conexao.db('imersao-alura');
    const colecao = db.collection('posts');
    return colecao.updateOne({_id: new ObjectId(objId)},{$set:novoPost})
}