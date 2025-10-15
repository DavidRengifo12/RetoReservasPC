import supabase from "../Supabase"

export const getEquiposComputo = async () => {
    const {data, error} = await supabase
    .from('equiposComputo')
    .select('*')
    .order('nombre_equipo')

    if(error) throw error
    return data 
}

export const postEquiposNuevos = async(newEquipo) => {
    const {data, error} = await supabase
    .from('equiposcomputo')
    .insert([{
      codigo_equipo: newEquipo.codigo_equipo,
      nombre_equipo: newEquipo.nombre_equipo,
      marca_equipo: newEquipo.marca_equipo,
      estado: newEquipo.estado ?? true
    }])
    .select()
    .single()

    if(error) throw error
    return data
}

export const updateEquipos = async (id, updates ) => {
    const {data, error} = await supabase
    .from('equiposComputo')
    .update(updates)
    .eq('id', id)
    .select()

    if(error) throw error
    return data
}


export const deleteEquipos = async (id) => {
    const {data, error} = await supabase
    .from('equiposComputo')
    .delete()
    .eq('id', id)

    if(error) throw error
    return data
}