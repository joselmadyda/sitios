const knex = require('./db/knex')

async function getAll() {
    const selectAllQuery = `SELECT * FROM sitios;`
    const result = await knex.raw(selectAllQuery)
    // const result = await knex.select('*').from('estudiantes')
    return result
}

async function getByCategoria(cat) {
    const selectByCategoria = `SELECT * FROM sitios WHERE id_categoria='${cat}';`
    const result = await knex.raw(selectByCategoria)
    return result
}


async function getByCategoriaBarrio(id_categoria,barrio) {
    const selectCategoriaBarrio = `SELECT * FROM sitios WHERE id_categoria='${id_categoria}' and barrio ='${barrio}' ;`
    const result = await knex.raw(selectCategoriaBarrio)
    return result
}




//AGREGAR SITIO
async function addSitio(nuevoSitio) {
    try {
        let insertionQuery = 'INSERT INTO sitios '
        insertionQuery += '(id_categoria,nombre_sitio,barrio,latitud,longitud,url,responsable,hora_apertura,hora_cierre,voucher) '
        insertionQuery += `VALUES ('${nuevoSitio.id_categoria}','${nuevoSitio.nombre_sitio}','${nuevoSitio.barrio}','${nuevoSitio.latitud}','${nuevoSitio.longitud}','${nuevoSitio.url}','${nuevoSitio.responsable}','${nuevoSitio.hora_apertura}','${nuevoSitio.hora_cierre}','${nuevoSitio.voucher}')`        
        await knex.raw(insertionQuery)
        return nuevoSitio
    } catch (err) {
        throw { status: 500, descripcion: err.message }       
    }
}

//ELIMINAR SITIO
async function deleteByIdSitio(idSitio) {
    try {
        const deleteByIdSitioQuery = `DELETE FROM sitios WHERE id_sitio=${idSitio}`
        await knex.raw(deleteByIdSitioQuery)
        return
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

module.exports = {
    getAll,
    getByCategoria,
    getByCategoriaBarrio,
    addSitio,
    deleteByIdSitio

}
