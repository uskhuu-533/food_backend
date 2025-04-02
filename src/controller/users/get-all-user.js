import { User } from "../../models/users.model.js"

export const getAllUser = async (req, res) =>{
    try {
        const { page } = req.params
        const pageInt = parseInt(page)
        const users = await User.find().populate({path:"orderedFood", model:"foodorder", select:"createdAt totalPrice"})
        console.log(users);
        
        const totalResults = users.length
        const totalPage = Math.floor(users.length/20)+1
        const slicedUsers = users.slice((pageInt-1)*20, pageInt*20)
        return res.status(200).json({users : slicedUsers,totalResults:totalResults, totalPages:totalPage })
    } catch (error) {
        console.log(error);
        
        return res.status(500).send({error:error})
    }
}