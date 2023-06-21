const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('mdbtest', 'root', 'admin2', {
    host: 'localhost',
    port: 3308,
    dialect: 'mariadb',
    define: {        
        freezeTableName: true
    }
   
  })

  
try{
    sequelize.authenticate()
    console.log('Connection Succefully')    
}
catch(err)
{
    console.log('Connection error')
}


module.exports = sequelize

