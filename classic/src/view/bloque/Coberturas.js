/**
 * Created by DCACORDE on 5/22/2017.
 */
Ext.define('Ice.view.bloque.Coberturas', {
	 extend: 'Ext.panel.Panel',
	    xtype: 'bloquecoberturas',
	    
	    controller: 'bloquecoberturas',
	    
	    requires: [],
	    
	    layout: "responsivecolumn",
//	    scrollable:true,
	    defaults:{
            userCls: 'big-100 small-100'
	    },
	    
	    // validacion de parametros de entrada
	    constructor: function (config) {
	        Ice.log('Ice.view.bloque.Coberturas.constructor config:', config);
	        var me = this,
	            paso = 'Validando construcci\u00f3n de bloque de coberturas';
	            try {
	                if (!config) {
	                    throw 'No hay datos para bloque coberturas';
	                }
	                
	                if (!config.cdramo || !config.cdtipsit) {
	                    throw 'Falta ramo y tipo de situaci\u00f3n para bloque de coberturas';
	                }
	                
	                if (!config.cdramo || !config.cdtipsit || config.modulo) {
	                    throw 'Falta ramo y tipo de situaci\u00f3n para bloque de coberturas';
	                }
	                
	                config.cdunieco = config.cdunieco || '';
	                config.cdramo   = config.cdramo || '';
	                config.estado   = config.estado || '';
	                config.nmpoliza = config.nmpoliza || '';
	                config.nmsuplem = config.nmsuplem || '';
	                
	                config.flujo = config.flujo || {};
	                
	            } catch (e) {
	                Ice.generaExcepcion(e, paso);
	            }
	        me.callParent(arguments);
	    },
	    
	    
	    // configuracion del componente (no EXT)
	    config: {
	    	
	    	
	    	 // datos para ubicar uso del componente
	        modulo: null,
	        flujo: null,
	        cdtipsit: null,
	        
	        // llave de BD
	        cdunieco: null,
	        cdramo: null,
	        estado: null,
	        nmpoliza: null,
	        nmsuplem: null,
	        
	    	nmsituac:'',
	    	cdgarant:''
	    },
	    
	    
	    // configuracio ext
	    title: 'Coberturas',
	    
	    bodyPadding: '10px 0px 0px 10px',
	   
	    
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
	                columns: true,
	                fields:true
	            });
	            Ice.log('Ice.view.bloque.Coberturas.initComponent comps:', comps);
	            paso=" creando grid coberturas";
	            var store={
	                	fields: comps.COBERTURAS.COBERTURAS.fields,
	                	 proxy: {
	                         type: 'ajax',
	                         autoLoad: true,
	                         url: Ice.url.bloque.coberturas.datosCoberturas,
	                         reader: {
	                             type: 'json',
	                             rootProperty: 'list',
	                             successProperty: 'success',
	                             messageProperty: 'message'
	                         }
	                      
	                     }
	                };
	            Ext.apply(me, {
	                items: [{
	    	    		xtype:'bloquelistasituaciones',
    	    			cdtipsit:this.config.cdtipsit,
    	    			cdramo:		this.config.cdramo,
    	    			maxHeigth: '250px',
//    	    			width	: "100%",
    	    			actionColumns:[ {

    		                xtype:'actioncolumn',

    		                items: [{

    		                    iconCls: 'x-fa fa-edit',

    		                    tooltip: 'Editar',

    		                    handler: function(grid, rowIndex, colIndex) {

    		                        try{
    		                        	var paso='limpiando grids'
    		                        	var gridCoberturas=me.down('#gridCoberturas');
    		                        	gridCoberturas.store.removeAll();
    		                        	me.down('[xtype=form]').removeAll();
    		            	    		paso='consultando coberturas'
    		            	    		var record = grid.getStore().getAt(rowIndex);
    		            	    		var paso="Evento selecciona cobertura "
    		            	    		// aqui mandar los datos de a deveras
    		            	    			
    		            	    		
    		            	    		gridCoberturas.store.proxy.extraParams={
    		            	    			'params.pv_cdunieco_i':me.cdunieco,
    		            	    			'params.pv_cdramo_i':me.cdramo,
    		            	    			'params.pv_estado_i':me.estado,
    		            	    			'params.pv_nmpoliza_i':me.nmpoliza,
    		            	    			'params.pv_nmsuplem_i':me.nmsuplem,
    		            	    			'params.pv_nmsituac_i':record.get('nmsituac')
    		            	    			
    		            	    		}
    		            	    		paso="estableciendo nmsituac";
    		            	    		me.nmsituac=record.get('nmsituac');
    		            	    		gridCoberturas.store.load()
    		            	    		gridCoberturas.store.filter('amparada', 'S')
    		            	    		gridCoberturas.up('[xtype=bloquecoberturas]').nmsituac=record.get('nmsituac')
    		            	    		
    		            	    	}catch(e){
    		            	    		Ice.generaExcepcion(e, paso);
    		            	    	}

    		                    }

    		                }]
    	    			}]
	    	    		
	    	    	},
	    	    	{
	    	    		xtype	:		'gridpanel',
	    	    		itemId	:		'gridCoberturas',
	    	    		title	:		'Coberturas',
//	    	    		width	: "700px",
	    	    		tbar	:		 [{xtype: 'tbfill'},
				    	    			  	{ 
				    	    			  		xtype: 'button', 

				    	    			    	itemId  : 'btnAgregar',
				    	    			  		text: 'Agregar',
				    	    			  		handler: 'agregarCobertura'
				    	    			  	}
				    	    			 ],
	    	    		columns	:		comps.COBERTURAS.COBERTURAS.columns.concat( {
	                        xtype:'actioncolumn',
	                        width:50,
	                        items: [{
	                            iconCls: 'x-fa fa-edit',
	                            tooltip: 'Editar',
	                            handler: 'editarCobertura'
	                        },{ 
	                        	iconCls: 'x-fa fa-remove',
	                            tooltip: 'Borrar',
	                            handler: 'borraCobertura',
	                            isDisabled:'coberturaObligatoria'
	                        }]
	                    })
																    	            ,
	    	    		 bbar	:		Ext.create('Ext.PagingToolbar', {
				    	    	            store: store,
				    	    	            displayInfo: true,
				    	    	            emptyMsg: "",
				    	    	            displayMsg: 'Coberturas {0} - {1} of {2}',
				    	    	            inputItemWidth: 35
			    	    	        	}),
			    	    store	:	store	
			    	    
	    	    		
	    	    	},
	    	    	{
	    	    		xtype	:		'form',
	    	    		
//	    	    		width	: "100%",
	    	    		layout	:       {type:'column'},
	    	    		defaults:		{
	    	    			
	    	    		},
	    	    		buttons:[
		    	    			{
		    	    				text: 'Guardar',
		    	    		        formBind: true, //only enabled once the form is valid
		    	    		        disabled: true,
		    	    		        handler: 'guardarCobertura'
		    	    			}
	    	    			]
	    	    		
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
	            me.getController().custom();
	        } catch (e) {
	            Ice.generaExcepcion(e, paso);
	        }
	    }
	    ,
	    listeners: {
	    	afterrender:'cargarSituaciones'
	    }
});