//api rest 
import express from 'express'
import sql from 'mssql'
import { sqlConfig } from '../sql/config.js'
const router = express.Router()

/**********************************
* Get - lista todos os livros
**********************************/

router.get("/",(req,res) =>{
    try{
        sql.connect(sqlConfig).then(pool =>{
            return pool.request()
            .execute('SP_S_LIV_PRODUTO')
        }).then(dados =>{
            res.status(200).json(dados.recordset)
        }).catch(err => {
            res.status(400).json(err)
        })
    }catch (err){
        console.error(err)
    }
})

/**********************************
* Get - lista todos os livros por genero
**********************************/
router.get("/:genero",(req,res) =>{
    const genero = req.params.genero
    try{
        sql.connect(sqlConfig).then(pool =>{
            return pool.request()
            .input('genero', sql.Char(500), genero)
            .execute('SP_S_LIV_PRODUTO_GENERO')
        }).then(dados =>{
            res.status(200).json(dados.recordset)
        }).catch(err => {
            res.status(400).json(err)
        })
    }catch (err){
        console.error(err)
    }
})

/**********************************
* POST - adicionar um novo livro
**********************************/
router.post("/",(req,res)=> {
    sql.connect(sqlConfig).then(pool =>{
        const {nome, sinopse, preco, autor, genero} = req.body
        return pool.request()
        .input('nome', sql.VarChar(50),nome)
        .input('sinopse', sql.VarChar(200),sinopse)
        .input('preco', sql.Numeric,preco)
        .input('autor', sql.VarChar(20),autor)
        .input('genero', sql.VarChar(20),genero)
        .output('codigogerado', sql.int)
        .execute('SP_I_LIV_INCLUIDO')
    }).then(dados => {
        res.status(200).json(dados.output)
    }).catch(err => {
        res.status(400).json(err.message)//bad request
    })
})

/**********************************
* Put - altera um livro
**********************************/
router.put("/",(req,res)=> {
    sql.connect(sqlConfig).then(pool => {
        const {nome, sinopse, preco, autor, genero} = req.body
        return pool.request()
        .input('nome', sql.VarChar(50),nome)
        .input('sinopse', sql.VarChar(200),sinopse)
        .input('preco', sql.Numeric,preco)
        .input('autor', sql.VarChar(50),autor)
        .input('genero', sql.VarChar(20),genero)
        .execute('SP_U_LIV_PRODUTO')
    }).then(dados => {
        res.status(200).json('Livro atualizado com sucesso!')
    }).catch(err => {
        res.status(400).json(err.message)//bad request
    })
})

/**********************************
* Delete - apaga um livro pelo nome
**********************************/
router.delete('/:nome', (req,res) =>{
    sql.connect(sqlConfig).then(pool =>{
        const nome = req.params.nome
        return pool.request()
        .input('nome', sql.VarChar(50),nome)
        .execute('SP_D_LIV_PRODUTO')
    }).then(dados => {
        res.status(200).json('Livro excluido com sucesso"')
    }).catch(err => {
        res.status(400).json(err.message)
    })
})

export default router