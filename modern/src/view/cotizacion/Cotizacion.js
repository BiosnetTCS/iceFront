/**
 * Created by jtezva on 5/10/2017.
 */
Ext.define('Ice.view.cotizacion.Cotizacion', {
    extend: 'Ext.Container',
    xtype: 'cotizacion',
    
    requires: [
        'Ext.field.Text'
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
    cls: 'dashboard',
    scrollable: true,
    
    
    // propiedades no ext (se generan getters y setters)
    config: {
        cdramo: null,
        cdtipsit: null
    },
    
    
    // configuracion que usa parametros (config ya se encuentra copiada en this)
    initialize: function () {
        Ice.log('Ice.view.cotizacion.Cotizacion.initialize');
        var me = this,
            paso = 'Configurando componente de cotizaci\u00f3n';
        try {
            // recuperar componentes
            var componentes = Ice.generaComponentes();
            
            
            // aplicar componentes
            me.add({
                xtype: 'mpolizas',
                
                cdunieco: me.config.cdunieco || '',
                cdramo: me.config.cdramo || '',
                cdtipsit: me.config.cdtipsit || '',
                estado: me.config.estado || '',
                nmpoliza: me.config.nmpoliza || '',
                nmsuplem: me.config.nmsuplem || 0,
                flujo: me.config.flujo || {},
                
                userCls: 'big-100 small-100 dashboard-item shadow',
                
                items: [
                    {
                        xtype: 'toolbar',
                        docked: 'bottom',
                        items: [{
                            text: 'Log values',
                            iconCls: 'x-fa fa-bug',
                            handler: 'logValues'
                        }]
                    }
                ]
            });
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});
