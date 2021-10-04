import express from 'express'
const app = express()
const port = 4000

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.disable('x-powered-by')

import rotasLivraria from './routes/livros.js'

//Rota restfull 
app.use('/api/livros', rotasLivraria)

//Rota default
app.get('/api', (req,res) => {
    res.status(200).json({
        mensagem: 'Api funcionando',
        versao:' 1.0.3'
    })
})

//Rota de conteúdo público
app.use('/', express.static('public'))

//Rota de erro 404
app.use(function(req, res){
    res.status(404).json({
        mensagem: `A rota ${req.originalUrl} não existe`
    })
})

app.listen(port, function(){
    console.log(`servidor rodando na rota ${port}`)
})