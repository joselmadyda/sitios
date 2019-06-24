const request = require('request-promise-native');
const Joi = require('@hapi/joi') 


async function testGetSitiosByCategoria(serverUrl, idCategory) {
    
    let setPruebas= []

    const options = {
        uri: `${serverUrl}/${idCategory}`,
        json: true
    }
    try {
        const sitios = await request(options)

        if (sitios.length > 0) {
            for (let i = 0; i < sitios.length; i++) {

                let sitioValidado =  esSitioValido(sitios[i],idCategory)
                
                if (sitioValidado) {
                    console.log("No Ok: " + sitioValidado.name + ' - ' + sitioValidado.details[0].message);
                    setPruebas.push({
                        testname: "GetSitiosxCategoria_CP" + [i],
                        resultado: "Fallo",
                        error: sitioValidado.details[0].message,
                        observacion: 'Categoria: ' + sitios[i].id_categoria ,
                        data: sitios[i]
                    })
                    contadorMalos++;

                } else {
                    setPruebas.push( {
                            testname: "GetSitiosxCategoria_CP" + [i],
                            resultado: "Ok",
                            error: "Sin Error",
                            observacion: 'Categoria: ' + sitios[i].id_categoria ,
                            data: sitios[i]
                     })
                }
            }
            
        } else {
            setPruebas.push( {
                testname: "GetSitiosxCategoria_CP_Vacio",
                resultado: "Ok",
                error: "Sin Error",
                observacion: 'Categoria: ' + idCategory ,
                data: ('No existen Sitios para Categoria'+idCategory)
         })
        }

        return setPruebas

    } catch (err) {
        console.log(err)
        return err 
    }
}

function esSitioValido(sitio,idCategory) {

    const schema = {  
        id_sitio: 		    Joi.number().integer()    ,
        id_categoria:	    Joi.number().integer().min(idCategory).max(idCategory)    ,
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


module.exports = testGetSitiosByCategoria