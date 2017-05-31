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
                
                config.b1_cdunieco = config.cdunieco || '';
                config.b1_cdramo   = config.cdramo || '';
                config.b1_estado   = config.estado || '';
                config.b1_nmpoliza = config.nmpoliza || '';
                config.b1_nmsuplem = config.nmsuplem || '';
                
            } catch (e) {
                Ice.generaExcepcion(e, paso);
            }
        me.callParent(arguments);
    },
    
    
    // configuracion del componente (no EXT)
    config: {
        // datos para ubicar uso del componente
        modulo: null,
        flujo: null,
        cdtipsit: null,
        
        // llave de BD
        b1_cdunieco: null,
        b1_cdramo: null,
        b1_estado: null,
        b1_nmpoliza: null,
        b1_nmsuplem: null,
        
        // variables para valores por defecto (fijos y variables)
        procesandoValoresDefecto: false,
        datosFijosNuevos: true,
        datosVariablesNuevos: true,
        camposDisparanValoresDefectoFijos: [
            'b1_cdunieco'
        ],
        camposDisparanValoresDefectoVariables: [
            'b1_cdunieco', 'b1_nmpoliza', 'b1_feefecto', 'b1_feproren'
        ],
        
        // otro
        swcolind: 'I'
    },
    
    
    // configuracion ext
    // para el responsive small-(%) big-(%)
    layout: 'responsivecolumn',
    
    modelValidation: true,
    
    scrollable: true,
    
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

            
            // creando modelo para validaciones
            var modelName = Ext.id();
            Ext.define(modelName, {
                extend: 'Ext.data.Model',
                fields: comps.BLOQUE_DATOS_GENERALES.FORMULARIO.fields,
                validators: comps.BLOQUE_DATOS_GENERALES.FORMULARIO.validators
            });
            
            
            // agregar items, y agregar modelo para el modelValidation
            Ext.apply(me, {
                items: comps.BLOQUE_DATOS_GENERALES.FORMULARIO.items,
                modelo: modelName
            });
            
            
            // construir componente
            me.callParent(arguments);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    }
});