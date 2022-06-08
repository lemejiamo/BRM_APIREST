const router = require('express').Router();
const conecction = require('../../models/db');
const generateId = () => Math.random().toString(36).substr(2, 17);

router.get('/productCreate', (req, res)=>{
    res.render('product');
});

router.post('/productCreate', (req, res)=>{
    const {name, price, quantity, date_in, lot_num, cost, } = req.body;
    const error = [];
    if(!name || !price || !quantity || !date_in || !lot_num || !cost){
        error.push({text: "Please fill all fields"})
    }
    if(error.length> 0){
        res.render('product', {error})
    }else{
        const query = ` INSERT INTO
                        Inventory(product_id, product_name, price, quantity, date_in, lot_number, cost)
                        VALUES (?,?,?,?,?,?,?)`;
        const id = generateId();
        conecction.query(query, [id, name, price, quantity, date_in, lot_num, cost], (error, rows, fields) =>{
            if(!error){
                res.json({Status: "Sucess product added to inventory"});
            }else{
                console.log(error);
                res.json({Status: "Error product can't be created"});
            }
        });
    }
});

router.get('/productSearch', (req, res)=>{
    res.render('productSearch');
});

router.post('/productSearch', (req, res)=>{
    const { name } = req.body;
    const error = [{text: "por favor ingrese el nombre del producto"}];
    if (!name){
        res.render('productSearch', { error } );
    }else{
        const query = 'select * from Inventory where product_name=?';
        conecction.query(query, [name], (error, rows, fields) =>{
            if(error){
                console.log(error);
                res.send('fail');
            }
            if(!rows[0]){
                res.json({Status: "Error product dosen't exist"});
            }
            else{
                res.json(rows[0]);
            }
        });
    }
});


router.get('/productSearchAll', (req, res)=>{
        const query = 'select * from Inventory';
        conecction.query(query, (error, rows, fields) =>{
            if(error){
                console.log(error);
                res.send('fail');
            }
            if(!rows[0]){
                res.json({Status: "Error product dosen't exist"});
            }
            else{
                res.json(rows);
            }
        });
    });

router.get('/productToUpdate', (req, res)=>{
    res.render('updateSearch');
});


router.get('/productUpdate', (req, res)=>{
    const { name } = req.query;
    const query = 'select * from Inventory where product_name=?';
        conecction.query(query, [name], (error, rows, fields) =>{
            if(error){
                console.log(error);
                res.send('fail');
            }
            if(!rows[0]){
                res.json({Status: "Error product dosen't exist"});
            }
            else{
                res.render('update', {name});
            }
        });
});

router.post('/productUpdate', (req, res)=>{
    const { price, quantity, date_in, lot_num, cost } = req.body;
    const name = req.headers.referer.split('=')[1];
    const error = [];
    if(!price || !quantity || !date_in || !lot_num || !cost){
        error.push({text: "Please fill all fields"})
    }
    if(error.length> 0){
        console.log(error);
        console.log(name);
        res.render('update', { error, name })
    }else{
        const query = `UPDATE Inventory
                       SET price=?, quantity=?, date_in=?, lot_number=?, cost=?
                       WHERE product_name=?`;
        conecction.query(query, [price, quantity, date_in, lot_num, cost, name], (error, rows, fields) =>{
            if(!error){
                res.json({Status: "Sucess product update"});
            }else{
                console.log(error);
                res.json({Status: "Error product can't be updated"});
            }
        });
    }
});

router.get('/productDelete', (req, res)=>{
    res.render('productDelete');
});

router.post('/productDelete', (req, res)=>{
    const { name } = req.body;
    const error = [{text: "por favor ingrese el nombre del producto"}];
    if (!name){
        res.render('productDelete', { error } );
    }else{
        const query = 'select * from Inventory where product_name=?';

        conecction.query(query, [name], (error, rows, fields) =>{
            if(error){
                console.log(error);
                res.send('fail');
            }

            if(!rows[0]){
                res.json({Status: "Error product dosen't exist"});
            }else{
                const query = 'DELETE FROM Inventory where product_name=?';
                conecction.query(query, [name], (error, rows, fields) =>{
                    if(error){
                        console.log(error);
                        res.send('fail');
                    }else{
                        res.json({Status: "Produtc deleted" });
                    }
                });
            }
        });
    }
});


module.exports = router;