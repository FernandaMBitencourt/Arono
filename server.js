const express = require ('express')
const bodyParser = require('body-parser')
const app = express()

const MongoClient = require('mongodb').MongoClient

const uri = "mongodb+srv://fernanda:4dHXuXLYO8nBwJ78@cluster0.gbwja.mongodb.net/test"

      //Mongo Cliente
      MongoClient.connect(uri, (err, client) => {

        useUnifiedTopology: true
        useNewUrlParser: true
        
        if (err) return console.log(err)
        db = client.db('arono')
      
        app.listen(3002, function() {
          console.log('Servidor rodando... ')
        })
         
      })

    //Body Parser
    app.use(bodyParser.urlencoded({ extended: true}))
    app.use(bodyParser.json())

    //Pasta de arquivos estaticos
      app.use('/static',express.static('public'))
      
    // Ejs
    app.set('view engine', 'ejs')

    //Rotas   
    app.get('/', (req, res) => {
      res.render('index')
    })
    
    app.get('/', (req, res) => {
        let cursor = db.collection('formularios').find()
    })
    
    app.post('/formulario',(req, res) => {
      db.collection('formularios').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('Salvo no banco de dados')
        res.redirect('/')
      
        db.collection('formularios').find().toArray((err, results) => { 
           console.log(results)
        })
      })
    })
   
