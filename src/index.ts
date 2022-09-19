import cors from 'cors';
import express from 'express';
import routes from './routes/cart-items';

const app = express();
const PORT = 3001;

app.use(cors());

app.use(express.json());

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});