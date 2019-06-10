const knex = require('./db/knex')

async function getAll() {
    const selectAllQuery = `exec sitiosWeb @Tarea= 'ALLSITIOS';`
    const result = await knex.raw(selectAllQuery)
    // const result = await knex.select('*').from('estudiantes')
    return result
}

async function getByCategoria(cat) {
    const selectByCategoria = `exec sitiosWeb @Tarea= 'SITIOPORCATEGORIA', @IdCategoria= ${cat};`
    const result = await knex.raw(selectByCategoria)
    return result
}


async function getByCategoriaBarrio(id_categoria, barrio) {
    const selectCategoriaBarrio = `exec sitiosWeb @Tarea= 'SITIOPORCATYBARRIO', @IdCategoria=${id_categoria}, @Barrio='${barrio}'`
    const result = await knex.raw(selectCategoriaBarrio)
    return result
}

//AGREGAR SITIO
async function addSitio(nuevoSitio) {
    try {
        let insertionQuery = `exec sitiosWeb @Tarea='ALTASITIO', @IdCategoria='${nuevoSitio.id_categoria}',`
        insertionQuery += `@NombreSitio='${nuevoSitio.nombre_sitio}', @Barrio= '${nuevoSitio.barrio}', `
        insertionQuery += `@Latitud=${nuevoSitio.latitud}, @Longitud=${nuevoSitio.longitud}, @Url='${nuevoSitio.url}',`
        insertionQuery += `@Responsable='${nuevoSitio.responsable}', @HoraApertura='${nuevoSitio.hora_apertura}',`
        insertionQuery += `@HoraCierre='${nuevoSitio.hora_cierre}', @Voucher= ${nuevoSitio.voucher}`  
        await knex.raw(insertionQuery)
        return nuevoSitio
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

//ELIMINAR SITIO
async function deleteByIdSitio(idSitio) {
    try {
        const deleteByIdSitioQuery = `exec sitiosWeb @Tarea= 'DELETESITIO', @IdSitio= ${idSitio}`
        await knex.raw(deleteByIdSitioQuery)
        return 1
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

// SELECT X SITIO
async function getSitio(idSitio) {
    const selectSitio = `exec sitiosWeb @Tarea= 'SITIOPORID', @IdSitio= ${idSitio}`
    const result = await knex.raw(selectSitio)
    return result
}

// MODIFICAR SITIO
async function updateSitio(idSitio,url) {
    try {
     //   const updateSitioQuery = `exec sitiosWeb @Tarea= 'UPDATESITIO', @Url='${url}', @IdSitio=${idSitio}`
     const updateSitioQuery = `update sitios set url= '${url}' where id_sitio=${idSitio}`
        await knex.raw(updateSitioQuery)
        return 1
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}
module.exports = {
    getAll,
    getByCategoria,
    getByCategoriaBarrio,
    addSitio,
    getSitio,
    deleteByIdSitio,
    updateSitio

}
