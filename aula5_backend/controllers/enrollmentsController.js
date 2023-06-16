const Enrollments = require('../models/Enrollment')

const getEnrollments = async (req,res)=>{
    try {
        const enrollements = await Enrollments.findAll()
        res.json(enrollements);
      } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
      }
}

module.exports={getEnrollments}