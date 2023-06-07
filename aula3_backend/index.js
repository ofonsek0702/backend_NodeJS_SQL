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

/*
app.get('/roles', async (req,res)=>{
  try{
    const roles = await Roledev.findAll()
    res.json(roles)
  }
  catch(error)
  {
    console.error(error)
    res.status(500).send('Server Error')
  }

})
*/

app.get('/roles', async (req,res)=>{
  try{

    const {name} = req.query
    if(!name)
    {
      const roles = await Roledev.findAll()
      return res.json(roles)
    }
    const roles = await Roledev.findAll({where:{name}})
    
    res.json(roles)
  }
  catch(error)
  {
    console.error(error)
    res.status(500).send('Server Error')
  }

})



app.post('/roles', async(req,res)=>{
  try{
      const {name} = req.body
      const role = await Roledev.create({
        name
      })
      res.json(role)
  }
  catch(error)
  {
    console.error(error)
    res.status(500).send('Server Error')
  }

})

app.get('/roles/:id', async(req,res)=>{
  try{
      const {id} = req.params
      const role = await Roledev.findByPk(id)
      if(!role)
        return res.status(404).json({error: 'Role not found'})
      res.json(role)
  }
  catch(error)
  {
    console.error(error)
    res.status(500).send('Server Error')
  }

})

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



