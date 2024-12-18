import express from 'express';
import dotenv from 'dotenv';
import sequelize from './db.js';
import { User, Basket, BasketDevice, Device, Type, Brand, Rating, TypeBrand, DeviceInfo } from './models/models.js';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import router from './routes/index.js';
import ErrorHandlingMiddleware from './middleware/ErrorHandlingMiddleware.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());  
app.use(express.json());  
app.use(express.static(path.resolve(__dirname,'static')))
app.use(fileUpload()); 
app.use('/api', router);  

app.use(ErrorHandlingMiddleware);

async function startApp() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        app.listen(PORT, () => console.log(`The server is working on port ${PORT}`));
    } catch (error) {
        console.log(error.message);
    }
}

startApp();
