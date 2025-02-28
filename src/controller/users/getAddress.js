import { User } from "../../models/users.model.js"

export const getUserAddress = async (req, res) => {
    try {
        const user = await User.findById({_id : req.userId})
        res.status(200).send(user.address)
    } catch (error) {
        res.status(500).send("getUserAddress")
    }
}