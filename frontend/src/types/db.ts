export interface usuario {
    id:string,
    nombre: string,
    rol: 'administrador' | 'usuario',
}

export interface EquipoComputo {
    id: string,
    codigo_equipo: string
    nombre_equipo:string
    marca_equipo: string
    estado: boolean
}