if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// configure Express application
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

// set view engine to ejs
app.set('view engine', 'ejs');
// where view files come from
app.set('views', __dirname + '/views')
// where layout files come from
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connect to mongoose.'))

app.use('/', indexRouter)
app.use('/authors', authorRouter)

// set listen port
app.listen(process.env.PORT || 3000)