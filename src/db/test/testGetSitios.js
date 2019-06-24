const request = require('request-promise-native');
const Joi = require('@hapi/joi') 

async function testGetSitios(serverUrl) {
    
    let setPruebas= []

    const options = {
        uri: `${serverUrl}`,
        json: true
    }
    try {
        const sitios = await request(options)

        if (sitios.length > 0) {
            for (let i = 0; i < sitios.length; i++) {

                let sitioValidado =  esSitioValido(sitios[i])
                
                if (sitioValidado) {
                    console.log("No Ok: " + sitioValidado.name + ' - ' + sitioValidado.details[0].message);
                    setPruebas.push({
                        testname: "GetSitios - CP" + [i],
                        resultado: "Fallo",
                        error: sitioValidado.details[0].message,
                        data: sitios[i]
                    })
                    contadorMalos++;

                } else {
                    setPruebas.push( {
                            testname: "GetSitios - CP" + [i],
                            resultado: "Ok",
                            error: "Sin Error",
                            data: sitios[i]
                     })
                }
            }
            
        } else {
            console.log("No existen sitios")
        }

        return setPruebas

    } catch (err) {
        console.log(err)
        return err 
    }
}

function esSitioValido(sitio) {
    const schema = {  
        id_sitio: 		    Joi.number().integer()    ,
        id_categoria:	    Joi.number().integer()    ,
        nombre_sitio: 	    Joi.string()  ,
        barrio: 		    Joi.string()  ,
        latitud:		    Joi.number()  ,
        longitud:		    Joi.number()  ,
        url: 			    Joi.string()  ,
        responsable:	    Joi.string()  ,
        hora_apertura:	    Joi.string()  ,
        hora_cierre:	    Joi.string()  ,
        voucher:		    Joi.boolean()
    }
    
    const { error } = Joi.validate(sitio, schema);                                      
    return error

}

module.exports = testGetSitios