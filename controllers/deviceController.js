import {Device, DeviceInfo} from "../models/models.js";
import {v4 as uuidv4} from "uuid"
import path from "path"
import ApiError from "../error/ApiError.js";



export const create = async (req, res, next) => {
    try {
        const __dirname = path.resolve();
        let {name, brandId, typeId, price, info} = req.body
        let {img} = req.files
        let fileName = uuidv4() + ".jpg"
        img.mv(path.resolve(__dirname, 'static', fileName))
        const device = await Device.create({name, brandId, typeId, price, img: fileName})

        if (info) {
            info = JSON.parse(info)
            info.forEach(i =>
                DeviceInfo.create({
                    title: i.title,
                    description: i.description,
                    deviceId: device.id,
                })
            )
        }

        return res.json(device)
    } catch (err) {
        next(ApiError.badRequest(err.message))
    }

}

export const getAll = async (req, res) => {

    let {brandId, typeId, limit, page} = req.query
    page = page || 1
    limit = limit || 9
    let offset = page * limit - limit

    let devices;
    if (!brandId && !typeId) {
        devices = await Device.findAndCountAll({limit, offset})
    }
    if (brandId && !typeId) {
        devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
    }
    if (!brandId && typeId) {
        devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
    }
    if (brandId && typeId) {
        devices = await Device.findAndCountAll({where: {brandId, typeId}, limit, offset})
    }

    return res.json(devices)
}

export const getOne = async (req, res) => {
    const {id} = req.params
    const inc = {include: [{model: DeviceInfo, as: 'info'}]}
    const device = await Device.findOne({where: {id}, inc})
    return res.json(device)
}

