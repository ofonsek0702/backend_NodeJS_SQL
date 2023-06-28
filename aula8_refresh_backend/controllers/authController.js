const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

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

        const token= jwt.sign({id:user.id, username:user.username}, 'secret_key')
        const reftoken = jwt.sign({ id: user.userId, username:user.username }, 'secret_key2')  

        return res.status(200).json({auth:true, token: token, refreshToken: reftoken})
        
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
      }
    }

    static async logout(req, res) {
      return res.json({auth:false, token: null})
    }

    static async refreshToken(req,res){
      const reftoken = req.body.refreshToken

      if (!reftoken) {
        return res.status(403).json({ auth: false, message: 'No refresh token provided' })
      }

      jwt.verify(reftoken, 'secret_key2', (err, user) => {
        if (err) {
          return res.status(403).json({ auth: false, message: 'Invalid refresh token' })
        }
       
        const newtoken = jwt.sign({ id: user.userId, username:user.username }, 'secret_key')
        
        res.json({ refreshToken: newtoken })
      })

    }

  }
  
  module.exports = AuthenticationController