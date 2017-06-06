/**
 * Created by DCACORDE on 5/22/2017.
 */
Ext.define('Ice.view.bloque.ListaSituaciones', {
	    extend: 'Ext.grid.Grid',
	    xtype: 'bloquelistasituaciones',	
		width:'500px',
		height:300,
	    	controller: 'bloquelistasituaciones',
//		    viewModel: 'bloquelistasituaciones',	    

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
		                }
		                this.config.cdunieco = config.cdunieco || '';
		                this.config.cdramo = config.cdramo || '';
		                this.config.estado = config.estado || '';
		                this.config.nmpoliza = config.nmpoliza || '';
		                this.config.nmsuplem = config.nmsuplem || '';
		                this.config.flujo = config.flujo || {};
	               
		                this.config.modulo = config.modulo || 'COTIZACION';
	               
		            } catch (e) {
		                Ice.generaExcepcion(e, paso);
		            }
		        me.initComponent();
		        me.callParent(arguments);
		    },

		       
		    // configuracion del componente (no EXT)
		    config: {
		    	actionColumns:[],
		    	modulo : null,
				flujo : null,
				cdtipsit : null,
				// llave de BD
				cdunieco : null,
				cdramo : null,
				estado : null,
				nmpoliza : null,
				nmsuplem : null,
		    },    
		    

		    // configuracio ext
		    title: 'Lista Situaciones',	    	    

		    tbar: [],
		    initComponent:function(){
		    	
		    	
		    	var me=this;
		    	var comps = Ice.generaComponentes({
	                pantalla: 'BLOQUE_LISTA_SITUACIONES',
	                seccion: 'LISTA',
	                modulo: me.config.modulo || '',
	                estatus: (me.config.flujo && me.config.flujo.estatus) || '',
	                cdramo: me.config.cdramo || '',
	                cdtipsit: me.config.cdtipsit ||'',
	                auxKey: me.config.auxkey || '',
//	                items: true,
	                columns: true,
	                fields:true
	            });
	            Ice.log('Ice.view.bloque.ListaSituaciones.initComponent comps:', comps);

	           // me.columns=comps.BLOQUE_LISTA_SITUACIONES.LISTA.columns || [];
	            
	            me.buttons=me.config.buttons
	            
	            
		    },
		    
		    initialize: function () {
		    	
		        Ice.log('Ice.view.bloque.ListaSituaciones.initComponent');
		        var me = this,
		            paso = 'Construyendo bloque lista de situaciones';
		        try {
		            
		            
		        	var comps = Ice.generaComponentes({
		                pantalla: 'BLOQUE_LISTA_SITUACIONES',
		                seccion: 'LISTA',
		                modulo: me.config.modulo || '',
		                estatus: (me.config.flujo && me.config.flujo.estatus) || '',
		                cdramo: me.config.cdramo || '',
		                cdtipsit: me.config.cdtipsit ||'',
		                auxKey: me.config.auxkey || '',
//		                items: true,
		                columns: true,
		                fields:true
		            });
		            Ice.log('Ice.view.bloque.ListaSituaciones.initComponent comps:', comps);
		           // me.headerCt.insert(0,comps.BLOQUE_LISTA_SITUACIONES.LISTA.columns.concat(me.config.actionColumns))
		           
		        	me.setStore( {
	                	fields: comps.BLOQUE_LISTA_SITUACIONES.LISTA.fields,
	                	autoLoad: true,
	                	proxy: {
	                        type: 'ajax',
	                        url: Ice.url.bloque.listaSituaciones.cargar,
	                        extraParams: {
	                            'params.cdunieco' : me.config.cdunieco,
	                            'params.cdramo': me.config.cdramo,
	                            'params.estado': me.config.estado,
	                            'params.nmpoliza': me.config.nmpoliza,
	                            'params.nmsuplem': me.config.nmsuplem
	                        },
	                        reader: {
	                            type: 'json',
	                            successProperty: 'success',
	                            messageProperty: 'message',
	                            rootProperty: 'situaciones'
	                         }
	                     }
	                })
		            ;
		        	
		        	//me.setItems();
		            
		            
		         
		        } catch (e) {
		            Ice.generaExcepcion(e, paso);
		        }             

		        // construir componente
		        Ice.log('Antes de llamar padre');
		        me.callParent(arguments);       

		        
		        // comportamiento
		        paso = '';
		        try {
		            me.getController().custom();
		        } catch (e) {
		            Ice.generaExcepcion(e, paso);
		        }
		    }	

});