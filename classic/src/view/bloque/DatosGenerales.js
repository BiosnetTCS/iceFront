/**
 * Created by jtezva on 5/22/2017.
 */
Ext.define('Ice.view.bloque.DatosGenerales', {
    extend: 'Ext.form.Panel',
    xtype: 'bloquedatosgenerales',
    
    controller: 'bloquedatosgenerales',
    viewModel: 'bloquedatosgenerales',
    
    requires: [
        'Ext.ux.layout.ResponsiveColumn'
    ],
    
    
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
    
    
    // configuracion ext
    title: 'Datos generales',
    
    // para el responsive small-(%) big-(%)
    layout: 'responsivecolumn',
    
    modelValidation: true,
    
    bodyPadding: '10px 0px 0px 10px',
    defaults: {
        margin: '0px 10px 10px 0px',
        cls: 'big-50 small-100'
    },
    
    buttons: [
        {
            text: 'Cargar',
            iconCls: 'x-fa fa-download',
            handler: 'onCargarClic'
        }, {
            text: 'Guardar',
            iconCls: 'x-fa fa-save',
            handler: 'onGuardarClic'
        }
    ],
    
    // configuracion que usa datos de entrada
    initComponent: function () {
        Ice.log('Ice.view.bloque.DatosGenerales.initComponent');
        var me = this,
            paso = 'Construyendo bloque de datos generales';
        try {
            // generar componentes
            var comps = Ice.generaComponentes({
                pantalla: 'BLOQUE_DATOS_GENERALES',
                seccion: 'FORMULARIO',
                modulo: me.modulo || '',
                estatus: (me.flujo && me.flujo.estatus) || '',
                cdramo: me.cdramo || '',
                cdtipsit: me.cdtipsit ||'',
                auxKey: me.auxkey || '',
                
                items: true,
                fields: true,
                validators: true
            });
            Ice.log('Ice.view.bloque.DatosGenerales.initComponent comps:', comps);
            
            
            // agregar binding a los componentes
            for (var i = 0; i < comps.BLOQUE_DATOS_GENERALES.FORMULARIO.items.length; i++) {
                var item = comps.BLOQUE_DATOS_GENERALES.FORMULARIO.items[i];
                item.bind = '{datos.' + item.name + '}';
            }
            Ice.log('items con bind:', comps.BLOQUE_DATOS_GENERALES.FORMULARIO.items);

            
            // agregar items, y agregar fields y validators para viewmodel
            Ext.apply(me, {
                items: comps.BLOQUE_DATOS_GENERALES.FORMULARIO.items,
                modelFields: comps.BLOQUE_DATOS_GENERALES.FORMULARIO.fields,
                modelValidators: comps.BLOQUE_DATOS_GENERALES.FORMULARIO.validators
            });
            
            
            // construir componente
            me.callParent(arguments);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    }
});