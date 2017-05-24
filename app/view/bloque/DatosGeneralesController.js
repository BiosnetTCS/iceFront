/**
 * Created by jtezva on 5/22/2017.
 */
Ext.define('Ice.view.bloque.DatosGeneralesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bloquedatosgenerales',
    
    constructor: function (config) {
        Ice.log('Ice.view.bloque.DatosGeneralesController.constructor config:', config);
        this.callParent(arguments);
    },
    
    init: function (view) {
        Ice.log('Ice.view.bloque.DatosGeneralesController.init view:', view);
        var me = this,
            paso = 'Iniciando controlador de bloque de datos generales';
        try {
            me.callParent(arguments);
            
            // esperamos a que se cree el modelo antes de invocar custom
            Ext.defer(function () {
                var paso2;
                try {
                    paso2 = 'Definiendo comportamiento de bloque de datos generales';
                    me.custom();
                    
                    paso2 = 'Cargando bloque de datos generales';
                    me.cargar();
                } catch (e) {
                    Ice.manejaExcepcion(e, paso2);
                }
            }, 200);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
    custom: function () {
        Ice.log('Ice.view.bloque.DatosGeneralesController.custom');
        var me = this,
            view = me.getView(),
            paso = 'Configurando comportamiento de bloque de datos generales';
        try {
            var refs = view.getReferences() || {},
                feefecto = refs.feefecto,
                feproren = refs.feproren,
                cdramo = refs.cdramo;
            Ice.log('Ice.view.bloque.DatosGeneralesController refs:', refs);
            
            // al seleccionar fecha de inicio poner fecha de fin
            if (feefecto && feproren) {
                feefecto.on({
                    change: function (me, value) {
                        var paso = 'Calculando fin de vigencia';
                        try {
                            feproren.setValue(Ext.Date.add(value, Ext.Date.YEAR, 1));
                        } catch (e) {
                            Ice.logWarn(paso, e);
                        }
                    }
                });
            }
            if (feefecto) {
                feefecto.setValue(new Date());
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('/Ice.view.bloque.DatosGeneralesController.custom');
    },
    
    onCargarClic: function (button) {
        this.cargar();
    },
    
    cargar: function (config) {
        Ice.log('Ice.view.bloque.DatosGeneralesController.cargar config:', config);
        var me = this,
            view = me.getView(),
            paso = 'Cargando bloque de datos generales';
        try {
            Ice.suspendEvents(view);
            Ice.request({
                mascara: 'Recuperando datos generales',
                url: Ice.url.bloque.datosGenerales.cargar,
                params: {
                    'params.cdunieco': view.cdunieco || '',
                    'params.cdramo': view.cdramo || '',
                    'params.estado': view.estado || '',
                    'params.nmpoliza': view.nmpoliza || '',
                    'params.nmsuplem': view.nmsuplem || 0
                },
                success: function (json) {
                    var paso2 = 'Seteando valores';
                    try {
                        var refs = view.getReferences();
                        for (var att in json.params) {
                            if (refs[att]) {
                                refs[att].setValue(json.params[att]);
                            }
                        }
                        Ice.resumeEvents(view);
                    } catch (e) {
                        Ice.manejaExcepcion(e, paso2);
                    }
                },
                failure: function () {
                    Ice.resumeEvents(view);
                }
            });
        } catch (e) {
            Ice.resumeEvents(view);
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    onGuardarClic: function () {
        this.guardar();
    },
    
    guardar: function (params) {
        Ice.log('Ice.view.bloque.DatosGeneralesController.guardar args:', arguments);
        var me = this,
            view = me.getView(),
            paso = 'Validando datos generales';
        try {
//            VALIDAR CON UN MODELO DINAMICO
//            SIN USAR EL DATA BINDING
//            paso = 'Construyendo modelo de validaci\u00f3n';
//            var modelName = Ext.id('DatosGeneralesModel');
//            Ice.log('modelName:', modelName);
//            
//            Ext.define(modelName, {
//                extend: 'Ext.data.Model',
//                fields: view.modelFields,
//                validators: view.modelValidators
//            });
//            paso = 'Validando datos';
//            var instancia = Ext.create(modelName, view.getValues());
//            Ice.log('instancia:', instancia);          
//            var errores = instancia.getValidation();
//            Ice.log('errores:', errores);
            paso = 'Guardando datos generales';
            var mask = Ice.mask(paso);
            view.submit({
                url: Ice.url.bloque.datosGenerales.guardar,
                success: function (form, action) {
                    Ice.log('datosGenerales.guardar success action:', action);
                    mask.close();
                },
                failure: function (form, action) {
                    Ice.log('datosGenerales.guardar failure action:', action);
                    mask.close();
                    switch (action.failureType) {
                        case Ext.form.Action.CLIENT_INVALID:
                            Ice.mensajeWarning('Favor de revisar los datos');
                            break;
                        case Ext.form.Action.CONNECT_FAILURE:
                            Ice.mensajeError('Error de red al guardar datos generales');
                            break;
                        case Ext.form.Action.SERVER_INVALID:
                            if (action.result.message) {
                                Ice.mensajeError(action.result.message);
                            }
                            break;
                        //case Ext.form.Action.LOAD_FAILURE: solo para cargar, no para guardar
                        //    break;
                        
                    }
                }
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    }
});