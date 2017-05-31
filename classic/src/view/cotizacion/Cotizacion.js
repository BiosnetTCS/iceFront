Ext.define('Ice.view.cotizacion.Cotizacion', {
    extend: 'Ext.container.Container',
    xtype: 'cotizacion',
    
    requires: [
        'Ext.ux.layout.ResponsiveColumn'
    ],
    
    
    // validacion y modificacion de parametros (config)
    constructor: function (config) {
        Ice.log('Ice.view.cotizacion.Cotizacion.constructor config:', config);
        var me = this,
            paso = 'Validando componente de cotizaci\u00f3n';
        try {
            if (!config.cdramo || !config.cdtipsit) {
                throw 'Falta cdramo o cdtipsit para componente de cotizaci\u00f3n';
            }
            
            config.modulo = config.modulo || 'COTIZACION';
            config.flujo = config.flujo || {};
            
            config.cdunieco = 1;
            config.estado = 'W';
            config.nmpoliza = 11075;
            config.nmsuplem = config.nmsuplem || 0;
            
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    },
    
    
    // configuracion que no usa parametros
    layout: 'responsivecolumn',
    defaultFocus: 'form',
    
    
    // propiedades no ext (se generan getters y setters)
    config: {
        // uso o funcionamiento
        modulo: null,
        flujo: null,
        cdtipsit: null,
    
        // llave
        cdunieco: null,
        cdramo: null,
        estado: null,
        nmpoliza: null,
        nmsuplem: null,
        
        // etapas
        nueva: true
    },
    
    
    // configuracion que usa parametros (config ya se encuentra copiada en this)
    initComponent: function () {
        Ice.log('Ice.view.cotizacion.Cotizacion.initComponent');
        var me = this,
            paso = 'Construyendo componente de cotizaci\u00f3n';
        try {
            // recuperar componentes
            var componentes = Ice.generaComponentes();
            
            
            // aplicar componentes
            Ext.apply(me, {
                items: [
                    {
                        xtype: 'bloquedatosgenerales',
                        
                        title: 'Datos generales',
                        maxHeight: 400,
                        
                        cdunieco: me.cdunieco || '',
                        cdramo: me.cdramo || '',
                        estado: me.estado || '',
                        nmpoliza: me.nmpoliza || '',
                        nmsuplem: me.nmsuplem || 0,
                        
                        modulo: me.modulo || '',
                        flujo: me.flujo || {},
                        cdtipsit: me.cdtipsit || ''
                    }, {
                        xtype: 'bloquesituacionesriesgo',
                        
                        title: 'Riesgo',
                        maxHeight: 400,
                        
                        cdunieco: me.cdunieco || '',
                        cdramo: me.cdramo || '',
                        estado: me.estado || '',
                        nmpoliza: me.nmpoliza || '',
                        nmsuplem: me.nmsuplem || 0,
                        
                        modulo: me.modulo || '',
                        flujo: me.flujo || {},
                        cdtipsit: me.cdtipsit || ''
                    }, {
                        xtype: 'bloquecoberturas',
                        
                        title: 'Coberturas',
                        maxHeight: 400,
                        
                        cdunieco: me.cdunieco || '',
                        cdramo: me.cdramo || '',
                        estado: me.estado || '',
                        nmpoliza: me.nmpoliza || '',
                        nmsuplem: me.nmsuplem || 0,
                        
                        modulo: me.modulo || '',
                        flujo: me.flujo || {},
                        cdtipsit: me.cdtipsit || ''
                    }
                ]
            });
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});
