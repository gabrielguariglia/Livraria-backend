import sql from 'mssql'
import { sqlConfig } from './sql/config.js'

sql.on('error', err =>{
    console.error(err)
})

sql.connect(sqlConfig).then(pool => {
    //Vamos executar a Stored Procedure
    return pool.request()
    .input('nome', sql.VarChar(50), 'Harry Potter')
    .input('genero', sql.VarChar(50), 'aventura')
    .input('autor', sql.VarChar(50), 'Jk Rowling')
    .input('preco', sql.Numeric, -15)
    .output('codigogerado', sql.Int)
    .execute ('SP_I_LIV_INCLUIDO')
}).then(result => {
    console.log(result)
}).catch(err =>{
    console.log(err.mesage)
})