export const putRequire = async (req, res, next) => {
    const { ids, status } = req.body;    
      if (!Array.isArray(ids) || !status) {
        return res.status(400).json({ error: "Invalid request body" });
      }
      else{
        next()
      }
}  