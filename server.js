const express = require('express')
const api = express()
const { MongoClient } = require ('mongodb')
const dotenv = require ('dotenv')
dotenv.config()
const url = process.env.DATABASE_URL
const objectId = require('mongodb').ObjectId
const client = new MongoClient(url)
let collection

api.set('view engine', 'ejs')
api.use(express.urlencoded({extended:true}))
//renderizar
api.get('index',(req, res)=>{
    res.render('index.ejs')
})

// adicionar os dados no banco de dados (cadastrar)
api.post('/show', async (req, res)=>{
    await collection.insertOne({
        nomeCompleto: req.body.nomeCompleto,
        endereco: req.body.endereço,
        cpf: req.body.cpf,
        telefone: req.body.telefone,
        email: req.body.email
    })
    res.redirect('/show')
})

api.get ('/show', async (req, res)=>{
    const crud = await collection.find().toArray()
    //visualizar o show.ejs a o nome crud
    res.render('show.ejs', {crud})
})
// rota para editar
api.post('/edit/:id', async (req, res) =>{
    await collection.udateOne(
        {_id:new ObjectId(req.params.id)},
        {
            $set:{
                nomeCompleto: req.body.nomeCompleto,
                endereco: req.body.endereço,
                cpf: req.body.cpf,
                telefone: req.body.telefone,
                email: req.body.email
            }
        }
    )
    res.redirect('/show')
})




