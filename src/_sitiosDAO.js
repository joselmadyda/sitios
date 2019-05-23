const estudiantes = []

async function getAll() {
    return estudiantes
}

async function getByAge(edadMin, edadMax) {
    return filterByRange(estudiantes, 'edad', edadMin, edadMax)
}

function filterByRange(elems, campo, minVal, maxVal) {
    const result = []
    for (const elem of elems) {
        if (elem[campo] >= minVal && elem[campo] <= maxVal) {
            result.push(elem)
        }
    }
    return result
}

async function getByDni(dni) {
    const estudianteBuscado = estudiantes.find(e => e.dni == dni)
    return estudianteBuscado
}

async function add(estuNuevo) {
    const estudianteBuscado = await getByDni(estuNuevo.dni)
    if (estudianteBuscado)
        throw { status: 400, descripcion: 'ya existe un estudiante con ese dni' }

    estudiantes.push(estuNuevo)
    return estuNuevo
}

async function deleteByDni(dni) {
    const posBuscada = estudiantes.findIndex(e => e.dni == dni)
    if (posBuscada == -1)
        throw { status: 404, description: 'estudiante no encontrado' }

    estudiantes.splice(posBuscada, 1)
}

async function updateByDni(dni, nuevoEstu) {
    const posBuscada = estudiantes.findIndex(e => e.dni == dni)
    if (posBuscada == -1)
        throw { status: 404, description: 'estudiante no encontrado' }

    estudiantes.splice(posBuscada, 1, nuevoEstu)
    return nuevoEstu
}

module.exports = {
    getAll,
    getByAge,
    getByDni,
    add,
    deleteByDni,
    updateByDni
}
