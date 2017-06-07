/**
 * Created by DCACORDE on 5/23/2017.
 */
Ext.define('Ice.view.bloque.CoberturasController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.bloquecoberturas', 
    
    custom: function () {
        Ice.log('Ice.view.bloque.CoberturasController.custom');
        
        
        try {
        	
        	var me = this,
            view = me.getView(),
            paso = 'Configurando comportamiento de bloque lista de situaciones';
        	
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
	
    
	
	agregarCobertura:function(me){
		var paso="";
		try{
			paso="Generando ventana para añadir cobertura";
			var me = this;
	        var view = me.getView();
			var gridCoberturas=view.down("[xtype=gridpanel]");
			Ice.log("gridCoberturas:",gridCoberturas);
			paso="Consultando datos"
			 var comps = Ice.generaComponentes({
	            pantalla: 'COBERTURAS',
	            seccion: 'COBERTURAS_AGREGABLES',
	            modulo: view.modulo || '',
	            estatus: (view.flujo && view.flujo.estatus) || '',
	            cdramo: view.config.cdramo || '',
	            cdtipsit: view.cdtipsit ||'',
	            auxKey: view.auxkey || '',	                
	            columns: true,
	            fields:true
	        });
	        Ice.log('Ice.view.bloque.Coberturas.initComponent comps:', comps);
	        
			paso='recuperando datos de situacion'
				var gridCoberturas=view.down('#gridCoberturas')
	    		var record=gridCoberturas.store.getAt(0);
            	//Ice.log("store- :",store)
			Ext.create('Ext.window.Window', {
			    title: 'Añadir cobertura',
			    height: 550,
			    width: 450,
			    layout: 'fit',
			    scrollable:true,
			    items: [{ 
			        xtype: 'grid',
			        border: false,
			        itemId:"gridAgrega",
			        columns: [
			            { text: 'Clave', dataIndex: 'cdgarant'  },
			            { text: 'Cobertura', dataIndex: 'dsgarant',flex: 2 }
			          //  { xtype: 'checkcolumn', text: 'Amparar', dataIndex: 'amparada'}
			            ],          
			            selModel: Ext.create('Ext.selection.CheckboxModel'),   
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
            	    			'params.pv_cdunieco_i':view.cdunieco,
            	    			'params.pv_cdramo_i':view.cdramo,
            	    			'params.pv_estado_i':view.estado,
            	    			'params.pv_nmpoliza_i':view.nmpoliza,
            	    			'params.pv_nmsuplem_i':view.nmsuplem,
            	    			'params.pv_nmsituac_i':view.nmsituac
            	    			
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
		                			it.data.amparada=false;
		                		});
		            			
		            			
		                	}
		                }
					}
			    }],
			    buttons:[{
			    	xtype	: 'button',
			    	text	: 'Agregar',
			    	handler : function(me){
			    		
			    		var list=[];
			    		Ext.ComponentQuery.query("#gridAgrega")[0].getSelectionModel().getSelection().forEach(function(it,idx){
			    			
			    			Ice.log("Data: ",it.data)
			    			var obj={
	    							
	    							cdgarant:it.data.cdgarant,
	    							cdcapita:it.data.cdcapita
	    							
	    							//,
//	    							suma_asegurada: e.data.suma_asegurada,
//	    							amparada:e.data.amparada?"S":"N"
	    						}
	    					Ice.log("p-",obj)
	    					list.push(obj);
//	    					gridCoberturas.store.add(obj);
			    			
			    			//Ice.log("Data: ",it.store.getData())
			    			
//			    			it.store.data.items.forEach(function(e,i){
//			    				Ice.log("item..:",e)
//			    				if(e.data.amparada){
//			    					
//			    					
//			    				}
//			    			})
			    			
			    			
			    		})
			    		
			    		Ice.request({
			    	    		url:Ice.url.bloque.coberturas.agregarCobertura,
			    	    		jsonData:{
			    	    			list:list,
			    	    			params:{
			    	    				cdunieco	:		view.cdunieco,
			    	    				cdramo		:		view.cdramo,
			    	    				estado		:		view.estado,
			    	    				nmpoliza	:		view.nmpoliza,
			    	    				nmsituac	:		view.nmsituac,
			    	    				nmsuplem	:		view.nmsuplem
			    	    				
			    	    			}
			    	    		},
			    	    		success:function(){
			    	    			var paso=""
			    	    			try{
			    	    				paso="cargando coberturas"
				    	    			gridCoberturas.store.load()
				    	    			Ice.mensajeCorrecto({
				    	    				titulo:'Correcto',
				    	    				mensaje:"Datos guardados correctamente"
				    	    			})
			    	    			}catch(e){
			    	    				Ice.generaExcepcion(e,paso)
			    	    			}
			    	    		}
			    	    	});
			    		me.up("[xtype=window]").close();
			    	}
			    }]
			}).show();
			
			Ext.ComponentQuery.query("#gridAgrega")[0].store.load();
			//Ext.ComponentQuery.query("#gridAgrega")[0].store.find('amparada','N');
			
		}catch(e){
			Ice.generaExcepcion(e, paso);
		}
	},
	
	coberturaObligatoria:function(v,ri,ci,it,record){
		var paso="";
		try{
			paso="valida deshabilitando cobertura"
				
			if(record.get('opcional')=='N'){
				return true;
			}
		}catch(e){
			Ice.generaExcepcion(e,paso);
		}
		return false;
	},
	
	activarBtnAgregarCoberturas:function(st){
		  
		  if(st.count()>0){
			  
			  Ext.ComponentQuery.query("#btnAgregar").forEach(function(it,idx){
				
				  it.setDisabled(false)
			  })
		  }
	  },
	  
	  borraCobertura:function(grid, rowIndex, colIndex) {
          var record=grid.store.getAt(rowIndex);
          
          try{
        	  
        	  Ext.MessageBox.confirm("Borrar Cobertura","\u00bfEstás seguro de borrar la cobertura?",function(opc){
        		  if(opc==='yes'){
        			  Ice.request({
                		  url:Ice.url.bloque.coberturas.borrarCobertura,
                		  params:{
                			  'params.cdunieco':record.get('cdunieco'),
                			  'params.cdramo':record.get('cdramo'),
                			  'params.estado':record.get('estado'),
                			  'params.nmpoliza':record.get('nmpoliza'),
                			  'params.nmsituac':record.get('nmsituac'),
                			  'params.nmsuplem':record.get('nmsuplem'),
                			  'params.cdgarant':record.get('cdgarant'),
                			  'params.cdcapita':record.get('cdcapita'),
                			  'params.fevencim':record.get('fevencim'),
                			  'params.accion':'D'
                		  },
                		  mascara:"Borrando Cobertura...",
                		  success:function(){
                			  Ice.mensajeCorrecto({
                				  titulo:"Correcto",
                				  mensaje:"Cobertura borrada"
                			  });
                			  grid.store.load()
                		  }
                	  });
        		  }
        	  })
        	 
          }catch(e){
        	  Ice.generaExcepcion(e,paso)
          }
      },
      
      editarCobertura:function(grid, rowIndex, colIndex) {
    	  var paso="Evento selecciona cobertura "
    	  try{
      		me = this.getView();
      		var form=me.down('[xtype=form]');
      		form.removeAll();
    		var record = grid.getStore().getAt(rowIndex);
      		paso="estableciendo cdgarant";
      		me.cdgarant=record.get('cdgarant');
      		me.cdcapita=record.get('cdcapita');
      		

      		Ext.ComponentQuery.query("[xtype=bloquecoberturas]")[0].cdgarant=record.get('cdgarant')
      		Ext.ComponentQuery.query("[xtype=bloquecoberturas]")[0].cdcapita=record.get('cdcapita')
      		
      		Ext.ComponentQuery.query("[xtype=bloquecoberturas]")[0].config.cdgarant=record.get('cdgarant')
      		Ext.ComponentQuery.query("[xtype=bloquecoberturas]")[0].config.cdcapita=record.get('cdcapita')
    		Ice.log("record:", record);	
    		 var comps = Ice.generaComponentes({
	                pantalla: 'TATRIGAR',
	                seccion: 'TATRIGAR',
	                modulo: me.modulo || '',
	                estatus: (me.flujo && me.flujo.estatus) || '',
	                cdramo: me.cdramo || '',
	                cdtipsit: me.cdtipsit ||'',
	                auxKey: me.auxkey || '',
	                cdgarant:record.get('cdgarant') || '',
	                items: true
	            });
    		 
    		 
            Ice.log('Ice.view.bloque.Coberturas.initComponent comps:', comps);	
            var mpolicap=Ice.generaComponentes({
                pantalla: 'BLOQUE_COBERTURAS',
                seccion: 'MPOLICAP',
                modulo: me.modulo || '',
                estatus: (me.flujo && me.flujo.estatus) || '',
                cdramo: me.cdramo || '',
                cdtipsit: me.cdtipsit ||'',
                auxKey: me.auxkey || '',
                items: true
               
            });
            mpolicap.BLOQUE_COBERTURAS.MPOLICAP.items.forEach(function(it,idx){
            	it.tabla="MPOLICAP"
            })
            
            form.setTitle(record.get('cdgarant')+" - "+record.get('dsgarant'))
            form.removeAll();
            form.add(mpolicap.BLOQUE_COBERTURAS.MPOLICAP.items);
            form.add(comps.TATRIGAR.TATRIGAR.items);
            
            this.cargarValores(form);   
    		
    	}catch(e){
    		Ice.generaExcepcion(e, paso);
    	}
    },
    
    cargarValores: function(form){
    	//me.coberturasItems={}
    	
    	var view = form.up("bloquecoberturas");
    	Ice.log("->" ,view)
    	Ice.request({
    		url:Ice.url.bloque.coberturas.obtieneTvalogar,
    		params:{
    			'params.cdunieco':view.config.cdunieco,
    			'params.cdramo':view.config.cdramo,
    			'params.estado':view.config.estado,
    			'params.nmpoliza':view.config.nmpoliza,
    			'params.nmsuplem':view.config.nmsuplem,
    			'params.nmsituac':view.config.nmsituac,
    			'params.cdgarant':Ext.ComponentQuery.query("[xtype=bloquecoberturas]")[0].config.cdgarant,
    			'params.cdcapita':Ext.ComponentQuery.query("[xtype=bloquecoberturas]")[0].config.cdcapita
    		},
    		success:function(json){
    			
    			try{
    				Ice.request({
    					url:Ice.url.bloque.coberturas.obtieneMpolicap,
    					params:{
    						'params.cdunieco':view.config.cdunieco,
    		    			'params.cdramo':view.config.cdramo,
    		    			'params.estado':view.config.estado,
    		    			'params.nmpoliza':view.config.nmpoliza,
    		    			'params.nmsuplem':view.config.nmsuplem,
    		    			'params.nmsituac':view.config.nmsituac,
    		    			'params.cdgarant':Ext.ComponentQuery.query("[xtype=bloquecoberturas]")[0].config.cdgarant?Ext.ComponentQuery.query("[xtype=bloquecoberturas]")[0].config.cdgarant:view.cdgarant,
    		    			'params.cdcapita':Ext.ComponentQuery.query("[xtype=bloquecoberturas]")[0].config.cdcapita?Ext.ComponentQuery.query("[xtype=bloquecoberturas]")[0].config.cdcapita:view.cdcapita
    					},
    					success:function(response){
    						var paso="";
    						try{
    							paso="llenando campos";
    							var valores=json.list?json.list[0] || {}:{};
    							var mcap=response.list?response.list[0] || {}:{};
    							
    							form.items.items.forEach(function(it,idx){
    					    		Ice.log("item:",it);
    					    		if(it.setValue){
    					    			var name=it.name || it.referenceKey
	    					    		it.setValue(valores[name]);
	    					    		it.valorOriginal=it.getValue();
    					    		}
    					    	})
    					    	//suma asegurada
    					    	var sa=form.items.items.find(function(e){
    					    		return e.name=='ptcapita' || e.referenceKey=='ptcapita';
    					    		
    					    	});
    							response
    					    	Ice.log("->",sa);
    							Ice.log("->",mcap);
    							var n=sa.name || sa.referenceKey
    					    	sa.setValue(mcap[n])
    					    	
    						}catch(e){
    							Ice.manejaExcepcion(e,paso);
    						}
    					}
    				});
    			}catch(e){
    				Ice.manejaExcepcion(e,paso);
    			}
    			
    		}
    		
    	});
    	
    	
    	
    },
    
    guardarCobertura:function(me){
    	
    	var paso=""
    	try{
    		alert()
	    	var view = this.getView();
	    	var form = me.up('form');
	    	var elementos=[]
	    	form.items.items.forEach(function(it,idx){
	    		elementos.push({
	    			valor:it.getValue(),
	    			valorOriginal:it.valorOriginal,
	    			name:it.name,
	    			tabla:it.tabla
	    		})
	    	});
	    	Ice.request({
	    		url:Ice.url.bloque.coberturas.guardarCoberturas,
	    		jsonData:{
	    			list:elementos,
	    			params:{
	    				'cdunieco':view.cdunieco,
		    			'cdramo':view.cdramo,
		    			'estado':view.estado,
		    			'nmpoliza':view.nmpoliza,
		    			'nmsuplem':view.nmsuplem,
		    			'nmsituac':view.nmsituac,
		    			'cdgarant':view.cdgarant,
		    			'cdcapita':view.cdcapita
	    			}
	    		},
	    		success:function(json){
	    			
	    			
	    			var paso="";
	    			try{
	    				var list=json.list || [];
		    			
		    			if(list.length!=0){
		    				
		    				
		    				Ice.log("--",list)
		    				var win=view.windows.find(function(w){
		    					return w.windowName=='conflictos'
		    				})
		    				Ice.log("-Window->",win)
		    				win.down('[tipo=grid]').store.removeAll();
		    				win.down('[tipo=grid]').store.add(list);
		    				win.show();
		    			}else{
		    				Ice.mensajeCorrecto({
			    				titulo:'Correcto',
			    				mensaje:"Datos guardados correctamente"
			    			});
		    			}
		    			
		    			
		    			view.down("#gridCoberturas").store.load();
	    			}catch(e){
	    				Ice.generaExcepcion(e,paso);
	    			}
	    			
	    		}
	    	});
	    	
	    	
    	}catch(e){
    		Ice.generaExcepcion(e,paso)
    	}
    	
    },
    cargarSituaciones:function(me){
    	var paso="cargando situaciones"
    	try{
	    	var me = this,
	        view = me.getView();
			if(view.cdunieco && view.cdramo && view.estado && view.nmpoliza && view.cdtipsit && view.modulo && !Ext.isEmpty(view.nmsuplem) ){
				view.down("[xtype=bloquelistasituaciones]").store.load();
			}
    	}catch(e){
    		Ice.generaExcepcion(e,paso)
    	}
		
	},
	
	guardar:function(params){
		var paso = 'Validando coberturas';
		try {
			var view=this.getView();
			
			
			Ice.request({
				url:Ice.url.bloque.ejecutarValidacion,
				params:{
					'params.cdunieco':view.cdunieco,
					'params.nmpoliza':view.nmpoliza ,
					'params.cdramo':view.cdramo ,
					'params.estado':view.estado ,
					'params.nmsituac':0 ,
					'params.nmsuplem':view.nmsuplem,
					bloques:["B18","B19","B19B"]
				},
				success:function(json){
					Ice.log(json);
					var paso2 = 'Evaluando validaciones';
					try {
    					var list = json.list || [];
    					if (list.length>0) { 
    					   
    					   
    					   Ext.create('Ice.view.bloque.VentanaValidaciones', {
                               lista: list
                           }).mostrar();
    					   
    					   list.forEach(function(it){
    						   if((it.tipo+'').toLowerCase()=='error')
    							   throw "Favor de revisar las validaciones"
    					   })
    					}
    					
    					if (params && params.success) {
    						params.success();
					    }
				    } catch (e) {
				        Ice.manejaExcepcion(e, paso);
                        if (params && params.failure) {
                            params.failure();
                        }
				    }
				},
				failure: function () {
				    if (params && params.failure) {
				        params.failure();
				    }
				}
			});
		} catch (e) {
			Ice.manejaExcepcion(e, paso);
			if (params && params.failure) {
			    params.failure();
			}
		}
	},
	
  editarCoberturaMovil:function(grid,idx,tar,sel) {
   	try{
 		var me =grid.up("bloquecoberturas");
 		//var sel =Ext.ComponentQuery.query("#gridCoberturas")[0].getSelection();
 			me.config.cdgarant=sel.get("cdgarant")
 			me.config.cdcapita=sel.get("cdcapita")
 			var form=me.down('[xtype=formpanel]');
      		form.removeAll();
    			
    		 var comps = Ice.generaComponentes({
	                pantalla: 'TATRIGAR',
	                seccion: 'TATRIGAR',
	                modulo: me.config.modulo || '',
	                estatus: (me.config.flujo && me.config.flujo.estatus) || '',
	                cdramo: me.config.cdramo || '',
	                cdtipsit: me.config.cdtipsit ||'',
	                auxKey: me.config.auxkey || '',
	                cdgarant:me.config.cdgarant || '',
	                items: true
	            });
    		 
    		 
            Ice.log('Ice.view.bloque.Coberturas.initComponent comps:', comps);	
            var mpolicap=Ice.generaComponentes({
                pantalla: 'BLOQUE_COBERTURAS',
                seccion: 'MPOLICAP',
                modulo: me.config.modulo || '',
                estatus: (me.config.flujo && me.config.flujo.estatus) || '',
                cdramo: me.config.cdramo || '',
                cdtipsit: me.config.cdtipsit ||'',
                auxKey: me.config.auxkey || '',
                items: true
               
            });
            mpolicap.BLOQUE_COBERTURAS.MPOLICAP.items.forEach(function(it,idx){
            	it.tabla="MPOLICAP"
            })
            
            form.setTitle(sel.get("cdgarant")+" - "+sel.get('dsgarant'))
            form.removeAll();
            form.add(mpolicap.BLOQUE_COBERTURAS.MPOLICAP.items);
            form.add(comps.TATRIGAR.TATRIGAR.items);
            this.cargarValores(form);
            
 	}catch(e){
 		Ice.generaExcepcion(e,paso)
 	}
   
 },
 
 borraCoberturaMovil:function(btn) {
     var paso="";
     try{
    	 var record=btn.up("bloquecoberturas").down("#gridCoberturas").getSelection();
         var grid=btn.up("bloquecoberturas").down("#gridCoberturas");
         
         var ventana=Ext.MessageBox.confirm?Ext.MessageBox : Ext.Msg
         ventana.confirm ("Borrar Cobertura","\u00bfEstás seguro de borrar la cobertura?",function(opc){
   		  if(opc==='yes'){
   			  Ice.request({
           		  url:Ice.url.bloque.coberturas.borrarCobertura,
           		  params:{
           			  'params.cdunieco':record.get('cdunieco'),
           			  'params.cdramo':record.get('cdramo'),
           			  'params.estado':record.get('estado'),
           			  'params.nmpoliza':record.get('nmpoliza'),
           			  'params.nmsituac':record.get('nmsituac'),
           			  'params.nmsuplem':record.get('nmsuplem'),
           			  'params.cdgarant':record.get('cdgarant'),
           			  'params.cdcapita':record.get('cdcapita'),
           			  'params.fevencim':record.get('fevencim'),
           			  'params.accion':'D'
           		  },
           		  mascara:"Borrando Cobertura...",
           		  success:function(){
           			  Ice.mensajeCorrecto({
           				  titulo:"Correcto",
           				  mensaje:"Cobertura borrada"
           			  });
           			  grid.getStore().load()
           		  }
           	  });
   		  }
   	  })
   	 
     }catch(e){
   	  Ice.generaExcepcion(e,paso)
     }
 },
 agregarCoberturaMovil:function(btn){
	 var paso="";
	 try{
		 var me=this;
		 var view=btn.up("bloquecoberturas").config;
		 var list=[];
		 Ext.ComponentQuery.query("#agregables")[0].getStore().getData().items.forEach(function(it,idx){
 			
 			Ice.log("Data: ",it.data)
 			
 			if(it.data.amparada){
 				var obj={
						
						cdgarant:it.data.cdgarant,
						cdcapita:it.data.cdcapita
						
					}
				Ice.log("p-",obj)
				list.push(obj);
 			}
 			
 			
 		})
 		
 		Ice.request({
 	    		url:Ice.url.bloque.coberturas.agregarCobertura,
 	    		jsonData:{
 	    			list:list,
 	    			params:{
 	    				cdunieco	:		view.cdunieco,
 	    				cdramo		:		view.cdramo,
 	    				estado		:		view.estado,
 	    				nmpoliza	:		view.nmpoliza,
 	    				nmsituac	:		view.nmsituac,
 	    				nmsuplem	:		view.nmsuplem
 	    				
 	    			}
 	    		},
 	    		success:function(){
 	    			var paso=""
 	    			try{
 	    				paso="cargando coberturas"
 	    					var gridCoberturas=Ext.ComponentQuery.query("#gridCoberturas")[0];
 	    				var agre=Ext.ComponentQuery.query("#agregables")[0];
	    	    			gridCoberturas.getStore().load()
	    	    			agre.getStore().load()
	    	    			Ice.mensajeCorrecto({
	    	    				titulo:'Correcto',
	    	    				mensaje:"Datos guardados correctamente"
	    	    			})
	    	    			
	    	    			me.cerrarAgregar(btn)
 	    			}catch(e){
 	    				Ice.generaExcepcion(e,paso)
 	    			}
 	    		}
 	    	});
 	
	 }catch(e){
		 Ice.generaExcepcion(e,paso)
	 }
 },
 
 cerrarAgregar:function(btn){
	 var paso="";
	 try{

  		btn.up("[xtype=bloquecoberturas]").getItems().items.forEach(function(it){
  			it.setHidden(false)
  		})
  		Ext.ComponentQuery.query("#panela")[0].setHidden(true)
	 }catch(e){
		 Ice.generaExcepcion(e,paso)
	 }
 },
 
 guardarCobertura:function(me){ 
 	
 	var paso=""
 	try{
 		
	    	var view = this.getView();
	    	var form = me.up('form');
	    	var elementos=[]
	    	form.items.items.forEach(function(it,idx){
	    		elementos.push({
	    			valor:it.getValue(),
	    			valorOriginal:it.valorOriginal,
	    			name:it.name,
	    			tabla:it.tabla
	    		})
	    	});
	    	Ice.request({
	    		url:Ice.url.bloque.coberturas.guardarCoberturas,
	    		jsonData:{
	    			list:elementos,
	    			params:{
	    				'cdunieco':view.cdunieco,
		    			'cdramo':view.cdramo,
		    			'estado':view.estado,
		    			'nmpoliza':view.nmpoliza,
		    			'nmsuplem':view.nmsuplem,
		    			'nmsituac':view.nmsituac,
		    			'cdgarant':view.cdgarant,
		    			'cdcapita':view.cdcapita
	    			}
	    		},
	    		success:function(json){
	    			
	    			Ice.log("-->_",json)
	    			var paso="";
	    			try{
	    				var list=json.list || [];
		    			
		    			if(list.length!=0){
		    				
		    				
		    				Ice.log("-list->",list)
		    				Ext.create('Ice.view.bloque.VentanaValidaciones', {
		                                lista: list
		                            }).mostrar();
		    				list.forEach(function(it){
	    						   if((it.tipo+'').toLowerCase()=='error')
	    							   throw "Favor de revisar las validaciones"
	    					   })
		    				
		    				
		    			}else{
		    				Ice.mensajeCorrecto({
			    				titulo:'Correcto',
			    				mensaje:"Datos guardados correctamente"
			    			});
		    			}
		    			
		    			
		    			view.down("#gridCoberturas").store.load();
	    			}catch(e){
	    				Ice.manejaExcepcion(e, paso);
	    			}
	    			
	    		}
	    	});
	    	
	    	this.guardar()
 	}catch(e){
 		Ice.generaExcepcion(e,paso)
 	}
 	
 },
 guardarCoberturaMovil:function(me){
	 var paso=""
		 	try{
		 		
			    	var view = this.getView();
			    	var form = me.up('formpanel');
			    	Ice.log(":::::::",view,me,form)
			    	var elementos=[]
			    	form.items.items.forEach(function(it,idx){
			    		
			    		if(it.referenceKey){
				    		elementos.push({
				    			valor:it.getValue(),
				    			valorOriginal:it.valorOriginal,
				    			name:it.referenceKey,
				    			tabla:it.tabla
				    		})
			    		}
			    		
			    	});
			    	Ice.request({
			    		url:Ice.url.bloque.coberturas.guardarCoberturas,
			    		jsonData:{
			    			list:elementos,
			    			params:{
			    				'cdunieco':view.getCdunieco(),
				    			'cdramo':view.config.cdramo,
				    			'estado':view.config.estado,
				    			'nmpoliza':view.config.nmpoliza,
				    			'nmsuplem':view.config.nmsuplem,
				    			'nmsituac':view.config.nmsituac,
				    			'cdgarant':view.config.cdgarant,
				    			'cdcapita':view.config.cdcapita
			    			}
			    			
			    			
			    		}
			    	,
			    		success:function(json){
			    			
			    			
			    			var paso="";
			    			try{
			    				var list=json.list || [];
				    			
				    			if(list.length!=0){
				    				Ext.create('Ice.view.bloque.VentanaValidaciones', {
		                                lista: list
		                            }).mostrar();
				    				list.forEach(function(it){
			    						   if((it.tipo+'').toLowerCase()=='error')
			    							   throw "Favor de revisar las validaciones"
			    					   })
				    			}else{
				    				Ice.mensajeCorrecto({
					    				titulo:'Correcto',
					    				mensaje:"Datos guardados correctamente"
					    			});
				    			}
				    			
				    			
				    			Ext.ComponentQuery.query("#gridCoberturas")[0].getStore().load();
			    			}catch(e){
			    				Ice.generaExcepcion(e,paso);
			    			}
			    			
			    		}
			    	});
			    	
			    	//this.guardar()
		 	}catch(e){
		 		Ice.generaExcepcion(e,paso)
		 	}
 },
 
 mostrarCoberturas:function(grid,rowIndex,colIndex) {
			try {
				var me = grid.up('bloquecoberturas')
				var paso = 'limpiando grids'
				var gridCoberturas = me
						.down('#gridCoberturas');
				gridCoberturas.store
						.removeAll();
				gridCoberturas.setHidden(false);
				
				me
						.down(
								'[xtype=form]')
						.removeAll();
				paso = 'consultando coberturas'
				var record = grid
						.getStore()
						.getAt(
								rowIndex);
				 paso = "Evento selecciona cobertura "
				
				gridCoberturas.store.proxy.extraParams = {
					'params.pv_cdunieco_i' : me.cdunieco,
					'params.pv_cdramo_i' : me.cdramo,
					'params.pv_estado_i' : me.estado,
					'params.pv_nmpoliza_i' : me.nmpoliza,
					'params.pv_nmsuplem_i' : me.nmsuplem,
					'params.pv_nmsituac_i' : record.get('nmsituac')
				}
				paso = "estableciendo nmsituac";
				me.config.nmsituac = record.get('nmsituac');
				me.setNmsituac(record.get('nmsituac'));
				
				Ext.ComponentQuery.query("[xtype=bloquelistasituaciones]")[0].nmsitac=record.get('nmsituac')
				gridCoberturas.store
						.load()
				gridCoberturas.store.filter('amparada','S')
				gridCoberturas
						.up('[xtype=bloquecoberturas]').nmsituac = record
						.get('nmsituac')
						
			} catch (e) {
				Ice.generaExcepcion(e,	paso);
			}
		},
onItemTabSituaciones:function(grid,idx,target,record){
	try{
		var me = grid.up("bloquecoberturas");
		me.down("[xtype=formpanel]").removeAll();
		me.config.nmsituac=record.get("nmsituac");
	    me.down("#gridCoberturas").getStore().proxy.extraParams['params.pv_nmsituac_i']=me.config.nmsituac
	    me.down("#gridCoberturas").getStore().load()
	    me.down("#gridCoberturas").getStore().filter('amparada','S')
		
	    Ice.log(me.config.nmsituac)
	}
	catch(e){
		Ice.generaExcepcion(e,	paso);
	}
},

mostrarPanelCoberturas:function(btn) {
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
    
    
});