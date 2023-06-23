const bcrypt = require('bcrypt')

const Users = require('../models/User')

class AuthenticationController {
    static async login(req, res) {
      try {
        const { username, password } = req.body
          
        const user = await Users.findOne({ where: { username } })
        
        if (!user) {
          return res.status(401).json({ message: 'Invalid user' })
        }
          
        const compareResult = await bcrypt.compare(password, user.password)

        if (!compareResult) {
          return res.status(401).json({ message: 'Invalid password' })
        }
        
        req.session.user = {
            id: user.id,
            username: user.username,
          };
          
        res.status(200).json({ message: 'Login OK' })
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
      }
    }

    static async logout(req, res) {
        try {          
          req.session.destroy()    
          res.status(200).json({ message: 'Logout OK' })
        } catch (error) {
          console.error('Logout error:', error)
          res.status(500).json({ message: 'Server Error' })
        }    
    }
  }
  
  module.exports = AuthenticationController