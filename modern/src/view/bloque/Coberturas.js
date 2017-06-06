Ext.define('Ice.view.bloque.Coberturas', {
	
		extend  :       'Ext.Panel',
		xtype	:		'bloquecoberturas',
		controller : 'bloquecoberturas',
		scrollable:true,
		
		//layout: 'fit',
		//cls: 'big-100 small-100',
	     width: '900px',
	     //heigth: '900px',
		// validacion de parametros de entrada
		constructor : function(config) {
			Ice.log(
							'Ice.view.bloque.Coberturas.constructor config:',
							config);
			var me = this, paso = 'Validando construcci\u00f3n de bloque de coberturas';
			try {
				if (!config) {
					throw 'No hay datos para bloque coberturas';
				}
				if (config.failure || config.success) {
					//throw 'Falta funciones success y failure  para bloque de coberturas';
				}
				if (config.cdramo || config.cdtipsit
						|| !config.modulo) {
					//throw 'Falta ramo y tipo de situaci\u00f3n para bloque de coberturas';
				}
				config.cdunieco = config.cdunieco || '';
				config.cdramo = config.cdramo || '';
				config.estado = config.estado || '';
				config.nmpoliza = config.nmpoliza || '';
				config.nmsuplem = config.nmsuplem || '';
				config.flujo = config.flujo || {};
			} catch (e) {
				Ice.generaExcepcion(e, paso);
			}
			me.callParent(arguments);
		},

		//configuracion del componente (no EXT)
		config : {
			// datos para ubicar uso del componente
			modulo : null,
			flujo : null,
			cdtipsit : null,
			// llave de BD
			cdunieco : null,
			cdramo : null,
			estado : null,
			nmpoliza : null,
			nmsuplem : null,
			nmsituac : '',
			cdgarant : ''
		},
		title : 'Coberturas',
		initialize : function() {
				Ice.log('Ice.view.bloque.ListaSituaciones.initComponent');
				var me = this, paso = 'Construyendo bloque lista de situaciones';
				try {
					
					paso = " creando grid coberturas";
					
					
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

		            var columns=comps.BLOQUE_LISTA_SITUACIONES.LISTA.columns || [];
					
					var it={
							
					    listeners:{
					    	itemtap:function(grid,idx,target,record){
					    		
	                            me.config.nmsituac=record.get("nmsituac");
	                            grid.up("bloquecoberturas").down("#gridCoberturas").getStore().proxy.extraParams['params.pv_nmsituac_i']=me.config.nmsituac
	                            grid.up("bloquecoberturas").down("#gridCoberturas").getStore().load()
	                            grid.up("bloquecoberturas").down("#gridCoberturas").getStore().filter('amparada','S')
					    		
			                    Ice.log(me.config.nmsituac)
					    	}
					    },
						xtype : 'bloquelistasituaciones',
						cdtipsit : me.config.cdtipsit,
						cdramo : me.config.cdramo,
						cdunieco : me.config.cdunieco,
                        cdramo: me.config.cdramo,
                        estado: me.config.estado,
                        nmpoliza: me.config.nmpoliza,
                        nmsuplem: me.config.nmsuplem,
						//maxHeigth : '250px',
						columns: columns
						
						
						
						
			            
						
					}
					me.add(it)
					//////////// grid coberturas //////
					
					var comps = Ice.generaComponentes({
 								pantalla : 'COBERTURAS',
 								seccion : 'COBERTURAS',
 								modulo : me.modulo || '',
 								estatus : (me.flujo && me.flujo.estatus) || '',
 								cdramo : me.cdramo || '',
 								cdtipsit : me.cdtipsit || '',
 								auxKey : me.auxkey || '',
 								columns : true,
 								fields : true
 							});
 					Ice.log('Ice.view.bloque.Coberturas.initComponent comps:',comps);
					var gridCoberturas={
						xtype:'grid',
						itemId:'gridCoberturas',
						title:"Coberturas",
						width:'100%',
						height:300,
						columns:comps.COBERTURAS.COBERTURAS.columns,
						listeners:{
					    	itemtap:'editarCoberturaMovil'
					    },
						store:{
 								fields : comps.COBERTURAS.COBERTURAS.fields,
 								proxy : {
 									type : 'ajax',
 									url : Ice.url.bloque.coberturas.datosCoberturas,
 									reader : {
 										type : 'json',
 										rootProperty : 'list',
 										successProperty : 'success',
 										messageProperty : 'message'
 									},
 									extraParams: {
 			                            'params.pv_cdunieco_i' : me.config.cdunieco,
 			                            'params.pv_cdramo_i': me.config.cdramo,
 			                            'params.pv_estado_i': me.config.estado,
 			                            'params.pv_nmpoliza_i': me.config.nmpoliza,
 			                            'params.pv_nmsuplem_i': me.config.nmsuplem,
 			                            'params.pv_nmsituac_i': me.getNmsituac()
 			                        }
 								}
 							},
 							items:[
 								{
 						            xtype : 'toolbar',
 						            docked: 'bottom',
 						            items:[
 						            	{
 				                        	xtype: 'button',
 				                            text: 'Editar',
 				                            handler: 'editarCoberturaMovil',
 				                            hidden:true
 				                        },
 				                       {
 				                        	xtype: 'button',
 				                            text: 'Borrar',
 				                           iconCls : 'x-fa fa-remove',
 				                            handler: 'borraCoberturaMovil'
 				                        },
 				                       {
 				                        	xtype: 'button',
 				                        	iconCls: 'x-fa fa-plus-circle',
 				                            text: 'Agregar Cobertura',
 				                            handler: function(btn) {
 				                            	try{
 				                            		
 				                            		btn.up("[xtype=bloquecoberturas]").getItems().items.forEach(function(it){
 				                            			it.setHidden(true)
 				                            		})
 				                            		Ext.ComponentQuery.query("#agregables")[0].getStore().load()
 				                            		Ext.ComponentQuery.query("#panela")[0].setHidden(false)
 				                            	}catch(e){
 				                            		Ice.generaExcepcion(e,paso)
 				                            	}
 				                              
 				                            }
 				                        }
 						            ]
 						        }
 						       
 							]
					}
					
					me.add(gridCoberturas)
					
					////////// formulario editar coberuras
					var form={
						xtype: 'formpanel',
						scrollable:true,
						height:300,
						items:[
								{
						            xtype : 'toolbar',
						            docked: 'bottom',
						            items:[
						            	{
				                        	xtype: 'button',
				                            text: 'Guardar',
				                            handler: 'guardarCoberturaMovil'
				                        }
				                      
						            ]
								}
							]
					}
					
					me.add(form)
					
					/////////panel agregar coberturas
					
					var panelnc={
						xtype: 'panel',
						itemId:'panela',
						hidden:true,
						title:'Agregar Cobertura',
						items:[
							{
								xtype:'grid',
								width:'500px',
								height:300,
								itemId: 'agregables',
								columns: [

						            { xtype: 'checkcolumn', text: 'Amparar', dataIndex: 'amparada', sortable:false},
						            { text: 'Clave', dataIndex: 'cdgarant'  },
						            { text: 'Cobertura', dataIndex: 'dsgarant',flex: 2 }
						            ],
						            store: {
										fields: ['opcional',
											'cdgarant',
											'dsgarant',
											'deducible',
											'cdcapita',
											'suma_asegurada',
											'amparada'],
										proxy:{
						                    type: 'ajax',
						                    autoLoad: true,
						                    extraParams:{
				            	    			'params.pv_cdunieco_i':me.config.cdunieco,
				            	    			'params.pv_cdramo_i':me.config.cdramo,
				            	    			'params.pv_estado_i':me.config.estado,
				            	    			'params.pv_nmpoliza_i':me.config.nmpoliza,
				            	    			'params.pv_nmsuplem_i':me.config.nmsuplem,
				            	    			'params.pv_nmsituac_i':me.config.nmsituac
				            	    			
				            	    		},
				            	    		
						                    url: Ice.url.bloque.coberturas.datosCoberturas,
						                    reader: {
						                        type: 'json',
						                        rootProperty: 'list',
						                        successProperty: 'success',
						                        messageProperty: 'message'
						                    }
						                },
						                listeners:{
						                	load:function(st){
						                		var remover=-1;
						            			while((remover=st.find('amparada','S'))!=-1){
						            				st.removeAt(remover)
						            			}
						            			
						                		st.data.items.forEach(function(it,idx){
						                			Ice.log("-->",it)
						                			it.data.amparada=true;
						                		});
						            			
						            			
						                	}
						                }
									}
							},
							{
						            xtype : 'toolbar',
						            docked: 'bottom',
						            items:[
						            	{
				                        	xtype: 'button',
				                            text: 'Agregar',
				                            handler: 'agregarCoberturaMovil'
				                        },
				                       {
				                        	xtype: 'button',
				                            text: 'Cancelar',
				                            handler: 'cerrarAgregar'
				                        }
						            ]
						        }
						]
					}
					
					me.add(panelnc)
					
				}catch (e) {
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
		
		
		
		
});