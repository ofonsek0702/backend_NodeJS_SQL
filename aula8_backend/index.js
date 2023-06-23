const express = require('express')
const conn = require('./database/conn')

const jwt = require('jsonwebtoken')

const app = express()

const travelpackageRoutes = require('./routes/travelpackageRoutes')
const enrollmentsRoutes = require('./routes/enrollmentsRoutes')
const usersRoutes = require('./routes/usersRoutes')
const authenticationRoutes = require('./routes/authRoutes')

app.use(
    express.urlencoded({
        extended:true
    })
)
app.use(express.json())


function VerifyJWT(req, res, next){
    const token = req.body.token || req.query.token

    if(!token){
        return res.status(403).json({auth:false, message: 'No token provided'})
    }

    jwt.verify(token, 'secret_key', (err, user)=>{
      if(err){
        return res.status(403),json({message: 'Invalid Token'})
      }
      req.user = user
      next()
    })
}


app.use('/travelpackage', VerifyJWT,travelpackageRoutes)
app.use('/enrollments', VerifyJWT,enrollmentsRoutes)
app.use('/users', VerifyJWT, usersRoutes)

app.use('/login', authenticationRoutes)
app.use('/logout', authenticationRoutes)

conn.sync({ force: false }) 
  .then(() => {
    console.log('sync OK')
    app.listen(3333,()=>{
      console.log('Server starting')
     })
  })
  .catch((error) => {
    console.error('Error sync:', error)
  })



