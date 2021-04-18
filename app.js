const express = require('express');
const mysql = require('mysql');

//create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'k',
    password: 'kpython',
    database: 'nodemysql'
});

//connect
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('Mysql connected......');
});

const app = express();

//createdb
// app.get('/createdb', (req, res)=>{
//     let sql = 'CREATE DATABASE nodemysql'
//     db.query(sql, (err, result)=>{
//         if(err) throw err;
//         res.send('database created...')
//         console.log(result)
//     });
// });

//create table
app.get('/createposttable', (req, res)=>{
    let sql = 'CREATE TABLE posts (id int AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), body VARCHAR(255))';
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Posts table created...');
    });
});

//add posts
app.get('/addpost', (req, res)=>{
    let post = {title: 'Post two', body: 'This is post two'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result)=>{
        if (err) throw err;
        console.log(result);
        res.send('Post 2 added...')
    })
});

//get a single post
app.get('/getpost/:id', (req, res)=>{
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send('Post fetched...');
    });
});

//update
app.get('/updatepost/:id', (req, res)=>{
    let newTitle = 'Updated Title';
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Post Updated...');
    });
});

//delete post
app.get('/deletepost/:id', (req, res)=>{
    let newTitle = 'Updated Title';
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Post deleted');
    })
});

app.listen('3000', ()=>{
    console.log('Server started on port 3000');
});
