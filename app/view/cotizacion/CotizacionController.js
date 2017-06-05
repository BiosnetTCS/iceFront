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
            
            if (view.cdunieco && view.cdramo && view.estado && view.nmpoliza && !Ext.isEmpty(view.nmsuplem)) {
                me.cargar();
            } else {
                me.irBloqueSiguiente();
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
    
    /**
     *
     */
    irBloqueSiguiente: function () {
        Ice.log('Ice.view.cotizacion.CotizacionController.irBloqueSiguiente');
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
                
                if (view.nuevaCotizacion === true && index === 0 && bloqueExistente.xtype === 'bloquedatosgenerales') {
                    bloqueExistente.on({
                        llaveGenerada: function (bloqueDatosGen, cdunieco, cdramo, estado, nmpoliza, nmsuplem) {
                            Ice.log('Ice.view.cotizacion.CotizacionController bloquedatosgenerales.llaveGenerada args:', arguments);
                            if (!cdunieco || !cdramo || !estado || !nmpoliza || Ext.isEmpty(nmsuplem)) {
                                throw 'No se pudo recuperar la llave de datos generales';
                            }
                            
                            view.cdunieco = cdunieco;
                            view.cdramo = cdramo;
                            view.estado = estado;
                            view.nmpoliza = nmpoliza;
                            view.nmsuplem = nmsuplem;
                            Ice.log('Ice.view.cotizacion.CotizacionController bloquedatosgenerales.llaveGenerada viewCotizacion:', view);
                        }
                    });
                }
                
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
    irBloqueAnterior: function () {
        Ice.log('Ice.view.cotizacion.CotizacionController.irBloqueAnterior');
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
                refs.cotizarbutton[refs['ref' + (view.bloques.length - 1)]
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
    },
    
    cargar: function () {
        Ice.log('Ice.view.cotizacion.CotizacionController cargar');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Cargando cotizaci\u00f3n';
        try {
            if (!view.cdunieco || !view.cdramo || !view.estado || !view.nmpoliza || Ext.isEmpty(view.nmpoliza)) {
                throw 'Faltan datos para cargar cotizaci\u00f3n';
            }
            
            var comps = [];
            
            for (var i = 0; i < view.bloques.length; i++) {
                var bloque = view.bloques[i];
                
                comps.push(Ext.create({
                    xtype: bloque.name,
                    title: bloque.label,
                    reference: 'ref' + i,
                    indice: i,
                    
                    cdunieco: view.cdunieco,
                    cdramo: view.cdramo,
                    estado: view.estado,
                    nmpoliza: view.nmpoliza,
                    nmsuplem: view.nmsuplem,
                    
                    modulo: view.modulo,
                    flujo: view.flujo,
                    cdtipsit: view.cdtipsit
                }));
            }
            
            refs.tabpanel.add(comps);
            
            refs.tabpanel.setActiveTab(comps[0]);
            
            me.mostrarPrimas();
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    
    onAnteriorclic: function () {
        this.irBloqueAnterior();
    },
    
    
    onSiguienteClic: function () {
        this.irBloqueSiguiente();
    },
    
    
    onCotizarClic: function () {
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Tarificando';
        try {
            var callbackSuccess = function() {
                var paso2 = 'Recuperando primas';
                try {
                    me.mostrarPrimas();
                } catch (e) {
                    Ice.manejaExcepcion(e, paso2);
                }
            };
            
            var activeTab = refs.tabpanel.getActiveTab();
            if (activeTab && activeTab.getController && activeTab.getController().guardar) {
                activeTab.getController().guardar({
                    success: callbackSuccess
                });
            } else {
                callbackSuccess();
            }
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    
    mostrarPrimas: function () {
        Ice.log('Ice.view.cotizacion.CotizacionController.mostrarPrimas');
        alert('Prima total: $10,000.00');
    }
});