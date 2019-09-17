import express from 'express'
import bodyParser from 'body-parser'
import passport from 'passport'
import cors from 'cors'
import errorHandler from 'errorhandler'
import path from 'path'
import swaggerUi from 'swagger-ui-express'

import models from 'models'
import routes from 'routes'
import swaggerDocument from './config/swagger'

const app = express()
const PORT = 5000
const isProduction = process.env.NODE_ENV === 'production'

require('./db/models/user')
require('./config/passport')

models.sequelize.sync()
  .then(() => {
    console.log('Database is fine')
  })
  .catch((err) => {
    console.log(err, 'Something went wrong with the Database Update!')
  })

if (isProduction) {
  app.use(cors({ origin: 'https://tracker-fe.herokuapp.com' }))
} else {
  app.use(cors())
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  app.use(errorHandler())
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(passport.initialize())

require('./db/models/user')
require('./config/passport')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(routes)

app.use((req, res, err) => {
  res.status(err.status || 500)

  res.json({
    errors: {
      message: err.message,
      error: err
    }
  })
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`server running on port ${PORT}`)
})
