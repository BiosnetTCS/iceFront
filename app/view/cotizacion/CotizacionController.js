/**
 * Created by jtezva on 6/1/2017.
 */
Ext.define('Ice.view.cotizacion.CotizacionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cotizacion',
    
    init: function (view) {
        Ice.log('Ice.view.cotizacion.CotizacionController');
        var me = this,
            view = me.getView(),
            paso = 'Iniciando controlador de cotizaci\u00f3n';
        try {
            me.callParent(arguments);
            
            me.siguiente();
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
    
    /**
     *
     */
    siguiente: function () {
        Ice.log('Ice.view.cotizacion.CotizacionController.siguiente');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Mostrando siguiente bloque';
        try {
            var index = view.bloqueActual + 1,
                bloque = view.bloques[index],
                tabpanel = view.getReferences().tabpanel,
                bloqueExistente = refs && refs['ref' + index];
            
            if (!bloque) {
                throw 'No existe el bloque';
            }
            
            
            if (!bloqueExistente) { // no existe, se crea
                bloqueExistente = Ext.create({
                    xtype: bloque.name,
                    title: bloque.label,
                    reference: 'ref' + index,
                    indice: index,
                    
                    cdunieco: view.cdunieco,
                    cdramo: view.cdramo,
                    estado: view.estado,
                    nmpoliza: view.nmpoliza,
                    nmsuplem: view.nmsuplem,
                    
                    modulo: view.modulo,
                    flujo: view.flujo,
                    cdtipsit: view.cdtipsit
                });
                tabpanel.add(bloqueExistente);
            }
            tabpanel.setActiveTab(bloqueExistente);
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    
    /**
     *
     */
    anterior: function () {
        Ice.log('Ice.view.cotizacion.CotizacionController.anterior');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Mostrando bloque anterior';
        try {
            var index = view.bloqueActual - 1,
                bloque = view.bloques[index],
                tabpanel = view.getReferences().tabpanel,
                bloqueExistente = refs && refs['ref' + index];
            
            if (!bloque || !bloqueExistente) {
                throw 'No existe el bloque';
            }
            
            tabpanel.setActiveTab(bloqueExistente);
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    
    onTabchangeEvent: function (tabpanel, newCard, oldCard) {
        Ice.log('Ice.view.cotizacion.CotizacionController.onTabchangeEvent args:', arguments);
        var me = this,
            view = me.getView(),
            refs = view.getReferences() || {},
            paso = 'Actualizando indice';
        try {
            if (Ext.isEmpty(newCard.indice)) {
                throw 'No se puede actualizar el indice';
            }
            view.bloqueActual = newCard.indice;
            
            
            paso = 'Actualizando botones';
            if (refs.anteriorbutton) {
                refs.anteriorbutton[view.bloqueActual > 0
                    ? 'show'
                    : 'hide']();
            }
            if (refs.cotizarbutton) {
                refs.cotizarbutton[refs['ref' + view.bloques.length]
                    ? 'show'
                    : 'hide']();
            }
            if (refs.siguientebutton) {
                refs.siguientebutton[view.bloqueActual < view.bloques.length - 1
                    ? 'show'
                    : 'hide']();
            }
            
            
            if (tabpanel.suspenderGuardadoAutomatico !== true && oldCard && oldCard.getController && oldCard.getController()
                && oldCard.getController().guardar) {
                paso = 'Guardando datos';
                var callbackSuccess = function () {};
                
                var callbackFailure = function () {
                    var paso2 = 'Regresando a paso anterior';
                    try {
                        tabpanel.suspenderGuardadoAutomatico = true;
                        tabpanel.setActiveTab(oldCard);
                        tabpanel.suspenderGuardadoAutomatico = false;
                    } catch (e) {
                        Ice.manejaExcepcion(e, paso2);
                    }
                };
                
                oldCard.getController().guardar({
                    success: callbackSuccess,
                    failure: callbackFailure
                });
            }
            
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    }
});