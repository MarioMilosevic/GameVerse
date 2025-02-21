import express, { NextFunction, Request, Response } from 'express'
import usersRouter from "./routes/users"

const app = express()
const port = 3000

app.get('/api/users', (req:Request, res:Response, next:NextFunction) => {
    
})

app.use('/api/users', usersRouter)

app.listen(port, () => {
  console.log('Running on port 3000')  
})