const uuid = require('uuid')
const path = require('path');
const {Thing, ThingInof} = require('../models/models')
const ApiError = require('../error/ApiError');
const { Op } = require("sequelize");

class ThingController{
    async create(req, res, next){
        try{
            let {name, price, typeId, categoryId, description} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const thing = await Thing.create({name, price, categoryId, typeId, description, img: fileName})    
    
            return res.json(thing)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }   
    
    async getAll(req, res){
        let { categoryId, typeId, minPrice, maxPrice, limit, page } = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let things;
        let whereClause = {};
      
        if (categoryId) {
          whereClause.categoryId = categoryId;
        }
      
        if (typeId) {
          whereClause.typeId = typeId;
        }
      
        if (minPrice && maxPrice) {
          whereClause.price = {
            [Op.between]: [minPrice, maxPrice],
          };
        }
      
        things = await Thing.findAndCountAll({
          where: whereClause,
          limit,
          offset,
        });
      
        return res.json(things);
    }
    async getOne(req, res){
        const {id} = req.params
        const thing = await Thing.findOne(
            {
                where: {id},
                include: [{model: ThingInof, as: 'info'}] 
            },
        )
        return res.json(thing)
    }
}

module.exports = new ThingController()



// async getAll(req, res){
//     let {categoryId, typeId,limit, page} = req.query
//     page = page || 1
//     limit = limit || 9
//     let offset = page * limit - limit
//     let things; 
//     if(!categoryId && !typeId){
//         things = await Thing.findAndCountAll({limit, offset})
//     }
//     if(categoryId && !typeId){
//         things = await Thing.findAndCountAll({where: {categoryId}, limit, offset})
//     }
//     if(!categoryId && typeId){
//         things = await Thing.findAndCountAll({where: {typeId}, limit, offset})
//     }
//     if(categoryId && typeId){
//         things = await Thing.findAndCountAll({where: {categoryId, typeId}, limit, offset})
//     }
//     return res.json(things)
// }