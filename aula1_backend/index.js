const express = require('express')
const mariadb = require('mariadb')

const app = express()

const pool = mariadb.createPool({
    host: 'localhost',
    port: 3308,
    user: 'root',
    password: 'admin2',
    database: 'mdbtest',
    connectionLimit:100
})

app.get('/users',async(req,res)=>{
    let conn;
    try{
        conn = await pool.getConnection()
        const result = await conn.query('SELECT name,email FROM users')
        res.json(result)
    }
    catch(err)
    {
        console.error(err)
        res.status(500).send('Server Error')
    }
    finally
    {
        if(conn) conn.release()
    }

})

app.listen(3333,()=>{
    console.log('Server starting')
})