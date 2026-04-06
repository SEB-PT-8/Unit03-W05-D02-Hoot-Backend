const router = require('express').Router()
const Hoot = require('../models/Hoot')
const verifyToken = require('../middleware/verify-token')

// To create a new hoot we HAVE to be signed in
router.post('/', verifyToken ,async (req,res)=>{
    console.log(req.user._id)
    res.json("CREATE ROUTE")
})


module.exports = router