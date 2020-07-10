const request = require('request')



const forecast = (latitude,longitude,callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=67d29feb1138a7141783a6431a46aa23&query=' + latitude + ',' + longitude +'&units=m'
  //console.log(url)
    request({url, json: true}, (error,{body})=> {

        if(error){
            callback('Unable to connect.')
        }
        else if(body.error) {
            callback('Unable to find.')
        }
        else {
            const current = body.current
            
            callback(undefined,current.weather_descriptions[0]+ ' It is currently ' + current.temperature +' degress out. Feels like ' + current.feelslike)
        }

    })

}

module.exports = forecast


