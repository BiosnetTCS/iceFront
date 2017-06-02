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
            view = me.getView(),
            paso = 'Iniciando controlador de bloque de datos generales';
        try {
            me.callParent(arguments);
            
            // esperamos a que se cree el viewmodel antes de invocar custom
            Ext.defer(function () {
                var paso2;
                try {
                    paso2 = 'Definiendo comportamiento de bloque de datos generales';
                    me.custom();
                    
                    if (view.cdunieco && view.cdramo && view.estado && view.nmpoliza
                        && !Ext.isEmpty(view.nmsuplem) && view.modulo) {
                        paso2 = 'Cargando bloque de datos generales';
                        me.cargar();
                    }
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
            //if (refs.b1_feefecto) {
            //    refs.b1_feefecto.setValue(new Date());
            //}
            
            
            // agregar disparadores valores defecto fijos
            for (var i = 0; i < view.getCamposDisparanValoresDefectoFijos().length; i++) {
                var name = view.getCamposDisparanValoresDefectoFijos()[i];
                if (refs[name]) {
                    refs[name].setFieldStyle('border-left: 1px solid yellow;');
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
                    refs[name].setFieldStyle('border-right: 1px solid blue;');
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
            
            var errores = me.obtenerErrores(),
                viewValues = view.getValues(),
                valores = {
                    'params.b1_cdramo': view.cdramo,
                    'params.b1_nmsuplem': view.nmsuplem || '0',
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
                        
                        view.estado = action.params.b1_estado;
                        view.nmpoliza = action.params.b1_nmpoliza;
                        
                        Ice.suspendEvents(view);
                        for (var att in action.params) {
                            if (refs[att] && !refs[att].getValue()) {
                                refs[att].setValue(action.params[att]);
                            }
                        }
                        Ice.resumeEvents(view);
                        
                        //me.cargarValoresDefectoVariables();
                        // no permitir modificar la llave
                        for (var i = 0; i < view.camposDisparanValoresDefectoFijos.length; i++) {
                            var name = view.camposDisparanValoresDefectoFijos[i];
                            if (refs[name]) {
                                refs[name].setReadOnly(true);
                            }
                        }
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
            
            var errores = me.obtenerErrores(),
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
            valores['params.b1_cdramo'] = view.cdramo;
            valores['params.b1_estado'] = view.estado;
            
            view.procesandoValoresDefecto = true;
            accedeProcesar = true;
            
            if (!valores['params.b1_nmpoliza']) {
                valores['params.b1_nmpoliza'] = view.nmpoliza;
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
                            if (refs[att] && !refs[att].getValue()) {
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
                    'params.cdunieco': view.cdunieco || '',
                    'params.cdramo': view.cdramo || '',
                    'params.estado': view.estado || '',
                    'params.nmpoliza': view.nmpoliza || '',
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
                        
                        // no permitir modificar la llave
                        for (var i = 0; i < view.camposDisparanValoresDefectoFijos.length; i++) {
                            var name = view.camposDisparanValoresDefectoFijos[i];
                            if (refs[name]) {
                                refs[name].setReadOnly(true);
                            }
                        }
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
    
    
    /**
     * Guarda el formulario.
     * Primero valida contra un modelo, construido con view.modelFields y view.modelValidators.
     * Solo valida campos visibles.
     *
     * @param params (object, opcional):
     * {
     *     success (function, opcional) funcion a ejecutar si se guardan bien los datos ,
     *     failure (function, opcional) funcion a ejecutar si hay algun error
     * }
     */
    guardar: function (params) {
        Ice.log('Ice.view.bloque.DatosGeneralesController.guardar args:', arguments);
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Validando datos generales';
        try {
            var valido = me.validarDatos();
            
            if (valido !== true) {
                throw 'Favor de revisar los datos';
            }
            
            paso = 'Guardando datos generales';
            Ice.request({
                mascara: paso,
                url: Ice.url.bloque.datosGenerales.guardar,
                params: Ice.convertirAParams(view.getValues()),
                success: function (action) {
                    var paso2 = 'Ejecutando acci\u00f3n posterior al guardado';
                    try {
                        if (action.list && action.list.length > 0) {
                            Ext.create('Ice.view.bloque.VentanaValidaciones', {
                                lista: action.list
                            }).mostrar();
                            
                            var error = false;
                            for (var i = 0; i < action.list.length; i++) {
                                if (action.list[i].tipo.toLowerCase() === 'error') {
                                    //error = true;
                                    break;
                                }
                            }
                            if (error === true) {
                                throw 'Favor de revisar las validaciones';
                            }
                        }
                        if (params && params.success) {
                            paso2 = 'Ejecutando proceso posterior al guardado de datos generales';
                            params.success();
                        } else {
                            Ice.mensajeCorrecto('Datos guardados');
                        }
                    } catch (e) {
                        Ice.manejaExcepcion(e, paso2);
                        if (params && params.failure) {
                            var paso2 = 'Invocando callback failure al guardar datos generales';
                            try {
                                params.failure();
                            } catch (e) {
                                Ice.manejaExcepcion(e, paso2);
                            }
                        }
                    }
                },
                failure: (params && params.failure) || null
            });
            
            /*
            var mask = Ice.mask(paso);
            view.submit({
                url: ,
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
            */
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
            if (params && params.failure) {
                var paso2 = 'Invocando callback failure al guardar datos generales';
                try {
                    params.failure();
                } catch (e) {
                    Ice.manejaExcepcion(e, paso2);
                }
            }
        }
    },
    
    
    onLimpiarClic: function () {
        this.limpiar();
    },
    
    
    limpiar: function () {
        Ice.log('Ice.view.bloque.DatosGeneralesController.limpiar');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = "Limpiando bloque de datos generales";
        try {
            Ice.suspendEvents(view);
            view.reset();
            view.datosFijosNuevos = true;
            view.datosVariablesNuevos = true;
            view.cdunieco = null;
            view.nmpoliza = null;
            view.nmsuplem = 0;
            Ice.resumeEvents(view);
            
            
            // permitir modificar la llave
            for (var i = 0; i < view.camposDisparanValoresDefectoFijos.length; i++) {
                var name = view.camposDisparanValoresDefectoFijos[i];
                if (refs[name]) {
                    refs[name].setReadOnly(false);
                }
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
    
    obtenerErrores: function () {
        Ice.log('Ice.view.bloque.DatosGeneralesController.obtenerErrores');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Recuperando errores de formulario',
            errores = {};
        try {
            // validar con un modelo dinamico
            // sin usar el data binding
            paso = 'Construyendo modelo de validaci\u00f3n';
            var validators = {}, ref;
            for (var att in refs) {
                ref = refs[att];
                if (ref.isHidden() !== true && view.modelValidators[ref.name]) { // solo para no ocultos
                    validators[ref.name] = view.modelValidators[ref.name];
                }
            }
            Ice.log('Ice.view.bloque.DatosGeneralesController.obtenerErrores validators:', validators);
            
            var modelName = Ext.id();
            Ext.define(modelName, {
                extend: 'Ext.data.Model',
                fields: view.modelFields,
                validators: validators
            });
            
            paso = 'Validando datos';
            errores = Ext.create(modelName, view.getValues()).getValidation().getData();
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        return errores;
    },
    
    /**
     * Valida los datos visibles del formulario
     * @return boolean valido
     */
    validarDatos: function () {
        Ice.log('Ice.view.bloque.DatosGeneralesController.validarDatos');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Validando datos generales visibles',
            valido = false;
        try {
            var errores = me.obtenerErrores();
            
            var sinErrores = true;
            Ext.suspendLayouts();
            for (var name in errores) {
                if (errores[name] !== true) {
                    sinErrores = false;
                    Ice.log('buscando para montar error:', name);
                    view.down('[name=' + name + ']').setActiveError(errores[name]);
                }
            }
            Ext.resumeLayouts();
            
            valido = sinErrores === true;
        } catch (e) {
            Utils.generaExcepcion(e, paso);
        }
        return valido;
    },
});