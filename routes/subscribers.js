const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')


router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


router.post('/', async (req, res)=>{

    try{
        
        const subscriber = new Subscriber({
            userName: req.body.userName,
            userChannel: req.body.userChannel
        })

        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

router.get('/:id', getSubscriber, (req, res)=>{
    res.json(res.subscriber)
})
        
router.patch('/:id', getSubscriber, (req, res)=> {
    res.json(res.subscriber)
})

router.delete('/:id', getSubscriber, async (req, res)=> {
    try{
        const subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null){
            return res.status(400).json({message: subscriber not found!})
        }
    } catch(error) {
        res.status(400).json({message: error.message})
    }

})

//Middleware valida id
async function getSubscriber(req, res, next) {
    try{
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null){
            return res.status(404).json({message: 'Subscriber not found!'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

    res.subscriber = subscriber
    next()
}

module.exports = router