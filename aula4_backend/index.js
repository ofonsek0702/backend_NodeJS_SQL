const express = require('express')

const conn = require('./database/conn')


const Roledev = require('./models/Roledev')
const Userdev = require('./models/Userdev') 
//const { canTreatArrayAsAnd } = require('sequelize/types/utils')


const app = express()

app.use(
    express.urlencoded({
        extended:true
    })
)
app.use(express.json())


Userdev.belongsTo(Roledev, { foreignKey: 'role_id' })

//ROLES
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

app.put('/roles/:id', async (req,res)=>{
  try{
    const {id} = req.params
    const {name} = req.body

    const role = await Roledev.findByPk(id)

    if(!role){
      return res.status(404).json({error: 'Role not found'})
    }

    role.name = name
    await role.save()
    res.json(role)
  }
  catch(error)
  {
    console.error(error)
    res.status(500).send('Server Error')
  }
})

app.delete('/roles/:id', async(req,res)=>{
  try{
    const {id} = req.params

    const contUser = await Userdev.count({where: {role_id:id}})

    if(contUser>0){
        return res.status(400).json({message:'Error delete role'})
    }

    const countRole = await Roledev.destroy({where:{id}})

    if(countRole===0)
    {
      return res.status(404).json({error: 'Role not found'})
    }

    res.json({message:'Role deleted'})

  }
  catch(error)
  {
    console.error(error)
    res.status(500).send('Server Error')
  }

})

//USERS
app.get('/users', async(req,res)=>{
  try{
    
    const {role} = req.query

    if(!role){
      const users = await Userdev.findAll()
      return res.json(users)
    }
    const users = await Userdev.findAll({ include: [
      {
        model:Roledev,
        where: {name:role}
      }
    ]})

    res.json(users)
  }
  catch(error)
  {
    console.error(error)
    res.status(500).send('Server Error')
  }

})

app.post('/users', async(req,res)=>{
  try{
     const {name, email, role_id} = req.body

     const user = await Userdev.create({name, email, role_id})

     res.json(user)
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



