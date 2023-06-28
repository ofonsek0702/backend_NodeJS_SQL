
const TravelPackage = require('../models/TravelPackage')

const gettravelpackage = async (req,res)=>{
    try {
        const travelPackages = await TravelPackage.findAll()
        res.json(travelPackages);
      } catch (error) {
        console.error(error)
        res.status(500).send('Server Error')
      }
}

const addtravelpackage = async (req,res)=>{
  try {
    const { description, date, price, maxParticipants, remainingVacancies  } = req.body
    const travelpackage = await TravelPackage.create({
      description,
      date,
      price,
      maxParticipants,
      remainingVacancies
    })
    res.json(travelpackage)
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  }  
}


module.exports={gettravelpackage, addtravelpackage}