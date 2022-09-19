import { Router } from 'express';

const routes = Router();
const cartItems = [
    { id: 0, product: "shirt", price: 15, quantity: 2},
    { id: 1, product: "pants", price: 30, quantity: 3},
];
let currentId = 2;


routes.get('/carts', (req, res) => {

    const maxPrice = Number.parseInt(req.query['maxPrice'] as string);
    const prefix = req.query['prefix'];
    const pageSize = req.query['pageSize'];

    let items = cartItems;

    if (maxPrice) {
        items = items.filter((item) => {
            return item.price < 20;
        });
    }

    if (prefix) {
        items = items.filter((item) => {
            const firstLetter = item.product.charAt(0);
        })
    }

    res.status(200);
    res.json(cartItems);
});

routes.delete('/cart/:id', (req, res) => {
    let id = Number.parseInt(req.params.id);

    const index = cartItems.findIndex(cartItems => {
        return cartItems.id === id;
    });

    if (index >= 0) {
        cartItems.splice(index, 1);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

export default routes;
