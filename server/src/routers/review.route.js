import express from "express";
import {body} from "express-validator"
import reviewController from "../controllers/review.controller.js"
import tokenMiddlewares from "../middlewares/token.middlewares.js";
import requestHandler from "../handlers/request.handler.js";

const router = express.Router({mergeParams:true});

router.get(
    "/",
    tokenMiddlewares.auth,
    reviewController.getReviewsOfUser
)

router.post(
    "/",
    tokenMiddlewares.auth,
    body("mediaId")
    .exists().withMessage("mediaId is required")
    .isLength({min:1}).withMessage("mediaId can not be empty"),
    body("content")
    .exists().withMessage("content is required")
    .isLength({min:1}).withMessage("content can not be empty"),
    body("mediaType")
    .exists().withMessage("mediatype is required")
    .custom(type => ["movie" , "tv"].includes(type)).withMessage("mediatype invalid"),
    body("mediaTitle")
    .exists().withMessage("mediaTitle is required"),
    
    body("mediaPoster")
    .exists().withMessage("mediaPoster is required"),
    requestHandler.validate,
    reviewController.create
)

router.delete(
    "/:reviewId",
    tokenMiddlewares.auth,
    reviewController.remove
)

export default router;