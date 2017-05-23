/**
 * Created by jtezva on 5/22/2017.
 */
Ext.define('Ice.view.bloque.ListaSituacionesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bloquelistasituaciones',
    
    custom: function () {
        Ice.log('Ice.view.bloque.ListaSituacionesController.custom');
        var me = this,
            view = me.getView(),
            paso = 'Configurando comportamiento de bloque lista de situaciones';
        try {
            var refs = view.getReferences();
            Ice.log('Ice.view.bloque.DatosGeneralesController refs:', refs);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
    onCargarClic: function (button) {
        this.cargar();
    },
    
    cargar: function (config) {
        Ice.log('Ice.view.bloque.ListaSituacionesController.cargar config:', config);
        var me = this,
            view = me.getView(),
            paso = 'Cargando bloque de datos generales';
        try {
            Ice.suspendEvents(view);
            Ice.request({
                mascara: 'Recuperando datos generales',
                url: Ice.url.bloque.listaSituaciones.cargar,
                params: {},
                success: function (json) {
                    var paso2 = 'LLenando store';
                    try {
                        var store = view.store;                        
                        Ice.log("lista",json.lista);
                        if(json.lista){
                            store.loadData(json.lista);
                        }
                        Ice.resumeEvents(view);
                    } catch (e) {
                        Ice.manejaExcepcion(e, paso2);
                    }
                }
            });
        } catch (e) {
            Ice.resumeEvents(view);
            Ice.manejaExcepcion(e, paso);
        }
    }
});