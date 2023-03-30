const db = require('../database/db');
const express = require('express');
const router = express.Router();

async function InsertUser(user) {
    console.log(user);
    console.log("CAIU AQUI NO SIGNUP");
        
        const sql = 'INSERT INTO TBLUser (user, password, email) VALUES (?, ?, ?)';

         if(!user.username || !user.password || !user.email)
             return alert("Preencha todos os campos!")

        const connection = await db.Connect();
        await new Promise((resolve, reject) => {
            connection.query(sql, [user.username, user.password, user.email], (err, result) => {
                if (err) 
                    return reject(err);
                resolve(result);
            });
        });
        connection.end();
        console.log("Usuário inserido com sucesso!");
}
InsertUser();

module.exports = {
    InsertUser
}