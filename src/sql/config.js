import dotenv from 'dotenv/config'

export const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NOME,
    server: process.env.DB_SERVER,
    pool:{
        max: 10,
        min:0,
        idleTimeoutMillis: 3000
    },
    options:{
        encrypt: false,//Apenas para o Azure
        trustServerCertificate: true //Apenas true quando o servidor é local
    }
}