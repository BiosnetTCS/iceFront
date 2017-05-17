Ext.define('Ice.view.cotizacion.Cotizacion', {
    extend: 'Ext.container.Container',
    xtype: 'cotizacion',
    
    requires: [
        'Ext.ux.layout.ResponsiveColumn',
        'Ext.picker.Date'
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
        cdramo: null,
        cdtipsit: null
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
                        xtype: 'mpolizas',
                        cdunieco: me.config.cdunieco || '',
                        cdramo: me.config.cdramo || '',
                        cdtipsit: me.config.cdtipsit || '',
                        estado: me.config.estado || '',
                        nmpoliza: me.config.nmpoliza || '',
                        nmsuplem: me.config.nmsuplem || 0,
                        flujo: me.config.flujo || {},
                        buttons: [
                            {
                                text: 'Log values',
                                iconCls: 'x-fa fa-bug',
                                handler: 'logValues'
                            }
                        ]
                    }, {
                        xtype: 'datepicker'
                    }
                ]
            });
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});
