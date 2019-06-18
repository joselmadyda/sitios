const knex = require('./db/knex')

/**
 * Obtener todos los sitios | Tabla -> sitios
 */
async function getAll() {
    const selectAllQuery = `SELECT * FROM sitios;`
    const result = await knex.raw(selectAllQuery)    
    return result
}

/**
 * Obtener todos los sitios por Id de categoría | Tabla -> sitios
 */
async function getByCategoria(cat) {
    const selectByCategoria = `SELECT * FROM sitios WHERE id_categoria='${cat}';`
    const result = await knex.raw(selectByCategoria)
    return result
}

/**
 * Obtener todos los sitios por barrio | Tabla -> sitios
 */
async function getByCategoriaBarrio(id_categoria, barrio) {
    const selectCategoriaBarrio = `SELECT * FROM sitios WHERE id_categoria='${id_categoria}' and barrio ='${barrio}' ;`
    const result = await knex.raw(selectCategoriaBarrio)
    return result
}

/**
 * Agregar Sitio | Tabla -> sitios
 */
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

/**
 * Eliminar Sitio | Tabla -> sitios
 */
async function deleteByIdSitio(idSitio) {
    try {
        const deleteByIdSitioQuery = `DELETE FROM sitios WHERE id_sitio=${idSitio}`
        await knex.raw(deleteByIdSitioQuery)
        return 1
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

/**
 * Obtener Sitio por Id de Sitio | Tabla -> sitios
 */
async function getSitio(idSitio) {
    const selectSitio = `SELECT * FROM sitios WHERE id_sitio=${idSitio}`
    const result = await knex.raw(selectSitio)
    return result
}

/**
 * Modificar Sitio | Tabla -> sitios
 */
async function updateSitio(sitio, url) {
    try {
        const updateSitioQuery = 
                 `UPDATE sitios
                    SET  id_categoria   =    ${sitio.id_categoria}
                        ,nombre_sitio   =   '${sitio.nombre_sitio}'
                        ,barrio         =   '${sitio.barrio}'
                        ,latitud        =    ${sitio.latitud}
                        ,longitud       =    ${sitio.longitud}
                        ,url            =   '${sitio.url}'
                        ,responsable    =   '${sitio.responsable}'
                        ,hora_apertura  =   '${sitio.hora_apertura}'
                        ,hora_cierre    =   '${sitio.hora_cierre}'
                        ,voucher        =   '${sitio.voucher}'
                   WHERE id_sitio       =   ${sitio.idSitio}  `

        console.log(updateSitioQuery)
        const result = await knex.raw(updateSitioQuery)
        return result
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
