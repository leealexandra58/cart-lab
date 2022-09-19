import { Router } from 'express';

const routes = Router();
const cartItems = [
    { id: 0, product: "shirt", price: 15, quantity: 2},
    { id: 1, product: "pants", price: 30, quantity: 3},
];
let currentId = 2;


routes.get('/cart-items', (req, res) => {

    const maxPrice = Number.parseInt(req.query['maxPrice'] as string);
    //const prefix = req.query['prefix'];
    //const pageSize = Number.parseInt(req.query['pageSize'] as string);

    let items = cartItems;

    if (maxPrice) {
        items = items.filter((item) => {
            return item.price < 20;
        });
    }

    /*if (prefix) {
        items = items.filter((item) => {
            return item.product.charAt(0);
        })
    }

    if (pageSize) {
        })
    }*/

    res.status(200);
    res.json(items);
});

routes.post('/cart-items', (req, res) => {
        let newItem = req.body;

        newItem.id = currentId;
        currentId++

        cartItems.push(newItem);

    res.status(201);
    res.json(newItem);
});

routes.put('/cart-items/:id', (req, res) => {
    
    let newItem = req.body;
    let id = Number.parseInt(req.params.id);

    let index = cartItems.findIndex((item) => {
        return item.id === id;
    });

    if (index >=0) {
        newItem.id = id;

        newItem.splice(index, 1, newItem);

        res.status(200);
        res.json(newItem)
    } else {
        res.status(404).send();
    }
})

routes.delete('/cart-items/:id', (req, res) => {
    let id = Number.parseInt(req.params.id);

    const index = cartItems.findIndex((cartItem) => {
        return cartItem.id === id;
    });

    if (index >= 0) {
        cartItems.splice(index, 1);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

export default routes;
