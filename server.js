var express = require('express')
var body_parser = require('body-parser')
var Port = process.env.PORT || 5000
var app = express()
app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: false }))

var appRouter = require('./appRoutes.js')

app.use('/', appRouter);

app.listen(Port, () => {
    console.log('app Runnig on port ', Port)
})
