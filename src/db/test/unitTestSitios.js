const testGetSitios = require('./testGetSitios')
const testGetSitiosByCategoria = require('./testGetSitiosByCategoria')
const fs = require('fs')

//const testGetSitiosByDistancia = require('./testGetSitiosByDistancia')
//const testAddSitios = require('./testAddSitios')

const serverUrl = 'http://127.0.0.1'
const serverPort = '8090'
const api = 'api'
const seccion = 'sitios'


const urlSitios = serverUrl + ":" + serverPort + "/" + api + "/" + seccion

async function main() {

    let html = '<!DOCTYPE html><html><head><style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}td, th {border: 1px solid #dddddd;text-align: left;padding: 8px;}tr:nth-child(even) {background-color: #dddddd;}</style>'
    html += '<title><h1>Pruebas Unitarias</h1></title></head><body>'
    
    let resultado = ''

    resultado = await testGetSitios(urlSitios);  
    html += generaTabla(resultado,'Test Get Sitios')

    resultado = await testGetSitiosByCategoria(urlSitios,1) ;
    html += generaTabla(resultado,'Test Get Sitios x Categoria 1')

    resultado = await testGetSitiosByCategoria(urlSitios,10) ;
    html += generaTabla(resultado,'Test Get Sitios x Categoria 10')

    //resultadoPruebas.push(await testGetSitiosByCategoria(urlSitios,10));  




    // Archivo HTML:
    html += '</body></html>'
    fs.writeFileSync('pruebas/resultadoPruebas.html', html)

    function generaTabla(prueba,titulo) {
        
        let contadorMalos=0
        let contadorBuenos=0
        let text = '<h2>'+titulo+'</h2>'

        text += '<table><th>Nombre Caso de Prueba</th><th>Resultado Test:</th><th>Error</th><th>Datos</th>'
        
        for (let i = 0; i < prueba.length; i++) {
            text += 
            '<tr>' +
            `<td>${prueba[i].testname}</td>` +
            `<td>${prueba[i].resultado}</td>`+
            `<td>${prueba[i].error}</td>`+
            `<td>${JSON.stringify(prueba[i].data)}</td>`+        
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

        text += '</table><br><h3>' + resultadoFinal + '</h3><hr><br>'

        return text;
    }
    


    //await testGetSitiosByDistancia(urlSitios) //Debe devolver sitios que estén dentro de la distancia solicitada de acuerdo a las coordenadas ingresadas    
}

main()