import express from 'express' // importamos express
import { agregarContacto, obtenerContactos, borrarContacto} from './src/mysql_conector.js'
let todos
const app = express() // iniciamos express
//iniciamos servidor

app.listen('8000', function(){
    console.log('aplicacion iniciada en el puerto 8000')
})
//configuracion de pug
app.set('views', './vistas')
app.set('view engine', 'pug')

//configuracion de archivos estaticos
app.use(express.static('./vistas'))
app.use(express.static('./src'))
app.use(express.static('./css'))




app.get('/', function(req, res){
    //conectar()
    todos = obtenerContactos()
    res.render('index', {titulo: 'Aplicacion de Contactos', contactos:todos})
})
app.get('/agregar/:nombre/:numero', function(req, res){
    let nombre = req.params.nombre
    let numero = req.params.numero
    agregarContacto(numero, nombre)
    res.redirect('/')

    console.log(nombre, numero)
})
app.get('/borrar/:id', function(req, res){
    let id = req.params.id
    borrarContacto(id)
    res.redirect('/')
})