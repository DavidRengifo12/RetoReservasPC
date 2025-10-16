import supabase from "../Supabase";

// Enviar mensaje (cumple RLS: auth.uid() debe ser == user_id)
export const enviarMensaje = async ({ user_id, contenido }) => {
  const { data, error } = await supabase
    .from("mensajes")
    .insert([{ user_id, contenido }])
    .select("*")
    .single();
  if (error) throw error;
  return data;
};

// Traer mensajes del usuario actual
export const getMensajesUsuario = async (userId) => {
  const { data, error } = await supabase
    .from("mensajes")
    .select("*")
    .eq("user_id", userId)
    .order("id", { ascending: true });
  if (error) throw error;
  return data;
};

// Traer todos los mensajes (para admin)
export const getMensajesTodos = async () => {
  const { data, error } = await supabase
    .from("mensajes")
    .select("*")
    .order("id", { ascending: true });
  if (error) throw error;
  return data;
};

// Suscribirse a inserciones en tiempo real
export const subscribeMensajes = (onInsert, filter = {}) => {
  // filter: { user_id?: string } opcional
  const channel = supabase.channel("mensajes-realtime");

  channel.on(
    "postgres_changes",
    {
      event: "INSERT",
      schema: "public",
      table: "mensajes",
    },
    (payload) => {
      const row = payload.new;
      if (filter.user_id && row.user_id !== filter.user_id) return;
      onInsert(row);
    }
  );

  channel.subscribe((status) => {
    // opcional: console.log(status)
  });

  return () => {
    supabase.removeChannel(channel);
  };
};

// Enviar mensaje como admin a un usuario específico (requiere columna sender_id con default auth.uid())
export const enviarMensajeAUsuario = async (userId, contenido) => {
  const { data, error } = await supabase
    .from("mensajes")
    .insert([{ user_id: userId, contenido }])
    .select("*")
    .single();
  if (error) throw error;
  return data;
};

// Listar conversaciones (usuarios) con último mensaje
export const getConversaciones = async () => {
  // Obtiene usuarios distintos desde mensajes y el último id por user_id
  const { data, error } = await supabase
    .from("mensajes")
    .select("user_id, id, contenido")
    .order("id", { ascending: false });
  if (error) throw error;
  const map = new Map();
  for (const m of data) {
    if (!map.has(m.user_id)) map.set(m.user_id, m);
  }
  return Array.from(map.values());
};

export const getMensajesPorUsuario = async (userId) => {
  return getMensajesUsuario(userId);
};

// Obtener el nombre del usuario desde la tabla perfiles/usuarios
export const getUsuarioNombre = async (userId) => {
  const { data, error } = await supabase
    .from('usuarios')
    .select('nombre')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data?.nombre || '';
}
