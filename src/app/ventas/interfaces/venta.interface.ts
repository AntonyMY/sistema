export enum IAling {
    center = 'center',
    left = 'left',
    right = 'right',
}

export enum ITipo {
    string = 'string',
    number = 'number',
    date = 'date',
}

export interface IHeader{
    field:string,
    header:string,
    tipo:string,
    align?:string,
    alignHead?:string,
    calcula?(campo:any):any
    _class?:string,
}

export interface IVenta {
    alma: string
    documento: string
    ser_doc:string
    docRef: string //CGR No defin
    fecha: string
    venc: string // fecha de vencimiento
    cliente: string
    abrev:string
    mone: string
    tip_camb: string
    subtotal: string
    igv: string
    exo: string
    total: string
    condicion: string
    cuenta: string
    mod: string
    tipodoc: string
    nser: string
    ndoc: string
    codclie: string
    estado: string
    webupload: string
    serg: string
    guia: string
    codmoda: string
    porcigv: number
    detalles: IVentaDetalle[]
    nped: string
    itemped: string
    nomcliente: string
    codvend: string
    nomvendedor: string
    fechaf: string    
    mtoigv: string
    dola: string
    nommoneda: string
    opci: string
    nomalma: string
    dias: string
    flet: string
    abrev2:string
    tipodoc2: string
    nser2: string
    ndoc2: string
    totalRef:string
    detalle: string
    codmoti: string
    fecreg: string
    usureg: string
    fecultmod: string
    usumod: string
    fecanula: string
    usuanula: string
    numreparto: string    
    redondeo: string
    tip_cli: string
    codzona: string
    codtransp: string
    codvehi: string
    codcond: string
    codrepartidor: string
    tomap_codped: string
    tomap_numped: string
    orden_compra: string
    codcta: string
    nomcta: string
    pago: string
    consignacion: string
    alma2: string
    tipodoc3: string
    nser3: string
    ndoc3: string
    estado_cpe: string
    mtoinafecto: string
    mtogratuito: string
    hash: string
    descri_estado_cpe: string
    estado_baja_cpe: string
    cod_rpta_cpe: string
    dcto_global: string
    total_perc: string
    total_afecto_perc: string
    cod_moti_nde: string
    tipope_sunat: string
    is_sendmail: string
    sfs_gen: string
    reg_perc: string
    fecha_emision: string
    orden_despacho: string
    orden_comp: string
    tipoimpu_vta: string
    tipo_vta: string
    vta_amaz: string
    exportacion: string
    fleteref_por_tm: string
    por_entregar: string
    tipo_servicio: string
    ope_suj_detrac: string
    total_afecto_detraccion: string
    monto_detraccion: string
    flet_refe: string
    porc_detrac: string
    num_cta_empre: string
    conf_vehi: string
    porc_perc: string
    anticipo: string
    tipodoca: string
    nsera: string
    ndoca: string
    mtoanti: string
    afecto_ivap: string
    monto_ivap: string
    porc_ivap: string
    valvta_ivap: string
    codmedpago: string
    cond_tipodoc: string
    cond_numdoc: string
    tipo_prec: string
    icbper: string
    mtoicbper: string
    devstk: string
    is_codezip: boolean
    is_codecdr: boolean
    cod_tipo_doc_ide: string // CGR  datos
    num_doc_ident: string  //CGR datos
    nom_tipo_doc_ide: string  //CGR datos
    devo:string
    formato_nd :string
}

export interface IVentaDetalle {
    codarti: string
    nomarti: string
    unidadm: string
    cant: string
    unid: string
    prec: string
    dsct1: string
    importe: string
    cjas: string
    cjae: string
    bote: string
    ubote: string
    bots: string
    ubots: string
    codcaja: string
    codbot: string
    nped: string
    tipodoc: string
    nser: string
    ndoc: string
    codprov: string
    item: string
    movi: string
    tipoimpu: string
    impuesto: string
    contenido: string
    cont_stk: string
    stock_cantidad_db: string
    dsct2: string
    codlinea: string
    stock_cantidad_vta: string
    st1: string
    st2: string
    no_suma: string
    consignacion: string
    alma: string
    tipo: string
    bonificacion: string
    precio_ref: string
    cod_unid1: string //Unidad de Medida SUNA
    peso: string
    porc_ivap: string
    detalle: string
    monto_ivap: string
    afecto_ivap: string
    codsunat: string
    icbper_unitario: string
    icbper_importe: string
    afecto_icbper: string
}