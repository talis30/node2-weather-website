console.log('my js file')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })




const fetchlocation = (address,callback)=>{
    fetch('/weather?address=' + address ).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            message1.textContent = data.error
        }
        else
        {
            //console.log(data)
            message1.textContent = data.location
            message2.textContent = data.forecast
        }
    })
})
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    message1.textContent = '...'
    message2.textContent = ''
    const location = search.value

    
    fetchlocation(location,null)
    //console.log(location)
})

