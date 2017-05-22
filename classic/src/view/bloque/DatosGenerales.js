/**
 * Created by jtezva on 5/22/2017.
 */
Ext.define('Ice.view.bloque.DatosGenerales', {
    extend: 'Ext.form.Panel',
    xtype: 'bloquedatosgenerales',
    
    controller: 'bloquedatosgenerales',
    viewModel: 'bloquedatosgenerales',
    
    requires: [],
    
    
    // validacion de parametros de entrada
    constructor: function (config) {
        Ice.log('Ice.view.bloque.DatosGenerales.constructor config:', config);
        var me = this,
            paso = 'Validando construcci\u00f3n de bloque de datos generales';
            try {
                if (!config) {
                    throw 'No hay datos para bloque de datos generales';
                }
                
                if (!config.cdramo || !config.cdtipsit) {
                    throw 'Falta ramo y tipo de situaci\u00f3n para bloque de datos generales';
                }
                
                config.modulo = config.modulo || 'COTIZACION';
                
            } catch (e) {
                Ice.generaExcepcion(e, paso);
            }
        me.callParent(arguments);
    },
    
    
    // configuracion del componente (no EXT)
    config: {},
    
    
    // configuracio ext
    title: 'Datos generales',
    
    // para el responsive small-(%) big-(%)
    layout: 'responsivecolumn',
    
    bodyPadding: '10px 0px 0px 10px',
    defaults: {
        margin: '0px 10px 10px 0px',
        cls: 'big-50 small-100'
    },
    
    buttons: [{
        text: 'Cargar',
        iconCls: 'x-fa fa-download',
        handler: 'onCargarClic'
    }],
    
    // contruccion usando metodos ext y parametros de entrada
    initComponent: function () {
        Ice.log('Ice.view.bloque.DatosGenerales.initComponent');
        var me = this,
            paso = 'Construyendo bloque de datos generales';
        try {
            var comps = Ice.generaComponentes({
                pantalla: 'BLOQUE_DATOS_GENERALES',
                seccion: 'FORMULARIO',
                modulo: me.modulo || '',
                estatus: (me.flujo && me.flujo.estatus) || '',
                cdramo: me.cdramo || '',
                cdtipsit: me.cdtipsit ||'',
                auxKey: me.auxkey || '',
                
                items: true
            });
            Ice.log('Ice.view.bloque.DatosGenerales.initComponent comps:', comps);
            
            Ext.apply(me, {
                items: comps.BLOQUE_DATOS_GENERALES.FORMULARIO.items
            });
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        
        
        // construir componente
        me.callParent(arguments);
        
        
        // comportamiento
        paso = '';
        try {
            me.getController().custom();
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    }
    
});