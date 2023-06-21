const Enrollments = require('../models/Enrollment')
const TravelPackage = require('../models/TravelPackage')

const getEnrollments = async (req,res)=>{
    try {
        const enrollements = await Enrollments.findAll()
        res.json(enrollements)
      } catch (error) {
        console.error(error)
        res.status(500).send('Server Error')
      }
}

const addEnrollment = async (req,res)=>{
  try {
    const { userId, travelPackageId } = req.body


    const enrollment = await Enrollments.create({
      userId,
      travelPackageId
    })

    const travelPackage = await TravelPackage.findByPk(travelPackageId)

    if (!travelPackage) {
      return res.status(404).json({ message: 'TravelPackage not found' })
    }

    if (travelPackage.remainingVacancies === 0) {
      return res.status(400).json({ message: 'No remaining vacancy' })
    }

    travelPackage.decrement('remainingVacancies')
    await travelPackage.save()

    res.json(enrollment)
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  }  
}

module.exports={getEnrollments, addEnrollment}