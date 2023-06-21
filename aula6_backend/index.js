const express = require('express')
const conn = require('./database/conn')

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

app.use('/travelpackage',travelpackageRoutes)
app.use('/enrollments',enrollmentsRoutes)
app.use('/users',usersRoutes)

app.use('/login', authenticationRoutes)

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



