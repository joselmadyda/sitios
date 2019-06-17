const express = require('express')
const _ = require('lodash')
var nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const sitiosDAO = require('./sitiosDAO_SQL')

const router = express.Router()

const baseURI = '/api/sitios'





router.get('/', async (req, res) => {
    console.log(`GETTING: ${baseURI}${req.url}`)

    if (_.isEmpty(req.query)) {
        _handleGetAll(req, res)
    } else {
        //_handleGetWithQS(req, res)
    }
})

async function _handleGetAll(req, res) {
    try {
        const result = await sitiosDAO.getAll()
        res.json(result)
    } catch (err) {
        res.status(err.status).json(err)
    }
}

router.get('/:cat', async (req, res) => {
    console.log(`GETTING: ${baseURI}${req.url}`)

    try {
        if (isNaN(req.params.cat))
            throw { status: 400, descripcion: 'Categoría inválida' }

        const resultado = await sitiosDAO.getByCategoria(req.params.cat)

        if (!resultado)
            throw { status: 404, descripcion: 'estudiante no encontrado' }

        res.status(200).json(resultado)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

router.get('/sel/:idsitio/', async (req, res) => {
    console.log(`GETTING SITIO: ${baseURI}${req.url}`)
    try {
        const resultado = await sitiosDAO.getSitio(req.params.idsitio)
        res.status(200).json(resultado)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

//AGREGAR NUEVO SITIO
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

//UPDATE NUEVO SITIO
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

// BORRAR SITIO
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

//CONSULTA TRIANGULADA: Obtener puntos de referencia de acuerdo a una categoria/barrio/latitud/longitud
router.get('/:distancia/:id_cat/:lat/:lng', async (req, res) => {

    try {
        const resultado = await sitiosDAO.getByCategoria(req.params.id_cat)
        const objBarrioResult = []
        if (resultado) {

            if (resultado.length > 0) {
                //objBarrioResult.push({ status: 'SITIOS ENCONTRADOS' })
                for (var i = 0; i < resultado.length; i++) {
                    let distancia = getKilometros(req.params.lat, req.params.lng, resultado[i].latitud, resultado[i].longitud)
                    console.log(distancia)
                    //Verificar distancia según coordenadas de entrada
                    if (distancia <= req.params.distancia) {

                        const objBarrio = {
                            nombre_sitio: resultado[i].nombre_sitio,
                            latitud: resultado[i].latitud,
                            longitud: resultado[i].longitud,
                            voucher: resultado[i].voucher,
                            responsable: resultado[i].responsable,
                            url: resultado[i].url,
                            distancia: getKilometros(req.params.lat, req.params.lng, resultado[i].latitud, resultado[i].longitud)
                        }
                        objBarrioResult.push(objBarrio)
                    }
                }
            } else {
                objBarrioResult.push({ status: 'SITIOS NO ENCONTRADOS' })
            }
        }

        //Se informa estado 201, con las distancias calculadas de acuerdo a las coordenadas de origen y resultado del filtro
        res.status(201).json(objBarrioResult)
        console.log(objBarrioResult)

    } catch (err) {
        res.status(err.status).json(err)
    }
})

/**
 * 
 * @param {int} lat1 //Latitud coordenada base
 * @param {int} lon1 //Longitud coordenada base
 * @param {int} lat2 //Latitud coordenada para obtener distancia
 * @param {int} lon2 //Longitud coordenada para obtener distancia
 */
function getKilometros(lat1, lon1, lat2, lon2) {
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


router.delete(':idsitio', async (req, res) => {
    console.log(`DELETING: ${baseURI}${req.url}`)

    console.log(req.params.id_sitio)
    /*
        try {
            if (isNaN(req.params.id_sitio))
                throw { status: 400, descripcion: 'El Sitio provisto no es un número o es inválido' }
    
            await sitiosDAO.deleteByIdSitio(req.params.id_sitio)
            res.status(204).send()
        } catch (err) {
            res.status(err.status).json(err)
        }*/

})


router.get('/email/:email', async (req, res) => {


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

    var smtpTransport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
            user: "tp.sitiosvip",
            pass: "PaSSword123"
        }
    });


    smtpTransport.use('compile', hbs(handlebarOptions));

    var mailOptions = {
        to: req.params.email,
        subject: "DESCUENTO SITIO VIP",
        text: "",
        template: "voucher"
    }

    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {

            res.json(false);
        } else {

            res.json(true);
        }
    });

})





module.exports = router