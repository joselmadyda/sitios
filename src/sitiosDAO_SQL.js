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


async function getByBarrio(barrio) {
    const selectByBarrio = `SELECT * FROM sitios WHERE barrio='${barrio}';`
    const result = await knex.raw(selectByBarrio)
    return result
}
/*
async function getByAge(edadMin, edadMax) {
    const selectByEdadQuery = `SELECT * FROM estudiantes WHERE edad >= ${edadMin} AND edad <= ${edadMax};`
    const result = await knex.raw(selectByEdadQuery)
    //     .select('*').from('estudiantes')
    //     .whereBetween('edad', [edadMin, edadMax])
    return result
}

async function getByDni(dni) {
    const selectByDni = `SELECT TOP 1 * FROM estudiantes WHERE dni='${dni}';`
    const result = await knex.raw(selectByDni)
    return result[0]
}
*/
//PROBANDOOOO AGREGAR NUEVA CATEGORIA
async function addCategory(nuevo) {
    try {
        let insertionQuery = 'INSERT INTO categorias '
        insertionQuery += '(nombre_cat) '
        insertionQuery += `VALUES ('${nuevo.nombre_cat}')`
        await knex.raw(insertionQuery)
        return nuevo
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}
/*
async function deleteByDni(dni) {
    const deleteByDniQuery = `DELETE FROM estudiantes WHERE dni=${dni}`
    await knex.raw(deleteByDniQuery)
    return
}

async function updateByDni(dni, nuevoEstu) {
    let updateByDniQuery = 'UPDATE estudiantes '
    updateByDniQuery += `SET nombre='${nuevoEstu.nombre}', `
    updateByDniQuery += `apellido='${nuevoEstu.apellido}', edad=${nuevoEstu.edad}, dni='${nuevoEstu.dni}' `
    updateByDniQuery += `WHERE dni=${dni};`
    await knex.raw(updateByDniQuery)
    return nuevoEstu
}
*/
module.exports = {
    getAll,
    getByCategoria,
    addCategory
    /*,
    getByAge,
    getByDni,
    add,
    deleteByDni,
    updateByDni
    */
}
