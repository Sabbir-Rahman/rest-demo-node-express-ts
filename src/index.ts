import express from 'express'
import { logInfo } from '../logger/customLogger'
require('dotenv').config()

const app = express()

// defining the user type
export interface User {
  id: number
  name: string
}

let users:User[] = []

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)
const port = process.env.PORT || 5000

app.get('/users', (req,res)=> {
  res.status(200).json(users)
})

app.get('/user/:id',(req,res)=> {
  const user = users.find( user=> user.id === Number(req.params.id) )
  
  res.status(200).json(user)
})

app.post('/user',(req,res)=> {
  const newUser: User = {
    id: users.length + 1,
    name: req.body.name
  }

  users.push(newUser)

  res.status(200).json(newUser)
})

app.put('/user/:id',(req,res)=> {
  users = users.map(user => {
    if(user.id === Number(req.params.id)){
      return {...user,...req.body}
    }
    return user
  })
  const editedUser = users.find(user => user.id == Number(req.params.id))
  res.status(200).json(editedUser)
})

app.delete('/user/:id',(req,res)=> {
  users = users.filter(user => user.id !== Number(req.params.id))

  res.status(200).json({'message': 'User deleted successfully'})
})

app.listen(port, async () => {
  logInfo('index.ts', './index.ts', `Server running on ${port}`)
})
