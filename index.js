import express from 'express';
import cors from 'cors';
import winston from 'winston';

// Import Routes
import clientsRouter from './routes/client.route.js';
import productsRouter from './routes/product.route.js';
import suppliersRouter from './routes/supplier.route.js';
import salesRouter from './routes/sale.route.js';

// Config winston
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: "store-api.log" })
    ],
    format: combine(
        label({ label: "store-api" }),
        timestamp(),
        myFormat
    )
});

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors());

// Use Routes
app.use('/client', clientsRouter);
app.use('/product', productsRouter);
app.use('/supplier', suppliersRouter);
app.use('/sale', salesRouter);

// Tratamento de erros
app.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ error: err.message });
}) 

app.listen(PORT, () => console.log("API Started!"));