const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { response } = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlers
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static diectory
app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=> {
    res.render('index', {
        title:'Weather',
        name: 'Tal'
    })
})

app.get('/about', (req,res)=> {
    res.render('about', {
        title:'About',
        name: 'Tal'
    })
})

app.get('/help', (req,res)=> {
    res.render('help', {
        title:'Help',
        name: 'Tal',
        helpText:'help tmp text'
    })
})

//http://localhost:3000/weather?address=boston
app.get('/weather', (req,res)=>{
    if(!req.query.address)
    {
        return response.send({
            error:'you must provide a address term'
        })
    }

    const address = req.query.address;

    geocode(address, (error, {latitude,longitude,location} = {}) => {
        if(error){
            return res.send({ error })
        }
    
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({ error }) 
            }

            res.send({
                forecastDesc: forecastData.description,
                location: location,
                forecastHumedity:forecastData.humidity,
                address: address
            })
           
          })
    
    })
})

app.get('/products', (req,res)=>{
    if(!req.query.search)
    {
        return response.send({
            error:'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('help/*',(reg,res)=>{
    res.render('404', {
        title:'help 404',
        name: 'Tal'
    })
})

app.get('*',(reg,res)=>{
    res.render('404', {
        title:'404',
        name: 'Tal'
    })
})



app.listen(port, () =>{
    console.log('Server is up on port '+ port)
})