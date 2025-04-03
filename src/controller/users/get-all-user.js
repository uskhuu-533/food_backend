import { User } from "../../models/users.model.js";

export const getAllUser = async (req, res) => {
  try {
    const { page, searchNumber } = req.params;
    const { searchEmail } = req.query;
    const pageInt = parseInt(page);
    const limit = 20;
    const skip = (pageInt - 1) * limit;
    let query = {};
    if (searchEmail !== undefined || searchNumber !== undefined) {
      if (searchEmail !== "") {
        query = {
          $or: [{ email: { $regex: searchEmail, $options: "i" } }],
        };
      }
    }
    const users = await User.find(query).skip(skip).limit(limit).populate({
      path: "orderedFood",
      model: "foodorder",
      select: "createdAt totalPrice",
    });
    const totalResults = await User.countDocuments(query);
    const totalPage = Math.ceil(totalResults / limit);

    return res.status(200).json({
      users: users,
      totalResults: totalResults,
      totalPages: totalPage,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({ error: error });
  }
};
