var Ice = Object.assign(Ice || {}, {

    logActivo: true,
    
    
    /*
     * Urls del sistema por modulos 
     */
     url: {
         
         // coreLocal
         core: {
             recuperarComponentes: 'jsonLocal/recuperarComponentes.json',
             login:                'jsonLocal/login.json',
             recuperarRoles:       'jsonLocal/getRoles.json',
             seleccionaRol:        'jsonLocal/seleccionaRol.json',
             logout:               'jsonLocal/logout.json',
             recuperarDatosSesion: 'jsonLocal/recuperarDatosSesion.json',
             recuperarMenus:       'jsonLocal/getMenus.json'
         },
         
         // corePhp
         corePhp: {
             recuperarComponentes: 'http://10.142.79.136/icePhp/recuperarComponentes.php',
             login:                'http://10.142.79.136/icePhp/login.php',
             recuperarRoles:       'http://10.142.79.136/icePhp/getRoles.php',
             seleccionaRol:        'http://10.142.79.136/icePhp/seleccionaRol.php',
             logout:               'http://10.142.79.136/icePhp/logout.php',
             recuperarDatosSesion: 'http://10.142.79.136/icePhp/recuperarDatosSesion.php',
             recuperarMenus:       'http://10.142.79.136/icePhp/getMenus.php'
         },
         
         // URLs del core
         core2: {
             recuperarComponentes: 'componentes/recuperarComponentes.action',
             login:                'authentication/validaUsuario.action',
             recuperarRoles:       'authentication/obtenerRoles.action',
             seleccionaRol:        'authentication/seleccionarRol.action',
             logout:               'authentication/logout.action',
             recuperarDatosSesion: 'authentication/obtenerDatosSesion.action',
             recuperarMenus:       'authentication/obtenerMenu.action'
         },
         
         // URLs de cotizacion
         cotizacion: {
         },
         
         // URLs de emision
         emision: {
         }
     },
    
    
    /*
     * Invoca console.log si Ice.logActivo === true
     */
    log: function () {
        if (Ice.logActivo === true && arguments.length > 0) {
            switch (arguments.length) {
                case 1:
                    console.log(arguments[0]);
                    break;
                case 2:
                    console.log(arguments[0], arguments[1]);
                    break;
                case 3:
                    console.log(arguments[0], arguments[1], arguments[2]);
                    break;
                case 4:
                    console.log(arguments[0], arguments[1], arguments[2], arguments[3]);
                    break;
                case 5:
                    console.log(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
                    break;
                case 6:
                    console.log(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4],
                        arguments[5]);
                    break;
                case 7:
                    console.log(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4],
                        arguments[5], arguments[6]);
                    break;
                case 8:
                    console.log(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4],
                        arguments[5], arguments[6], arguments[7]);
                    break;
                case 9:
                    console.log(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4],
                        arguments[5], arguments[6], arguments[7], arguments[8]);
                    break;
                default:
                    console.log(arguments);
                    break;
            }
        }
    },
    
    
    /*
     * Invoca console.warn si Ice.logActivo === true
     */
    logWarn: function () {
        if (Ice.logActivo === true && arguments.length > 0) {
            switch (arguments.length) {
                case 1:
                    console.warn('Warning!:', arguments[0]);
                    break;
                case 2:
                    console.warn('Warning!:', arguments[0], arguments[1]);
                    break;
                case 3:
                    console.warn('Warning!:', arguments[0], arguments[1], arguments[2]);
                    break;
                case 4:
                    console.warn('Warning!:', arguments[0], arguments[1], arguments[2], arguments[3]);
                    break;
                case 5:
                    console.warn('Warning!:', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
                    break;
                case 6:
                    console.warn('Warning!:', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4],
                        arguments[5]);
                    break;
                case 7:
                    console.warn('Warning!:', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4],
                        arguments[5], arguments[6]);
                    break;
                case 8:
                    console.warn('Warning!:', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4],
                        arguments[5], arguments[6], arguments[7]);
                    break;
                case 9:
                    console.warn('Warning!:', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4],
                        arguments[5], arguments[6], arguments[7], arguments[8]);
                    break;
                default:
                    console.warn('Warning!:', arguments);
                    break;
            }
        }
    },
    
    
    /*
     * Invoca console.error si Ice.logActivo === true
     */
    logError: function () {
        if (Ice.logActivo === true && arguments.length > 0) {
            switch (arguments.length) {
                case 1:
                    console.error('Error!: ', arguments[0]);
                    break;
                case 2:
                    console.error('Error!: ', arguments[0], arguments[1]);
                    break;
                case 3:
                    console.error('Error!: ', arguments[0], arguments[1], arguments[2]);
                    break;
                case 4:
                    console.error('Error!: ', arguments[0], arguments[1], arguments[2], arguments[3]);
                    break;
                case 5:
                    console.error('Error!: ', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
                    break;
                case 6:
                    console.error('Error!: ', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4],
                        arguments[5]);
                    break;
                case 7:
                    console.error('Error!: ', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4],
                        arguments[5], arguments[6]);
                    break;
                case 8:
                    console.error('Error!: ', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4],
                        arguments[5], arguments[6], arguments[7]);
                    break;
                case 9:
                    console.error('Error!: ', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4],
                        arguments[5], arguments[6], arguments[7], arguments[8]);
                    break;
                default:
                    console.error('Error!: ', arguments);
                    break;
            }
        }
    },
    
    
    /*
     * Imprime en consola una excepcion y manda aviso de error
     */
    generaExcepcion: function (e, paso, mask) {
        if (typeof e === 'string') {
            throw e;
        } else {
            Ice.logError(e);
            try {
                if (mask.maskLocal === true) {
                    mask.close();
                }
            } catch (e) {}
            throw 'Error ' + ((paso || 'del sistema').toLowerCase());
        }
    },
    
    
    /*
     * Imprime en consola una excepcion y manda aviso de error
     */
    manejaExcepcion: function (e, paso, mask) {
        if (typeof e === 'string') {
            if (e.indexOf('break') === -1) { // cuando viene la palabra BREAK no muestro el error 
                Ice.mensajeWarning(e);
            } else {
                Ice.logWarn('BREAK:', e);
            }
        } else {
            Ice.logError(e);
            try {
                if (mask.maskLocal === true) {
                    mask.close();
                }
            } catch (e) {}
            Ice.mensajeError('Error ' + ((paso || 'del sistema').toLowerCase()));
        }
    },
    
    
    /*
     * Atajo para Ext.ComponentQuery.query
     */
    query: function (selector, root) {
        var comps = Ext.ComponentQuery.query(selector, root);
        if (comps && comps.length === 1) { // Cuando encuentro array con 1 elemento, regreso el elemento
            return comps[0];
        }
        return comps;
    },
    
    
    /*
     * Crea y muestra una mascara en pantalla con el texto recibo o la palabra "Cargando"
     * Retorna la mascara a la cual se debe hacer .close()
     */
    mask: function (texto) {
        Ice.log('Ice.mask() args:', arguments);
        var paso = 'Creando m\u00e1scara',
            mask;
        try {
            if (Ext.manifest.toolkit === 'classic') {
                var mainView = Ice.query('#mainView');
                mask = new Ext.LoadMask({
                    msg: texto || 'Cargando...',
                    maskLocal: true,
                    target: mainView,
                    close: function () {
                        this.destroy();
                    }
                });
                mask.show();
            } else {
                var mainView = Ice.query('#mainView');
                mask = new Ext.LoadMask({
                    message: texto || 'Cargando...',
                    maskLocal: true,
                    close: function () {
                        this.destroy();
                    }
                });
                mainView.add(mask);
            }
            return mask;
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    
    /*
     * Presenta mensaje en pantalla, recibe objeto params:
     * params: {
     *     titulo: 'Datos guardados',               <<< titulo de la ventana (opcional)
     *     mensaje: 'Poliza emitida correctamente', <<< mensaje
     *     callback: function () {}                 <<< callback (opcional)
     * }
     */
    mensaje: function (params) {
        var paso = 'Mostrando mensaje';
        try {
            var titulo = (params && params.titulo) || 'Aviso',
                mensaje = (params && params.mensaje) || (params && typeof params === 'string' && params) || '(sin mensaje)',
                callback = (params && params.callback) || null;
            if (Ext.manifest.toolkit === 'classic') {
                Ext.create('Ext.window.Window', {
                    width: 300,
                    height: 150,
                    closeAction: 'destroy',
                    title: titulo,
                    modal: true,
                    animateTarget: Ext.getBody(),
                    layout: 'fit',
                    bodyStyle: 'border:none; background-color: transparent; padding: 10px;',
                    buttonAlign: 'center',
                    items: [{
                        xtype: 'container',
                        html: mensaje
                    }],
                    buttons: [{
                        text: 'Aceptar',
                        listeners: {
                            click: {
                                fn: function (item, e) {
                                    this.up('window').close();
                                }
                            }
                        }
                    }],
                    listeners: {
                        close: function () {
                            if (callback) {
                                var paso2 = 'Ejecutando callback despues de mensaje';
                                try {
                                    callback();
                                } catch (e) {
                                    Ice.manejaExcepcion(e, paso2);
                                }
                            }
                        }
                    }
                }).show();
            } else {
                Ext.create('Ext.Panel', {
                    title: titulo,
                    floated: true,
                    centered: true,
                    modal: true,
                    showAnimation: 'pop',
                    hideAnimation: 'popOut',
                    hideOnMaskTap: true,
                    padding: '10px',
                    html: mensaje,
                    closable: false,
                    closeAction: 'destroy',
                    listeners: {
                        close: function () {
                            if (callback) {
                                var paso2 = 'Ejecutando callback despues de mensaje';
                                try {
                                    callback();
                                } catch (e) {
                                    Ice.manejaExcepcion(e, paso2);
                                }
                            }
                        }
                    }
                }).show();
            }
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    
    /*
     * Presenta mensaje en pantalla, recibe objeto params:
     * params: {
     *     titulo: 'Datos guardados',               <<< titulo de la ventana (opcional)
     *     mensaje: 'Poliza emitida correctamente', <<< mensaje
     *     callback: function () {}                 <<< callback (opcional)
     * }
     */
    mensajeCorrecto: function (params) {
        Ice.mensaje(params);
    },
    
    
    /*
     * Presenta mensaje en pantalla, recibe objeto params:
     * params: {
     *     titulo: 'Datos guardados',               <<< titulo de la ventana (opcional)
     *     mensaje: 'Poliza emitida correctamente', <<< mensaje
     *     callback: function () {}                 <<< callback (opcional)
     * }
     */
    mensajeError: function (params) {
        Ice.mensaje(params);
    },
    
    
    /*
     * Presenta mensaje en pantalla, recibe objeto params:
     * params: {
     *     titulo: 'Datos guardados',               <<< titulo de la ventana (opcional)
     *     mensaje: 'Poliza emitida correctamente', <<< mensaje
     *     callback: function () {}                 <<< callback (opcional)
     * }
     */
    mensajeWarning: function (params) {
        Ice.mensaje(params);
    },
    
    
    /*
     * Ejecuta una peticion AJAX, recibe objeto params:
     * params: {
     *     url: 'someUrl',                          <<< URL a ejecutar
     *     params: {                                <<< parametros a enviar (opcional) (se envia este o se envia jsonData)
     *         param1: value1, ...
     *     },
     *     jsonData: jsonObject,                    <<< parametros json (opcional) (se envia este o se envia params)
     *     success: function (responseJsonData) {}, <<< callback en caso de exito (opcional)
     *     failure: function () {},                 <<< callback en caso de error (opcional)
     *     mascara: 'Guardando datos',              <<< Texto a mostrar mientras se espera respuesta (opcional)
     *     background: true                         <<< Para que no robe el focus en pantalla (opcional)
     * }
     * throws exception
     */
    request: function (params) {
        Ice.log('Ice.request:', params);
        var paso = params.mascara || 'Enviando petici\u00f3n...',
            mask = params.background === true
                ? {close: function (){}}
                : Ice.mask(paso);
        try {
            var requestParams = {
                url: params.url,
                success: function (response) {
                    Ice.log('Ice.request.response: ', response);
                    mask.close();
                    var paso2 = 'Decodificando respuesta del proceso: ' + ((params.mascara || 'enviando petici\00f3n').toLowerCase());
                    try {
                        var json = Ext.JSON.decode(response.responseText);
                        Ice.log('### ' + params.url.slice(-50) + ' json:', json);
                        if (json.success !== true) {
                            throw json.message || 'La petici\u00f3n no fue exitosa';
                        }
                        if (params.success && typeof params.success === 'function') {
                            paso2 = 'Ejecutando callback posterior al request';
                            params.success(json);
                        }
                    } catch (e) {
                        if (params.failure && typeof params.failure === 'function') {
                            try {
                                params.failure();
                            } catch (e) {
                                Ice.logWarn('Error al ejecutar callback failure despues de request:', e);
                            }
                        }
                        Ice.manejaExcepcion(e, paso2);
                    }
                },
                failure: function () {
                    mask.close();
                    if (params.failure && typeof params.failure === 'function') {
                        try {
                            params.failure();
                        } catch (e) {
                            Ice.logWarn('Error al ejecutar callback failure despues de error de red de request:', e);
                        }
                    }
                    Ice.mensajeError('Error de red ' + (params.mascara || '').toLowerCase());
                }
            };
            if (params.params) {
                requestParams.params = params.params;
            } else if (params.jsonData) {
                requestParams.jsonData = params.jsonData;
            }
            Ext.Ajax.request(requestParams);
        } catch (e) {
            Ice.generaExcepcion(e, paso, mask);
        }
    },
    
    
    /*
     * Funcion que recibe la lista (o un solo mapa) de componentes deseados y retorna los elementos generados
     * @param secciones: [
     *     {
     *         pantalla: 'MESA_CONTROL',
     *         seccion: 'FILTRO',
     *         modulo: 'COTIZACION',
     *         estatus: 2,
     *         cdramo: '5',
     *         cdtipsit: '51',
     *         auxkey: '',
     *         
     *         items: true,
     *         columns: false,
     *         buttons: false,
     *         listeners: true
     *     }, {
     *         pantalla: 'MESA_CONTROL',
     *         seccion: 'FORMULARIO',
     *         ...
     *     }
     * ]
     * @return: {
     *     MESA_CONTROL: {
     *         FILTRO: {
     *             items: [...],
     *             columns: [...],
     *             buttons: [...],
     *             listeners: [...]
     *         },
     *         FORMULARIO: {
     *             items: [...],
     *             columns: [...],
     *             buttons: [...],
     *             listeners: [...]
     *         }
     *     }
     * }
     */
    generaComponentes: function (secciones) {
        Ice.log('Ice.generaComponentes args:', arguments);
        var paso = 'Recuperando componentes',
            comps = {};
        try {
            var lista,
                secciones = secciones || [];
            if (secciones.pantalla) { // cuando se recibe un solo elemento
                lista = [];
                lista.push(secciones);
            } else {
                lista = secciones;
            }
            Ext.Ajax.request({
                async: false,
                url: Ice.url.core.recuperarComponentes,
                jsonData: {
                    secciones: lista
                },
                success: function (response) {
                    paso = 'Decodificando respuesta al recuperar componentes';
                    var json = Ext.JSON.decode(response.responseText);
                    Ice.log('Ice.generaComponentes json response:', json);
                    if (json.success !== true) {
                        throw json.message;
                    }
                    if (json.params && json.params.redirect) {
                        paso = 'Redirigiendo componente';
                        var mainView = Ice.query('#mainView'),
                            mainReferences = mainView.getReferences(),
                            mainController = mainView.getController(),
                            navigationTreeList;
                        if (Ext.manifest.toolkit === 'classic') {
                            navigationTreeList = mainReferences.navigationTreeList;
                        } else {
                            navigationTreeList = mainReferences.navigation.down('treelist');
                        }
                        navigationTreeList.getStore().getRoot().removeAll();
                        navigationTreeList.getStore().reload();
                        mainController.cargarDatosSesion();
                        mainController.redirectTo(json.params.redirect + '.action');
                        throw 'break -se va a redireccionar la pantalla: ' + json.params.redirect;
                    }
                    
                    if (lista.length > 0 && lista[0].pantalla !== 'LOGIN' && lista[0].pantalla !== 'ROLTREE') {
                        paso = 'Construyendo componentes';
                        for (var i = 0; i < lista.length; i++) {
                            comps[lista[i].pantalla] = comps[lista[i].pantalla] || {};
                            comps[lista[i].pantalla][lista[i].seccion] = Ice.generaSeccion(json.componentes[lista[i].seccion],
                                {
                                    items: lista[i].items === true,
                                    columns: lista[i].columns === true,
                                    buttons: lista[i].buttons === true,
                                    listeners: lista[i].listeners === true
                                }
                            );
                        }
                    } else {
                        Ice.log('No se construye porque no hay secciones o es login o es roltree lista:', lista);
                    }
                },
                failure: function () {
                    throw 'Error de red al recuperar componentes';
                }
            });
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('Ice.generaComponentes comps:', comps);
        return comps;
    },
    
    
    /*
     * Se genera una seccion con sus items, columns y/o buttons
     * @param configComps: [
     *     {
     *         tipocampo: 'A',
     *         name_cdatribu: 'cdunieco',
     *         label: 'SUCURSAL'
     *     },
     *     ...
     * ]
     * @param banderas: {
     *     items: (boolean),
     *     columns: (boolean),
     *     buttons: (boolean),
     *     listeners: (boolean)
     * }
     * @return seccion: {
     *     items: [
     *         {
     *             xtype: 'numberfield',
     *             fieldLabel: 'SUCURSAL',
     *             name: 'cdunieco'
     *         },
     *         ...
     *     ],
     *     columns: [ ... ],
     *     buttons: [ ... ],
     *     listeners: [ ... ]
     * }
     */
    generaSeccion: function (configComps, banderas) {
        Ice.log('Ice.generaSeccion args:', arguments);
        var paso = 'Generando secci\u00f3n',
            seccion = {};
        try {
            if (!banderas) {
                throw 'Sin par\u00e1metros para generar secci\u00f3n';
            }
            var configComps = configComps || [];
            if (banderas.items === true) {
                seccion.items = Ice.generaItems(configComps);
            }
            if (banderas.columns === true) {
                seccion.columns = Ice.generaColumns(configComps);
            }
            if (banderas.buttons === true) {
                seccion.buttons = Ice.generaButtons(configComps);
            }
            if (banderas.listeners === true) {
                seccion.listeners = Ice.generaListeners(configComps);
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        return seccion;
    },
    
    
    /*
     *
     */
    generaItems: function (configComps) {
        Ice.log('Ice.generaItems args:', arguments);
        var paso = 'Generando items',
            items = [];
        try {
            configComps = configComps || [];
            for (var i = 0; i < configComps.length; i++) {
                items.push(Ice.generaItem(configComps[i]));
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        return items;
    },
    
    
    /*
     *
     */
    generaColumns: function (configComps) {
        Ice.log('Ice.generaColumns args:', arguments);
        var paso = 'Generando columnas',
            columns = [];
        try {
            configComps = configComps || [];
            for (var i = 0; i < configComps.length; i++) {
                columns.push(Ice.generaColumn(configComps[i]));
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        return columns;
    },
    
    
    /*
     *
     */
    generaButtons: function (configComps) {
        Ice.log('Ice.generaButtons args:', arguments);
        var paso = 'Generando botones',
            buttons = [];
        try {
            configComps = configComps || [];
            for (var i = 0; i < configComps.length; i++) {
                buttons.push(Ice.generaButton(configComps[i]));
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        return buttons;
    },
    
    
    /*
     *
     */
    generaListeners: function (configComps) {
        Ice.log('Ice.generaListeners args:', arguments);
        var paso = 'Generando listeners',
            listeners = [];
        try {
            configComps = configComps || [];
            for (var i = 0; i < configComps.length; i++) {
                listeners.push(Ice.generaListener(configComps[i]));
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        return listeners;
    },
    
    
    /*
     *
     */
    generaItem: function (config) {
        Ice.log('Ice.generaItem args:', arguments);
        var paso = 'Construyendo item',
            item = {};
        try {
            if (!config) {
                throw 'No se recibi\u00f3 configuraci\u00f3n de item';
            }
            
            
            // xtype
            item.xtype = {
                A: 'textfieldice',
                N: 'numberfieldice',
                P: 'numberfieldice',
                F: 'datefieldice',
                T: 'textareaice',
                S: 'switchice'
            }[config.tipocampo];
            if (!item.xtype) {
                throw 'tipocampo incorrecto';
            }
            
            if (config.catalogo) {
                item.xtype = 'comboice';
            }
            
            
            // name_cdatribu
            if (!config.name_cdatribu) {
                throw 'falta name_cdatribu';
            }
            if (/^\d+$/.test(config.name_cdatribu)) {
                item.name = 'otvalor' + (('x000' + config.name_cdatribu).slice(-3));
            } else {
                item.name = config.name_cdatribu;
            }
            
            
            // reference
            item.reference = config.referencia || item.name;
            
            
            // label
            if (config.label) {
                item.label = config.label
            }
            
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        return item;
    },
    
    
    /*
     *
     */
    generaColumn: function (config) {
        Ice.log('Ice.generaColumn args:', arguments);
        alert('Ice.generaColumn TODO');
    },
    
    
    /*
     *
     */
    generaButton: function (config) {
        Ice.log('Ice.generaButton args:', arguments);
        alert('Ice.generaButton TODO');
    },
    
    
    /*
     *
     */
    generaListeners: function (config) {
        Ice.log('Ice.generaListeners args:', arguments);
        alert('Ice.generaListeners TODO');
    },
    
    
    /**
     * logout
     */
    logout: function () {
        Ice.log('Ice.logout');
        var paso = 'Cerrando sesi\u00f3n';
        try {
            Ice.request({
                mascara: paso,
                url: Ice.url.core.logout,
                success: function (action) {
                    var paso2 = 'Redireccionando...';
                    try {
                        if (Ext.manifest.toolkit === 'classic') {
                            Ice.query('#mainView').getController().onToggleUserMenuSize();
                        }
                        Ice.query('#mainView').getController().redirectTo('mesacontrol.action', true);
                    } catch (e) {
                        Ice.manejaExcepcion(e, paso2);
                    }
                }
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    }
});