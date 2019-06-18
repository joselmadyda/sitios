const express = require('express')
const _ = require('lodash')
var nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const sitiosDAO = require('./sitiosDAO_SQL')
const router = express.Router()

//Base URI
const baseURI = '/api/sitios'

/**
 * Servicio GET: lista todos los sitios
 */
router.get('/', async (req, res) => {
    console.log(`GETTING: ${baseURI}${req.url}`)

    if (_.isEmpty(req.query)) {

        try {

            const result = await sitiosDAO.getAll()
            res.status(201).json(result)
        } catch (err) {
            res.status(err.status).json(err)
        }
    }
})

/**
 * Servicio GET: Lista sitios por categoría
 */
router.get('/:cat', async (req, res) => {
    console.log(`GETTING: ${baseURI}${req.url}`)

    try {
        if (isNaN(req.params.cat))
            throw { status: 400, descripcion: 'Categoría inválida' }

        const resultado = await sitiosDAO.getByCategoria(req.params.cat)

        if (!resultado)
            throw { status: 404, descripcion: 'categoría no encontrada' }

        res.status(201).json(resultado)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

/**
 * Servicio GET: Lista sitio por id de sitio
 */
router.get('/sel/:idsitio/', async (req, res) => {
    console.log(`GETTING SITIO: ${baseURI}${req.url}`)
    try {
        const resultado = await sitiosDAO.getSitio(req.params.idsitio)
        res.status(201).json(resultado)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

/**
 * Servicio POST: Agrega nuevo sitio
 */
router.post('/add/', async (req, res) => {
    console.log(`POSTING: ${baseURI}${req.url}`)

    try {
        const sitioNuevo = req.body
        console.log(sitioNuevo)

        const sitioCreado = await sitiosDAO.addSitio(sitioNuevo)
        const mensajeResponse = { status: 'SITIO CREADO CORRECTAMENTE', sitioCreado }
        res.status(201).json(mensajeResponse)

    } catch (err) {
        res.status(err.status).json(err)
    }
})

/**
 * Servicio POST: Actualiza datos de un sitio
 */
router.post('/upd/', async (req, res) => {
    console.log(`POSTING: ${baseURI}${req.url}`)

    try {
        const sitioUpdated = req.body
        console.log(sitioUpdated)

        // const sitioAct = await sitiosDAO.updateSitio(sitioUpdated)
        // const mensajeResponse = { status: 'SITIO MODIFICADO CORRECTAMENTE', sitioAct }
        // res.status(201).json(mensajeResponse)

    } catch (err) {
        res.status(err.status).json(err)
    }
})

/**
 * Servicio POST: Elimina sitio por id de Sitio
 */
router.post('/del/:idsitio/', async (req, res) => {
    console.log(`POSTING DELETE: ${baseURI}${req.url}`)
    try {
        const resultado = await sitiosDAO.deleteByIdSitio(req.params.idsitio)
        const mensajeResponse = { status: 'SITIO ELIMINADO CORRECTAMENTE', resultado }
        res.status(201).json(mensajeResponse)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

/**
 * Servicio GET: Devuelve listado de sitios según distancia calculada entre coordenadas recibidas y km
 */
router.get('/:distancia/:id_cat/:lat/:lng', async (req, res) => {
    console.log(`GETTING DISTANCE: ${baseURI}${req.body}`)
    try {
        const resultado = await sitiosDAO.getByCategoria(req.params.id_cat)

        const objBarrioResult = []

        if (resultado) {

            if (resultado.length > 0) {

                //Filtrar sitios por coordenadas de acuerdo a la distancia recibida
                objBarrioResult = _filitrarDistanciaBarrios(resultado, req.params.lat, req.params.lng, req.params.distancia)

            } else {
                objBarrioResult.push({ status: 'SITIOS NO ENCONTRADOS' })
            }
        }

        //Se informa estado 201, con las distancias calculadas de acuerdo a las coordenadas de origen y resultado del filtro
        res.status(201).json(objBarrioResult)

    } catch (err) {
        res.status(err.status).json(err)
    }
})

/**
 * 
 * @param {obj Coordenadas} objCoordenadas 
 * @param {int} latInicial 
 * @param {int} lngInicial 
 * @param {int} distanciaParam 
 */
function _filitrarDistanciaBarrios(objCoordenadas, latInicial, lngInicial, distanciaParam) {

    //Inicialización objeto Resultado
    objResult = []

    //Armar objeto con las coordenadas de los sitios que se encuentren dentro de la distancia ingresada
    for (var i = 0; i < objCoordenadas.length; i++) {

        let distanciaCalculada = _obtenerSitiosporDistancia(latInicial, lngInicial, objCoordenadas[i].latitud, objCoordenadas[i].longitud)

        //Verificar distancia según coordenadas de entrada
        if (distanciaCalculada <= distanciaParam) {

            const objBarrio = {
                nombre_sitio: objCoordenadas[i].nombre_sitio,
                latitud: objCoordenadas[i].latitud,
                longitud: objCoordenadas[i].longitud,
                voucher: objCoordenadas[i].voucher,
                responsable: objCoordenadas[i].responsable,
                url: objCoordenadas[i].url,
                distancia: distanciaCalculada
            }
            objResult.push(objBarrio)
        }
    }

    //Se devuelve objeto Resultado
    return objResult
}

/**
 * Obtener distancia entre dos puntos geométricos
 * 
 * @param {int} lat1 //Latitud coordenada base
 * @param {int} lon1 //Longitud coordenada base
 * @param {int} lat2 //Latitud coordenada para obtener distancia
 * @param {int} lon2 //Longitud coordenada para obtener distancia
 */
function _obtenerSitiosporDistancia(lat1, lon1, lat2, lon2) {
    const rad = function (x) {
        return (x * Math.PI) / 180;
    };
    var R = 6378.137; //Radio de la tierra en km
    var dLat = rad(lat2 - lat1);
    var dLong = rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(lat1)) *
        Math.cos(rad(lat2)) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    //Devuelve el número procesado con 2 decimales
    return d.toFixed(2);
}

/**
 * Servicio GET: Envío de mail por dirección de correo recibida
 */
router.get('/email/:email', async (req, res) => {
    console.log(`GETTING EMAIL: ${baseURI}${req.params.email}`)
    //Seteo de opciones para el objeto handlebar
    const handlebarOptions = {
        viewEngine: {
            extName: '.hbs',
            partialsDir: './src/views/',
            layoutsDir: './src//views/',
            defaultLayout: 'voucher.hbs',
        },
        viewPath: './src//views/',
        extName: '.hbs',
    };

    //Seteo de opciones para el objeto transporter
    var smtpTransport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
            user: "tp.sitiosvip",
            pass: "PaSSword123"
        }
    });

    //Uso del objeto transporter
    smtpTransport.use('compile', hbs(handlebarOptions));

    //Seteo opciones del objeto mail
    var mailOptions = {
        to: req.params.email,
        subject: "DESCUENTO SITIO VIP",
        text: "",
        template: "voucher"
    }

    //Envío de mail
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            res.json(false);
        } else {
            res.json(true);
        }
    });
})

module.exports = router