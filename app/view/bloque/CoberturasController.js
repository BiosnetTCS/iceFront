/**
 * Created by DCACORDE on 5/23/2017.
 */
Ext.define('Ice.view.bloque.CoberturasController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.bloquecoberturas',
    
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
    }
});