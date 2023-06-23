const express = require('express')
const conn = require('./database/conn')

const app = express()

const travelpackageRoutes = require('./routes/travelpackageRoutes')
const enrollmentsRoutes = require('./routes/enrollmentsRoutes')
const usersRoutes = require('./routes/usersRoutes')
const authenticationRoutes = require('./routes/authRoutes')

const session = require('./session')

app.use(
    express.urlencoded({
        extended:true
    })
)
app.use(express.json())

app.use(session)

const authenticateUser = (req, res, next) => {  
  if (req.session && req.session.user) {    
    next()
  } else {    
    res.status(401).json({ message: 'Unauthorized' })
  }
}

app.use('/travelpackage',travelpackageRoutes)
app.use('/enrollments',enrollmentsRoutes)
app.use('/users', authenticateUser, usersRoutes)

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



