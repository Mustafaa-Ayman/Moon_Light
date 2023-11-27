import responseHandler from "../handlers/response.handler.js";
import favoriteModel from "../models/favorite.model.js";

const addFavorite = async(req,res) => {
    try {
          const isFavorite = await favoriteModel.findOne({
            user: req.user.id,
            mediaId: req.body.mediaId
        })

        if(isFavorite) return responseHandler.ok(res,isFavorite)

        const favorite = new favoriteModel({
            ...req.body,
            user : req.user.id
        })

        await favorite.save()

        responseHandler.created(res, favorite)
    } catch {
        responseHandler.error(res)
        
    }
}

const removeFavorite = async (req, res) => {
    try {
        
        const {favoriteId} = req.params

        const favorite = await favoriteModel.findOne({
            user:req.user.id , 
            _id:favoriteId
        })
       
        if(!favorite) return responseHandler.notfound(res)

         // Ensure that 'favorite' is an instance of the 'Favorite' model
         if (!(favorite instanceof favoriteModel)) {
            console.error('The result of findOne is not an instance of Favorite model');
            return responseHandler.error(res, 'Error removing favorite');
        }

        await favorite.deleteOne();
        responseHandler.ok(res, 'Favorite removed successfully');
    } catch (error) {
        console.error(error);
        responseHandler.error(res, 'Error removing favorite');
    }
}

const getFavoritesOfUser = async (req, res) => {
    try {
        const favorite = await favoriteModel.find({user:req.user.id}).sort("-createdAt")

        responseHandler.ok(res,favorite)


    } catch  {
        responseHandler.error(res)
    }
}

export default {addFavorite , removeFavorite , getFavoritesOfUser};