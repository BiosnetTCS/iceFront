/**
 * Created by DCACORDE on 5/22/2017.
 */
Ext.define('Ice.view.bloque.Coberturas', {
	 extend: 'Ext.panel.Panel',
	    xtype: 'bloquecoberturas',
	    
	    controller: 'bloquecoberturas',
	    //viewModel: 'bloquedatosgenerales',
	    
	    requires: [],
	    
	    layout: {
	        type: 'vbox',
	        align: 'left'
	    },
	    
	    
	    // validacion de parametros de entrada
	    constructor: function (config) {
	        Ice.log('Ice.view.bloque.Coberturas.constructor config:', config);
	        var me = this,
	            paso = 'Validando construcci\u00f3n de bloque lista situaciones';
	            try {
	                if (!config) {
	                    throw 'No hay datos para bloque coberturas';
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
//	    	buttons:[],
//	    	actionColumns:[]
	    },
	    
	    
	    // configuracio ext
	    title: 'Coberturas',
	    
	    // para el responsive small-(%) big-(%)
	    layout: 'responsivecolumn',
	    
	    bodyPadding: '10px 0px 0px 10px',
	    defaults: {
	        margin: '0px 10px 10px 0px',
	        cls: 'big-50 small-100'
	    },
	    
	    buttons: [],
	    
	    items:[
	    	
	    ],
	    
	    // contruccion usando metodos ext y parametros de entrada
	    initComponent: function () {
	        Ice.log('Ice.view.bloque.ListaSituaciones.initComponent');
	        var me = this,
	            paso = 'Construyendo bloque lista de situaciones';
	        try {
	            var comps = Ice.generaComponentes({
	                pantalla: 'COBERTURAS',
	                seccion: 'COBERTURAS',
	                modulo: me.modulo || '',
	                estatus: (me.flujo && me.flujo.estatus) || '',
	                cdramo: me.cdramo || '',
	                cdtipsit: me.cdtipsit ||'',
	                auxKey: me.auxkey || '',	                
//	                items: true,
	                columns: true,
	                fields:true
	            });
	            Ice.log('Ice.view.bloque.Coberturas.initComponent comps:', comps);
	            
	            var store={
	                	fields: comps.COBERTURAS.COBERTURAS.fields,
	                	 proxy: {
	                         type: 'ajax',
	                         url: Ice.url.bloque.coberturas,
	                         reader: {
	                             type: 'json',
	                             //rootProperty: 'roles',
	                             successProperty: 'success',
	                             messageProperty: 'message'
	                         }
	                     }
	                };
	            Ext.apply(me, {
	                items: [{
	    	    		xtype:'bloquelistasituaciones',
    	    			cdtipsit:this.config.cdtipsit,
    	    			cdramo:		this.config.cdramo
	    	    		
	    	    	},
	    	    	{
	    	    		xtype	:		'gridpanel',
	    	    		tbar	:		 [
				    	    			  	{ xtype: 'button', text: 'Agregar' }
				    	    			 ]
	    	    		columns	:		comps.COBERTURAS.COBERTURAS.columns.concat({
																    	                xtype:'actioncolumn',
																    	                width:50,
																    	                items: [{
																    	                    iconCls: 'x-fa fa-edit',
																    	                    tooltip: 'Edit',
																    	                    handler: function(grid, rowIndex, colIndex) {
																    	                        
																    	                        alert("Edit ");
																    	                    }
																    	                },{
																    	                    icon: 'extjs-build/examples/restful/images/delete.png',
																    	                    iconCls: 'x-fa fa-remove',
																    	                    tooltip: 'Delete',
																    	                    handler: function(grid, rowIndex, colIndex) {
																    	                       
																    	                        alert("Terminate " );
																    	                    }
																    	                }]
																    	            })
																    	            ,
	    	    		 bbar	:		Ext.create('Ext.PagingToolbar', {
				    	    	            store: store,
				    	    	            displayInfo: true,
				    	    	            displayMsg: 'Displaying topics {0} - {1} of {2}',
				    	    	            emptyMsg: "NO HAY COBERTURAS",
				    	    	            inputItemWidth: 35//,
	//			    	    	            items:[
	//			    	    	                '-', {
	//			    	    	                text: 'Show Preview',
	//			    	    	                pressed: pluginExpanded,
	//			    	    	                enableToggle: true,
	//			    	    	                toggleHandler: function(btn, pressed) {
	//			    	    	                    grid.getPlugin('preview').toggleExpanded(pressed);
	//			    	    	                }
	//			    	    	            }]
			    	    	        	}),
			    	    store	:	store	
	    	    		
	    	    	}
	    	    	]
	            ,
	                buttons:me.config.buttons
	                
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