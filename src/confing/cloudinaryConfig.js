import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";

dotenv.config();
cloudinary.config = {
 
        cloud_name: 'dqhu3nn3p', 
        api_key: '236836261763157', 
        api_secret: "1mYhVx65cBh8-vjpIGEZng5MNX4"
 
}
export default cloudinary