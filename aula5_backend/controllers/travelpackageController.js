
const TravelPackage = require('../models/TravelPackage')

const gettravelpackage = async (req,res)=>{
    try {
        const travelPackages = await TravelPackage.findAll()
        res.json(travelPackages);
      } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
      }
}

const addtravelpackage = async (req,res)=>{
  
}



module.exports={gettravelpackage, addtravelpackage}