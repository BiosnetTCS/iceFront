/**
 * Created by DCACORDE on 5/22/2017.
 */
Ext.define('Ice.view.bloque.ListaSituaciones', {
	
	
	    extend: 'Ext.grid.Panel',
	    xtype: 'bloquelistasituaciones',
	    
	    controller: 'bloquelistasituaciones',
	    //viewModel: 'bloquedatosgenerales',
	    
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
	                    throw 'Falta ramo y tipo de situaci\u00f3n para bloque de datos generales';
	                }
	                
	                config.modulo = config.modulo || 'COTIZACION';
	                
	            } catch (e) {
	                Ice.generaExcepcion(e, paso);
	            }
	        me.callParent(arguments);
	    },
	    
	    
	    // configuracion del componente (no EXT)
	    config: {
	    	buttons:[],
	    	actionColumns:[]
	    },
	    
	    
	    // configuracio ext
	    title: 'Lista Situaciones',
	    
	    // para el responsive small-(%) big-(%)
	    layout: 'responsivecolumn',
	    
	    bodyPadding: '10px 0px 0px 10px',
	    defaults: {
	        margin: '0px 10px 10px 0px',
	        cls: 'big-50 small-100'
	    },
	    
	    buttons: [],
	    
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
	                columns: comps.BLOQUE_LISTA_SITUACIONES.LISTA.columns.concat(me.config.actionColumns),
	                /*store  : {
	                	fields: comps.BLOQUE_LISTA_SITUACIONES.LISTA.fields,
	                	 proxy: {
	                         type: 'ajax',
	                         url: Ice.url.bloque.listaSituaciones,
	                         reader: {
	                             type: 'json',
	                             //rootProperty: 'roles',
	                             successProperty: 'success',
	                             messageProperty: 'message'
	                         }
	                     }
	                },*/
	                buttons:me.config.buttons,
	                
	            });
	        } catch (e) {
	            Ice.generaExcepcion(e, paso);
	        }
	        
	        
	        // construir componente
	        me.callParent(arguments);
	        
	        
	        // comportamiento
	        paso = '';
	        try {
	           // me.getController().custom();
	        } catch (e) {
	            Ice.generaExcepcion(e, paso);
	        }
	    }
	
});