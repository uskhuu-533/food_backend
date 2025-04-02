import jsonwebtoken from "jsonwebtoken";
import 'dotenv/config'
export const adminAuhh = (req, res, next) => {
  const token = req.headers.authorization 
  if (!token) return res.status(401).send({ error: "Access denied" }); 
  try {    
    const decoded = jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET_KEY);
    req.userId = decoded.UserId;
    if (decoded.role === "ADMIN") {
        next()
    }else{
        return res.status(401).send({ error: "Access denied" }); 
    }
  } catch (error) {
    res.status(401).send({ error: "Invalid token" }); 
  }
};