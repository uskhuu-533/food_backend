export const isValidOrderItem = (req, res, next) => {
    const {count} = req.body
    const {id} = req.params 
    if (!count) {
        res.send("quantity invalid").status(400)
    }else if (!id){
        res.send('food invalid').status(400)
    }
    next()
}