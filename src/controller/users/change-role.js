import { User } from "../../models/users.model.js"

export const changeRole = async (req, res) => {
    try {
        const {role} = req.body
        const {userId} = req.params
        const user = await User.findByIdAndUpdate(
            userId,
            {role:role},
            {new:true}
        )
        res.status(200).send('succes')
    } catch (error) {
        res.status(500).send(error)
    }
}