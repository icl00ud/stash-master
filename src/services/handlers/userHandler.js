const db = require('../database/db');
const express = require('express');
const router = express.Router();

async function InsertUser(user) {
    if(!user)
        return console.log("Preencha todos os campos!")

    const { username, password, email } = user;
    const sql = 'INSERT INTO TBLUser (user, password, email) VALUES (?, ?, ?)';
    const connection = await db.Connect();
    await new Promise((resolve, reject) => {
        connection.query(sql, [username, password, email], (err, result) => {
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