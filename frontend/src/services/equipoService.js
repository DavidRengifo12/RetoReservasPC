import supabase from "../Supabase"


//ver los equipos de computo
export const getEquiposComputo = async () => {
    const {data, error} = await supabase
    .from('equiposcomputo')
    .select('*')
    .order('nombre_equipo')

    if(error) throw error
    return data 
}


//Crear un equipo de computo nuevo
export const postEquiposNuevos = async(newEquipo) => {
    const {data, error} = await supabase
    .from('equiposcomputo')
    .insert([newEquipo])
    .select()
    .single()

    if(error) throw error
    return data
}


//Actualizar los equipos de computo
export const updateEquipos = async (id, updates ) => {
    const {data, error} = await supabase
    .from('equiposcomputo')
    .update(updates)
    .eq('id', id)
    .select()

    if(error) throw error
    return data
}

//Eliminar los equipos de computo
export const deleteEquipos = async (id) => {
    const {data, error} = await supabase
    .from('equiposcomputo')
    .delete()
    .eq('id', id)

    if(error) throw error
    return data
}