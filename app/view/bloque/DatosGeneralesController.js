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
            
            // esperamos a que se cree el viewmodel antes de invocar custom
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
            var refs = view.getReferences() || {};
            Ice.log('Ice.view.bloque.DatosGeneralesController refs:', refs);
            
            
            // al seleccionar fecha de inicio poner fecha de fin
            if (refs.b1_feefecto && refs.b1_feproren) {
                refs.b1_feefecto.on({
                    change: function (me, value) {
                        var paso = 'Calculando fin de vigencia';
                        try {
                            refs.b1_feproren.setValue(Ext.Date.add(value, Ext.Date.YEAR, 1));
                        } catch (e) {
                            Ice.logWarn(paso, e);
                        }
                    }
                });
            }
            if (refs.b1_feefecto) {
                refs.b1_feefecto.setValue(new Date());
            }
            
            
            // agregar disparadores valores defecto fijos
            for (var i = 0; i < view.getCamposDisparanValoresDefectoFijos().length; i++) {
                var name = view.getCamposDisparanValoresDefectoFijos()[i];
                if (refs[name]) {
                    refs[name].setFieldStyle('border-left: 3px solid yellow;');
                    refs[name].on({
                        blur: function () {
                            me.cargarValoresDefectoFijos();
                        }
                    });
                }
            }
            
            
            // agregar disparadores valores defecto variables
            for (var i = 0; i < view.getCamposDisparanValoresDefectoVariables().length; i++) {
                var name = view.getCamposDisparanValoresDefectoVariables()[i];
                if (refs[name]) {
                    refs[name].setFieldStyle('border-right: 3px solid blue;');
                    refs[name].on({
                        blur: function (ref) {
                            me.cargarValoresDefectoVariables(ref);
                        }
                    });
                }
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
    
    /*
     * Agrega los valores por defecto de MPOLIZAS al formulario, tambien estado y nmpoliza
     * Solo lo hace si todos los campos de view.camposDisparanValoresDefectoFijos son validos
     * y si view.datosFijosNuevos es true
     */
    cargarValoresDefectoFijos: function () {
        Ice.log('Ice.view.bloque.DatosGeneralesController.cargarValoresDefectoFijos');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            accedeProcesar = false;
        var paso = 'Cargando valores por defecto fijos de datos generales';
        try {
            if (view.getDatosFijosNuevos() !== true) {
                Ice.logWarn('Ice.view.bloque.DatosGeneralesController.cargarValoresDefectoFijos los datos fijos no son nuevos');
                return;
            }
            
            if (view.procesandoValoresDefecto === true) {
                Ice.logWarn('Ice.view.bloque.DatosGeneralesController.cargarValoresDefectoFijos valores defecto ya en proceso');
                return;
            }
            
            var errores = Ext.create(view.modelo, view.getValues()).getValidation().getData(),
                viewValues = view.getValues(),
                valores = {
                    'params.b1_cdramo': view.b1_cdramo,
                    'params.b1_nmsuplem': view.b1_nmsuplem || '0',
                    'params.swcolind': view.swcolind
                };
            
            for (var i = 0; i < view.getCamposDisparanValoresDefectoFijos().length; i++) {
                var name = view.getCamposDisparanValoresDefectoFijos()[i];
                if (refs[name] && errores[name] !== true) {
                    Ice.logWarn('Ice.view.bloque.DatosGeneralesController.cargarValoresDefectoFijos invalido <', name, ':', errores[name], '>');
                    return;
                }
                valores['params.' + name] = viewValues[name];
            }
            
            view.procesandoValoresDefecto = true;
            accedeProcesar = true;
            
            Ice.request({
                mascara: 'Cargando valores por defecto',
                url: Ice.url.bloque.datosGenerales.valoresDefectoFijos,
                params: valores,
                success: function (action) {
                    var paso2 = 'Seteando valores por defecto';
                    try {
                        view.setDatosFijosNuevos(false);
                        view.procesandoValoresDefecto = false;
                        
                        if (!action.params) {
                            throw 'No se cargaron datos';
                        }
                        
                        if (!action.params.b1_estado) {
                            throw 'No se gener\u00f3 el estado';
                        }
                        
                        if (!action.params.b1_nmpoliza) {
                            throw 'No se gener\u00f3 el n\u00famero cotizaci\u00f3n';
                        }
                        
                        view.b1_estado = action.params.b1_estado;
                        view.b1_nmpoliza = action.params.b1_nmpoliza;
                        
                        Ice.suspendEvents(view);
                        for (var att in action.params) {
                            if (refs[att]) {
                                refs[att].setValue(action.params[att]);
                            }
                        }
                        Ice.resumeEvents(view);
                        
                        //me.cargarValoresDefectoVariables();
                    } catch (e) {
                        view.procesandoValoresDefecto = false;
                        Ice.manejaExcepcion(e, paso2);
                    }
                },
                failure: function () {
                    view.procesandoValoresDefecto = false;
                }
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
            if (accedeProcesar === true) {
                view.procesandoValoresDefecto = false;
            }
        }
    },
    
    cargarValoresDefectoVariables: function (ref) {
        Ice.log('Ice.view.bloque.DatosGeneralesController.cargarValoresDefectoVariables ref:', ref);
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            accedeProcesar = false;
        var paso = 'Cargando valores por defecto variables de datos generales';
        try {
            if (view.getDatosVariablesNuevos() !== true) {
                Ice.logWarn('Ice.view.bloque.DatosGeneralesController.cargarValoresDefectoVariables los datos variables no son nuevos');
                return;
            }
            
            if (!view.estado) {
                Ice.logWarn('Ice.view.bloque.DatosGeneralesController.cargarValoresDefectoVariables view no tiene view.estado');
                return;
            }
            
            if (!view.nmpoliza) {
                Ice.logWarn('Ice.view.bloque.DatosGeneralesController.cargarValoresDefectoVariables view no tiene view.nmpoliza');
                return;
            }
            
            if (view.procesandoValoresDefecto === true) {
                Ice.logWarn('Ice.view.bloque.DatosGeneralesController.cargarValoresDefectoVariables valores defecto ya en proceso');
                return;
            }
            
            var errores = Ext.create(view.modelo, view.getValues()).getValidation().getData(),
                viewValues = view.getValues(),
                valores = {};
            
            for (var i = 0; i < view.getCamposDisparanValoresDefectoVariables().length; i++) {
                var name = view.getCamposDisparanValoresDefectoVariables()[i];
                if (refs[name] && errores[name] !== true) {
                    Ice.logWarn('Ice.view.bloque.DatosGeneralesController.cargarValoresDefectoVariables invalido <', name, ':', errores[name], '>');
                    return;
                }
            }
            
            for (var att in viewValues) {
                valores['params.' + att] = viewValues[att];
            }
            valores['params.b1_cdramo'] = view.b1_cdramo;
            valores['params.b1_estado'] = view.b1_estado;
            
            view.procesandoValoresDefecto = true;
            accedeProcesar = true;
            
            if (!valores['params.b1_nmpoliza']) {
                valores['params.b1_nmpoliza'] = view.b1_nmpoliza;
            }
            
            Ice.request({
                mascara: 'Cargando valores por defecto',
                url: Ice.url.bloque.datosGenerales.valoresDefectoVariables,
                params: valores,
                success: function (action) {
                    var paso2 = 'Seteando valores por defecto';
                    try {
                        view.setDatosVariablesNuevos(false);
                        view.procesandoValoresDefecto = false;
                        
                        if (!action.params) {
                            return;
                        }
                        
                        Ice.suspendEvents(view);
                        for (var att in action.params) {
                            if (refs[att]) {
                                refs[att].setValue(action.params[att]);
                            }
                        }
                        Ice.resumeEvents(view);
                    } catch (e) {
                        view.procesandoValoresDefecto = false;
                        Ice.manejaExcepcion(e, paso2);
                    }
                },
                failure: function () {
                    view.procesandoValoresDefecto = false;
                }
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
            if (accedeProcesar === true) {
                view.procesandoValoresDefecto = false;
            }
        }
    },
    
    onCargarClic: function (button) {
        this.cargar();
    },
    
    
    /*
     * Carga los datos generales
     * @param config (object, opcional): {
     *     callback: (function, opcional)
     * }
     */
    cargar: function (config) {
        Ice.log('Ice.view.bloque.DatosGeneralesController.cargar config:', config);
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Cargando bloque de datos generales';
        try {
            Ice.request({
                mascara: 'Recuperando datos generales',
                url: Ice.url.bloque.datosGenerales.cargar,
                params: {
                    'params.cdunieco': (refs && refs.cdunieco && refs.cdunieco.getValue()) || view.cdunieco || '',
                    'params.cdramo': view.cdramo || '',
                    'params.estado': view.estado || '',
                    'params.nmpoliza': (refs && refs.cdramo && refs.cdramo.getValue()) || view.nmpoliza || '',
                    'params.nmsuplem': view.nmsuplem || 0,
                    'params.swcolind': view.swcolind || 'I'
                },
                success: function (json) {
                    var paso2 = 'Seteando valores';
                    try {
                        view.datosFijosNuevos = false;
                        view.datosVariablesNuevos = false;
                        
                        Ice.suspendEvents(view);
                        
                        view.reset();
                        
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
    },
    
    
    onLimpiarClic: function () {
        this.limpiar();
    },
    
    
    limpiar: function () {
        Ice.log('Ice.view.bloque.DatosGeneralesController.limpiar');
        var me = this,
            view = me.getView(),
            paso = "Limpiando bloque de datos generales";
        try {
            Ice.suspendEvents(view);
            view.reset();
            view.datosFijosNuevos = true;
            view.datosVariablesNuevos = true;
            Ice.resumeEvents(view);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    }
});