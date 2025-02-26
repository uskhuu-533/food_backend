import jsonwebtoken from "jsonwebtoken";
import 'dotenv/config'
export const authenticationJWT = (req, res, next) => {
  const token = req.headers.authorization 
console.log(token);

  if (!token) return res.status(401).send({ error: "Access denied" }); 
  try {    
    const decoded = jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET_KEY);
    req.userId = decoded.UserId;
   
    
    next();
  } catch (error) {
    res.status(401).send({ error: "Invalid token" });
  }
};
