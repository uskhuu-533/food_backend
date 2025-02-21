import { User } from "../../models/users.model";

export const editUser = async (req, res) => {
    try{
        const {email, password} = req.body
        const user = new User.findOne({email})
        if(user){
        }else{
            res.send("user not found")
        }
    }catch(err){
        console.log(err);
        
    }
}