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
//            var refs = view.getReferences(),
//                feefecto = refs.feefecto,
//                feproren = refs.feproren;
//            Ice.log('Ice.view.bloque.DatosGeneralesController refs:', refs);
//            feefecto.on({
//                change: function (me, value) {
//                    var paso = 'Calculando fin de vigencia';
//                    alert(paso);
//                    try {
//                        feproren.setValue(Ext.Date.add(value, Ext.Date.YEAR, 1));
//                    } catch (e) {
//                        Ice.logWarn(paso, e);
//                    }
//                } 
//            });
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
                    var paso2 = 'Seteando valores';
                    try {
                        var refs = view.getReferences(),
                            feefecto = refs.feefecto,
                            feproren = refs.feproren;                        
                        feproren.setValue(new Date());
                        feefecto.setValue(new Date());
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