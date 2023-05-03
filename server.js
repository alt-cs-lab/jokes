const express = require('express')
const process = require('process')
const jokes = require('./jokes.json')

const PORT = process.env["PORT"] || 3000

const app = express()

app.use(express.static('public'))

app.get('/random', (req, res) => {
  const index = parseInt(Math.random() * jokes.length)
  const joke = jokes[index]
  
  if(req.headers.accept.includes("json"))
  {
    const json = ({
      contents: {
        jokes: {
          joke: {
            text: joke
          }
        }
      }
    })
    res.json(json)
  }
  else {
    const xml = `<xml><response><contents><jokes><joke><text>${joke.replace(/\n/g, '<br/>')}</text></joke></jokes></contents></response></xml>`
    res.set('Content-Type', 'text/xml')
    res.send(xml)
  }
})

app.listen( PORT, () => console.log(`Listening on port ${PORT}`))
