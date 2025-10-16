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

// Validar si ya existe una reserva para el mismo equipo en la misma fecha
export const existeReservaEquipoEnDia = async (equipoId, inicioDiaISO, finDiaISO) => {
    const { data, error } = await supabase
        .from('reservasequipo')
        .select('id')
        .eq('equipo_id', equipoId)
        .gte('fecha_reserva', inicioDiaISO)
        .lt('fecha_reserva', finDiaISO)
        .limit(1);

    if (error) throw error;
    return data && data.length > 0;
}

// Validar si el usuario ya tiene una reserva en esa fecha
export const existeReservaUsuarioEnDia = async (userId, inicioDiaISO, finDiaISO) => {
    const { data, error } = await supabase
        .from('reservasequipo')
        .select('id')
        .eq('user_id', userId)
        .gte('fecha_reserva', inicioDiaISO)
        .lt('fecha_reserva', finDiaISO)
        .limit(1);

    if (error) throw error;
    return data && data.length > 0;
}

// Obtener reservas por usuario
export const getReservasUsuario = async (userId) => {
    const { data, error } = await supabase
        .from('reservasequipo')
        .select('*')
        .eq('user_id', userId)
        .order('fecha_reserva', { ascending: false });

    if (error) throw error;
    return data;
}

// Obtener reservas por usuario incluyendo datos del equipo (consulta doble y merge)
export const getReservasUsuarioDetallado = async (userId) => {
    const reservas = await getReservasUsuario(userId);
    if (!reservas || reservas.length === 0) return [];

    const equipoIds = [...new Set(reservas.map(r => r.equipo_id))];
    const { data: equipos, error: equiposError } = await supabase
        .from('equiposcomputo')
        .select('id, codigo_equipo, nombre_equipo, marca_equipo, estado')
        .in('id', equipoIds);

    if (equiposError) throw equiposError;

    const mapEquipos = new Map(equipos.map(e => [e.id, e]));
    return reservas.map(r => ({
        ...r,
        equipo: mapEquipos.get(r.equipo_id) || null,
    }));
}