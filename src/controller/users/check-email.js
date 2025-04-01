import { User } from "../../models/users.model.js"

export const checkEmail =  async (req, res) => {
    try {
        const {email} = req.body
        const user = await User.findOne({email : email})
        if (user) {
            res.status(400).send('email used')
        }else {
            res.status(200).send("succes")
        }
    } catch (error) {
        res.status(500).send(error)
    }
}