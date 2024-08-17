const connectTomongo =require('./db')
const express = require('express')
var cors = require('cors')


connectTomongo();
const app = express()
const port = 5000

 
app.use(cors())
app.use(express.json())

//middle ware for write in req.body
app.use(express.json())


/* app.get('/D1/V1', (req, res) => {
  res.send('Hello LIGIN!')
}) */

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook  app listening at http://localhost:${port}`)
})
