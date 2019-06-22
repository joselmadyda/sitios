const request = require('request-promise-native');
const Joi = require('@hapi/joi') // para validar la estructura interna de un objeto

console.log('---- TEST GET SITIOS')

async function testGetSitios(serverUrl) {

    const options = {
        uri: `${serverUrl}`,
        json: true
    }

    try {
        const sitios = await request(options)

           // console.log('Total Sitios:' +sitios.length)
        //console.log(sitios)
        let contadorMalos=0
        let contadorBuenos=0
       // let testOK = true
        for (let i = 0; i < sitios.length; i++) {
         if (esSitioValido(sitios[i])){
             console.log( `el sitio ${sitios[i].nombre_sitio} no contiene un formato valido` )

         }else{
            contadorBuenos+=1
         }
        
        }
        console.log(`Correctos: ${contadorBuenos}/${sitios.length}`)
       
    } catch (err) {
        console.log(`get sitios: error en la respuesta del servidor, detalle:  ${err} ` )
    }
}


function esSitioValido(sitio) {
   // console.log('entre al joi')
    const schema = {  //esquema de sitio va a tener : . Mapear a :
        nombre_sitio: Joi.string().alphanum().min(1).required(),
        latitud: Joi.number().integer().min(1).required(),
        longitud: Joi.number().integer().min(0).required(),
        voucher: Joi.boolean().required(),
        reponsable:Joi.string().alphanum().min(1).required(),
        url: Joi.string().alphanum().min(1).required(),
        distancia: Joi.number().integer().min(1).max(99999999).required()
    }
    // console.log('entre al joi2')
    const { error } = Joi.validate(sitio, schema); // las llaves significan "desestructuracion" en lugar de objeto 
                                                            // a una variable . Se le asignan a la variable los campos del objeto
       // console.log('entre al joi3')                                                        
    return error

}

module.exports = testGetSitios