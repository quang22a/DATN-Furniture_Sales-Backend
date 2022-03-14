import mongo from "mongoose";

import { Rating } from "../models";
import { pagination } from "../utils";

export default class RatingService {
  async create(data) {
    return await Rating.create(data);
  }
  async getRating(_id) {
    return await Rating.findOne(
      { _id },
      {
        __v: 0,
      }
    );
  }

  async update(_id, data) {
    if (!(await this.getRating(_id))) return false;
    await Rating.findOneAndUpdate({ _id }, data);
    return true;
  }

  async getRatings(page, take) {
    return await pagination(Rating, {}, page, take);
  }

  async getRatingsOfProduct(productId) {
    return await Rating.aggregate([
      {
        $match: {
          productId: mongo.Types.ObjectId(productId),
        },
      },
      {
        $lookup: {
          from: "customer",
          localField: "customerId",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $project: {
          __v: 0,
        },
      },
    ]);
  }

  async deleteRating(_id) {
    const rating = await this.getRating(_id);
    if (!rating) return false;
    await Promise.all([Rating.findByIdAndDelete({ _id })]);
    return true;
  }
}
