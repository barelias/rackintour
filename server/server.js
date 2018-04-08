var express = require('express')
const app = express()
var firebase = require('firebase');
const bodyParser = require('body-parser')
const fs = require('fs')
var fb = firebase.initializeApp({
  apiKey: "AIzaSyDY2Nza2poN-YdNxyL8ZuYXvQPSYYfyv5c",
  authDomain: "hackemtu-1523190944426.firebaseapp.com",
  databaseURL: "https://hackemtu-1523190944426.firebaseio.com",
  projectId: "hackemtu-1523190944426",
  storageBucket: "hackemtu-1523190944426.appspot.com",
  messagingSenderId: "468305211485"
});

const db = fb.database()



app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next()
  })
  .post('/chamado', (req, res) => {
    console.log(req.body)
    var obj = req.body
    db.ref('id').once('value')
      .then( data => {
        var id = data.val()
        obj['id'] = ++id
        console.log(id)
        db.ref('id').set(id)
          .then( _data => {
            db.ref('/chamado/' + id).set(obj)
              .then( __data => {
                  res.send(JSON.stringify({ status: 200, message: 'data inserted with success' }))
              })
          })
      })

  })
  .get('/shape.kml', (req, res) => {
    res.send('ola')
  })
  .get('/stats/:linha', (req, res) => {
    db.ref('/chamado/').once('value')
      .then( data => data.val())
      .then( data => {
        var totalSol = data.length
        var linha = req.params.linha
        var sol = data.filter( a => a != undefined ? a.linha == linha : false).length
        console.log(sol);
        var p = sol / (totalSol)
        var f_raw = JSON.parse(fs.readFileSync('lines.json', 'utf-8'))
        var f_total = f_raw.reduce((p, c, i) => { console.log(p, c.total); return p + c.total}, 0)
        console.log(f_total);
        var f = f_raw.find( a => a.linha == linha).total
        var p2 = f / (f_total)
        
        var t = 1 * ( 1 - ((p + p2)/2 - p2) / p2)
        res.send(JSON.stringify({
          prioridade_dinamica: p,
          prioridade_estatica: p2,
          frequencia: t
        }))
      })
  })
  .listen(2000, () => console.log("Running server at", 2000))