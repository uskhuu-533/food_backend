import { User } from "../../../models/users.model.js"

export const authentication = async (req, res, next) => {
    try {
        const {email, password} = req.body
        
        if (!email && !password) {
            return res.status(400).send("email and password invalid")
        }
        
        if (!password) {
            return res.status(400).send("password invalid")
        }
        
        if (!email) {
            return res.status(400).send("email invalid")
        }
        
        const users = await User.findOne({email})
        if (users) {
            return res.status(400).send("email used")
        }
        
        next()
    } catch (error) {
        return res.status(500).send(`failed : ${error}`)
    }
}