/**
 * Created by DCACORDE on 5/22/2017.
 */Ext.define('Ice.view.bloque.ListaSituaciones', {
	    extend: 'Ext.grid.Panel',
	    xtype: 'bloquelistasituaciones',	    
	    controller: 'bloquelistasituaciones',
//	    viewModel: 'bloquelistasituaciones',	    
	    requires: [],  	    
	    // validacion de parametros de entrada
	    constructor: function (config) {
	        Ice.log('Ice.view.bloque.ListaSituaciones.constructor config:', config);
	        var me = this,
	            paso = 'Validando construcci\u00f3n de bloque lista situaciones';
	            try {
	                if (!config) {
	                    throw 'No hay datos para bloque lista situaciones';
	                }	                
	                if (!config.cdramo || !config.cdtipsit) {
	                    throw 'Falta ramo y tipo de situaci\u00f3n para bloque de lista de situaciones';
	                }               	                config.modulo = config.modulo || 'COTIZACION';               	            } catch (e) {	                Ice.generaExcepcion(e, paso);	            }	        me.callParent(arguments);	    },
	       	    // configuracion del componente (no EXT)
	    config: {
	    	actionColumns:[]
	    },    	    
	    // configuracio ext
	    title: 'Lista Situaciones',	    	    
	    tbar: [],	    
	    // contruccion usando metodos ext y parametros de entrada
	    initComponent: function () {
	        Ice.log('Ice.view.bloque.ListaSituaciones.initComponent');
	        var me = this,
	            paso = 'Construyendo bloque lista de situaciones';
	        try {
	            var comps = Ice.generaComponentes({
	                pantalla: 'BLOQUE_LISTA_SITUACIONES',
	                seccion: 'LISTA',
	                modulo: me.modulo || '',
	                estatus: (me.flujo && me.flujo.estatus) || '',
	                cdramo: me.cdramo || '',
	                cdtipsit: me.cdtipsit ||'',
	                auxKey: me.auxkey || '',
//	                items: true,
	                columns: true,
	                fields:true
	            });
	            Ice.log('Ice.view.bloque.ListaSituaciones.initComponent comps:', comps);
	            Ext.apply(me, {
	                columns: comps.BLOQUE_LISTA_SITUACIONES.LISTA.columns.concat(me.config.actionColumns),	                store  : {
	                	fields: comps.BLOQUE_LISTA_SITUACIONES.LISTA.fields,
	                	autoLoad: true,
	                	proxy: {
	                        type: 'ajax',
	                        url: Ice.url.bloque.listaSituaciones.cargar,
	                        extraParams: {
	                            'params.cdunieco' : '1',
	                            'params.cdramo': '501',
	                            'params.estado': 'W',
	                            'params.nmpoliza': '11075',
	                            'params.nmsuplem': '0'
	                        },
	                        reader: {
	                            type: 'json',
	                            successProperty: 'success',
	                            messageProperty: 'message',
	                            rootProperty: 'situaciones'
	                         }	                     }	                },
	                buttons:me.config.buttons,
	            });
	        } catch (e) {
	            Ice.generaExcepcion(e, paso);
	        }             
	        // construir componente
	        Ice.log('Antes de llamar padre');
	        me.callParent(arguments);       
	        
	        // comportamiento	        paso = '';	        try {	            me.getController().custom();	        } catch (e) {	            Ice.generaExcepcion(e, paso);	        }	    }	
});