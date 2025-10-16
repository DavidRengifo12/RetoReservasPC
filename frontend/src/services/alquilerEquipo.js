import supabase from "../Supabase"

export const reservaEquipo = async (reservarEquipo) => {
    const {data, error} = await supabase
    .from('reservasequipo')
    .insert([reservarEquipo])
    .select('*')
    .single()

    if(error) throw error
    return data
}


//Obtener los esquipos para reservar
export const getEquiposReservas = async () => {
    const {data, error} = await supabase
    .from('equiposcomputo')
    .select('*')
    .eq('estado', true)
    .order('marca_equipo')

    if(error) throw error
    return data
}


//Se usa para actualizar el estado de disponiblidad del equipo
export const actualizarEstadoEquipo = async (equipoId, estadoActualizado) => {
    const {data, error} = await supabase
    .from('equiposcomputo')
    .update({estado: estadoActualizado})
    .eq('id', equipoId)

    if(error) throw error
    return data

}