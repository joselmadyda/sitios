const request = require('request-promise-native');
const Joi = require('@hapi/joi') ;


async function testGetSitiosByDistancia(serverUrl, distancia, idCategoria, lat, lng) {

    let setPruebas= []

    const options = {
        uri: `${serverUrl}/${distancia}/${idCategoria}/${lat}/${lng}`,
        json: true
    }

    try {
        const sitios = await request(options)
        

        if (sitios.length > 0) {
            for (let i = 0; i < sitios.length; i++) {

                let dist = obtenerSitiosporDistancia(sitios[i].latitud, sitios[i].longitud, lat, lng) 

                //console.log(JSON.stringify(sitios[i]))
                let sitioValidado =  esSitioValido(sitios[i], lat, lng)
                
                if (sitioValidado) {
                    console.log("No Ok: " + sitioValidado.name + ' - ' + sitioValidado.details[0].message);

                    setPruebas.push({
                        testname: "GetSitiosxDistancia_CP" + [i],
                        resultado: "Fallo",
                        error: sitioValidado.details[0].message,
                        observacion: '(Distancia Calculada: ' + dist ,
                        data: sitios[i]
                    })

                    } else {
                        setPruebas.push( {
                                testname: "GetSitiosxDistancia_CP" + [i],
                                resultado: "Ok" ,
                                error: "Sin Error",
                                observacion: '(Distancia Calculada: ' + dist + ')',
                                data: sitios[i]
                        })
                    }
            }
        } else {
            setPruebas.push( {
                testname: "GetSitiosxDistancia_Vacio",
                resultado: "Ok" ,
                error: "Sin Error",
                observacion: `No hay sitios para distancia: ${distancia}, Posicion: ${lat}, ${lng} ` ,
                data: ('No existen Sitios')
        })
        }

        return setPruebas

    } catch (err) {
        console.log(err)
        return err 
    }
}

function esSitioValido(sitio, lat, lng) {

    let dist = obtenerSitiosporDistancia(sitio.latitud, sitio.longitud, lat, lng) 
    const schema = {  
        nombre_sitio: 	    Joi.string()  ,
        latitud:		    Joi.number()  ,
        longitud:		    Joi.number()  ,
        voucher:		    Joi.boolean() ,
        responsable:	    Joi.string()  ,
        url: 			    Joi.string()  ,
        distancia:          Joi.number().min(dist*0.99999).max(dist*1.00001)
    }
    const { error } = Joi.validate(sitio, schema);                                      
    return error
}

function obtenerSitiosporDistancia(lat1, lon1, lat2, lon2) {
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

module.exports = testGetSitiosByDistancia