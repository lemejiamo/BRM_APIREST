const router = require('express').Router();
const conecction = require('../../models/db');

router.get('/', (req, res)=>{
    res.render('index');
});

module.exports = router;