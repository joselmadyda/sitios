const testGetSitios = require('./testGetSitios')
const testGetSitiosByCategoria = require('./testGetSitiosByCategoria')
const testGetSitiosByDistancia = require('./testGetSitiosByDistancia')
const fs = require('fs')
let html = require('./templatePruebas')

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;


//const testAddSitios = require('./testAddSitios')

const serverUrl = 'http://127.0.0.1'
const serverPort = '8090'
const api = 'api'
const seccion = 'sitios'


const urlSitios = serverUrl + ":" + serverPort + "/" + api + "/" + seccion

async function main() {
    
    let resultado = ''

    // Escritura del encabezado del informe html
    html += '<div class="row"> <h1>Pruebas Unitarias</h1> </div>'
    html += `<div class="row"> <h4>Fecha Hora Ejecucion: ${dateTime} </h4></div><hr>`
        
    // Ejecucion de cada Test y genera de tabla con los test
    resultado = await testGetSitiosByCategoria(urlSitios,1) ;
    html += generaTabla(resultado,'Test Get Sitios x Categoria 1')

    resultado = await testGetSitiosByCategoria(urlSitios,10) ;
    html += generaTabla(resultado,'Test Get Sitios x Categoria 10')

    resultado = await testGetSitiosByDistancia( urlSitios, 5, 1, -34.609953, -58.4292301 ) ;
    html += generaTabla(resultado,'Test Get Sitios x Distancia')

    resultado = await testGetSitios(urlSitios);  
    html += generaTabla(resultado,'Test Get Sitios')



    // Escritura Cierre del Archivo HTML y Generacion de Archivo.:
    html += '</div></body></html>'
    fs.writeFileSync('pruebas/resultadoPruebas.html', html)


    // Funcion que Escribe los Resultados en Tablas y deja mensajes en consola. devuelve un "div x row con cada tabla"
    function generaTabla(prueba,titulo) {
        
        let contadorMalos=0
        let contadorBuenos=0
        let text = `<br><br><div class="row"><br><br><h3>Set Pruebas: ${titulo}</h3>`
        text += '<table class="table table-bordered table-condensed table-sm table-hover">'
        text += '<thead><th>Nombre Caso de Prueba</th><th>Resultado Test:</th><th>Error</th><th>Observacion</th><th>Datos</th></thead>'
        
        // Armado Ciclico de la Tabla
        for (let i = 0; i < prueba.length; i++) {
            text += 
            '<tr>' +
            `<td>${prueba[i].testname}</td>` +
            `<td>${prueba[i].resultado}</td>`+
            `<td>${prueba[i].error}</td>`+
            `<td>${prueba[i].observacion}</td>`+
            `<td><a class="btn btn-primary" data-toggle="collapse" href="#${prueba[i].testname}" role="button" aria-expanded="false" aria-controls="${prueba[i].testname}">Mostrar JSON</a>
             <div class="collapse" id="${prueba[i].testname}"><div class="card card-body">${JSON.stringify(prueba[i].data)}</div></div>
            </td>`
            '</tr>'

            if (prueba[i].resultado==="Ok"){
                contadorBuenos++
            } else {
                contadorMalos++
            }
        }

        const porcentajeOk = (contadorBuenos / (contadorBuenos+contadorMalos)) * 100
        const resultadoFinal = `Porcentaje de Casos Ok:  ${porcentajeOk} % - Casos Ok: ${contadorBuenos} - Casos No Ok: ${contadorMalos}`

        console.log('\n------------ ' + titulo + ' ------------')
        console.log(resultadoFinal)

        text += '<tr><td colspan="5"><h4><br>'+ resultadoFinal +'</h4></td></tr>'
        text += '</table></div>'

        return text;
    }
}

main()