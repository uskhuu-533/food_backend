import { User } from "../../models/users.model.js";



export const deleteUsers = async (req, res) => {
    try{
    const { email } = req.body;
    const user = await User.findOne({email})
    console.log(user);
    
    if(user){
    const id = user._id
    const result = await User.findByIdAndDelete(id)
    res.send("Deleted");
    }else{
        res.status(400).send("user not found")
    }
    }catch(err){
        res.status(500).send(`Iternal server error`)
        console.log(err);
        
    }
}