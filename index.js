import express from 'express';
import dotenv from 'dotenv'
import sequelize from './db.js'
import {Type, TypeBrand, User, Brand, Rating, Device, DeviceInfo, BasketDevice, Basket} from './models/models.js'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import router from "./routes/index.js";
import {Error} from "./middleware/ErrorHandlingMiddleware.js";
import path from "path";

const PORT = process.env.PORT || 5000
dotenv.config()

const __dirname = path.resolve()
const server = express()
server.use(cors())
server.use(express.json())
server.use(express.static(path.resolve(__dirname, 'static')))
server.use(fileUpload({}))
server.use('/api', router)


//обработка ошибок, последний Middleware
server.use(Error)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        server.listen(PORT, (err) => {
            if (err) {
                return console.log('Произошла ошибка', err)
            }
            console.log(`Сервер запущен на порту ${PORT}`)
        })


    } catch (err) {
        console.log(err)
    }
}

start()



