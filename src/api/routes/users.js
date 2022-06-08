const router = require('express').Router();
const conecction = require('../../models/db');
const crypto = require('crypto');
const { error } = require('console');
const { json } = require('express/lib/response');

// register main view
router.get('/register', (req, res)=>{
    res.render('register');
});

// register response
router.post('/register', (req, res)=>{
    const { ID, user_name, user_mail, Celphone, passwd, Rpasswd } = req.body;
    const error = [];
    if(!user_name){
        error.push({text: "Name cannot be empty"});
    }if(!user_mail){
        error.push({text: "Email cannot be empty"});
    }if(!Celphone){
        error.push({text: "Celphone cannot be empty"});
    }if(!passwd){
        error.push({text: "password cannot be empty"});
    }if(passwd != Rpasswd){
        error.push({text: "password dosen't match"});
    }if(error.length > 0) {
        res.render('register', {error});
    }else{
        const hashP = crypto.createHash('sha512').update(passwd).digest('hex');
        const query = `
            INSERT INTO
            Users(user_id, user_name, email, celphone, passwd)
            VALUES(?, ?, ?, ?, ?)
            `;
            conecction.query(query, [ID, user_name, user_mail, Celphone, hashP], (error, rows, fields)=>{
            if(!error){
                res.json({Status: "Sucess Customer added"});
            }else{
                console.log(error);
                res.json({Status: "Error Customer can't be createdt"});
            }
        });
    }
});

// login main view
router.get('/login', (req, res)=>{
    res.render('login')
});

// login response  view
router.post('/login', (req, res)=>{
    const {id, passwd } = req.body;
    const error = [];
    console.log(req.body)
    //data validation
    if (id == ''){
        error.push({text: "ID cannot be empty"});
    }
    if(passwd == ''){
        error.push({text: "Password cannot be empty"})
    }
    // return if data validation fails
    if(error.length > 0){
        res.render('login', {error});
    }else{
    // data base query to validate the user
        const query = "SELECT passwd FROM Users WHERE user_id = ?";

        conecction.query(query, [id], (error, rows, fields)=>{
            console.log(rows[0])
            console.log(fields)

            if(error){
                console.log(error);
                res.json({Status: "User or Password invalid"});
            }
            if(!rows[0]){
                res.json({Status: "User or Password invalid"});
            }
            else{
                console.log(rows);
                // password validation
                const hashP = crypto.createHash('sha512').update(passwd).digest('hex');
                const dbpasswd = rows[0].passwd;
                if(hashP === dbpasswd){
                    res.send("tod0  bien hasta aca");
                }else{
                    console.log("no entro")
                }
            }
        });
    }
});

module.exports = router;