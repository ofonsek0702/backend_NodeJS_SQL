const express = require('express')

const conn = require('./database/conn')


const Roledev = require('./models/Roledev')
const Userdev = require('./models/Userdev') 


const app = express()

app.use(
    express.urlencoded({
        extended:true
    })
)
app.use(express.json())


Userdev.belongsTo(Roledev, { foreignKey: 'role_id' })


conn.sync({ force: false }) 
  .then(() => {
    console.log('sync OK')
    app.listen(3333,()=>{
      console.log('Server starting')
     })
  })
  .catch((error) => {
    console.error('Error sync:', error);
  })



