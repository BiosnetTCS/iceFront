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
        	
        	
//        	view.down('[xtype=bloquelistasituaciones]').on({
//        		select:function(grid,record){
//        	    		paso='consultanco coberturas'
//        	    		Ice.log("-->",record,"view",view)
//        	    		var paso="Evento selecciona cobertura "
//        	    		var nmsituac=record.get('nmsituac')
//        	    		Ice.log("nmsituac: ",nmsituac)
//        	    		// aqui mandar los datos de a deveras
//        	    		
//        	    		var gridCoberturas=view.down('#gridCoberturas')
//        	    		gridCoberturas.store.proxy.extraParams={
//        	    			'params.cdunieco':record.get('cdunieco'),
//        	    			'params.cdramo':record.get('cdramo'),
//        	    			'params.estado':record.get('estado'),
//        	    			'params.nmpoliza':record.get('nmpoliza'),
//        	    			'params.nmsuplem':record.get('nmsuplem'),
//        	    			'params.nmsituac':record.get('nmsituac')
//        	    			
//        	    		}
//        	    		gridCoberturas.store.load()
//        	    		gridCoberturas.store.filter('amparada', 'S')
//        	    		
//        	    	}catch(e){
//        	    		Ice.generaExcepcion(e, paso);
//        	    	}
//        	    }
//        	})
        	
//        	view.down('#gridCoberturas').on({
//        		select:function(grid,record){
//        	    	try{
//        	    		var paso="Evento selecciona cobertura "
//        	    		Ice.log("record:", record);	
//        	    		var comps = Ice.generaComponentes({
//        	                pantalla: 'COBERTURAS',
//        	                seccion: 'GARANTIAS',
//        	                modulo: me.modulo || '',
//        	                estatus: (me.flujo && me.flujo.estatus) || '',
//        	                cdramo: me.cdramo || '',
//        	                cdtipsit: me.cdtipsit ||'',
//        	                auxKey: me.auxkey || '',	                
//        	                items: true
////        	                columns: true,
////        	                fields:true
//        	            });
//        	            Ice.log('Ice.view.bloque.ListaSituaciones.initComponent comps:', comps);	
//        	            var form=view.down('[xtype=form]');
//        	            form.removeAll();
//        	            form.add(comps.COBERTURAS.GARANTIAS.items)
//        	               
//        	    		
//        	    	}catch(e){
//        	    		Ice.generaExcepcion(e, paso);
//        	    	}
//        	    }
//        	})
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
	
    cargarSituaciones:function(){
    	
    	var me = this,
        view = me.getView();
		view.down("[xtype=bloquelistasituaciones]").store.load();
    	
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
	//		                items: true,
	            columns: true,
	            fields:true
	        });
	        Ice.log('Ice.view.bloque.Coberturas.initComponent comps:', comps);
	        
			//var store= new Ext.data.Store();
			
			var chk=Ext.Array.findBy(comps.COBERTURAS.COBERTURAS_AGREGABLES.columns,function(it,idx){
            	if(it.dataIndex=='amparada'){
            		return true;
            	}
            })
           //alert();
            chk.xtype='checkcolumn'
			paso='recuperando datos de situacion'
				var gridCoberturas=view.down('#gridCoberturas')
	    		var record=gridCoberturas.store.getAt(0);
            	//Ice.log("store- :",store)
			Ext.create('Ext.window.Window', {
			    title: 'Añadir cobertura',
			   // height: 450,
			    width: 450,
			    layout: 'fit',
			    items: [{ 
			        xtype: 'grid',
			        border: false,
			        itemId:"gridAgrega",
			        columns: [
			            { text: 'Clave', dataIndex: 'cdgarant'  },
			            { text: 'Cobertura', dataIndex: 'dsgarant',flex: 2 },
			            { xtype: 'checkcolumn', text: 'Amparada', dataIndex: 'amparada'
			            }],          
			            
			        store: {
						fields: ['opcional',
							'cdgarant',
							'dsgarant',
							'deducible',
							'suma_asegurada',
							'amparada'],
						proxy:{
		                    type: 'ajax',
		                    autoLoad: true,
		                    extraParams:{
            	    			'params.pv_cdunieco_i':record.get('cdunieco'),
            	    			'params.pv_cdramo_i':record.get('cdramo'),
            	    			'params.pv_estado_i':record.get('estado'),
            	    			'params.pv_nmpoliza_i':record.get('nmpoliza'),
            	    			'params.pv_nmsuplem_i':record.get('nmsuplem'),
            	    			'params.pv_nmsituac_i':record.get('nmsituac')
            	    			
            	    		},
            	    		
		                    url: Ice.url.bloque.coberturas.datosCoberturas,
		                    reader: {
		                        type: 'json',
		                        rootProperty: 'slist1',
		                        successProperty: 'success',
		                        messageProperty: 'message'
		                    }
		                },
		                listeners:{
		                	load:function(st){
//		                		Ice.log("store:",st)
//		                		st.data.items.forEach(function(it,idx){
//		                			Ice.log("-->",it)
//		                			it.data.amparada='S'==it.data.amparada;
//		                		});
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
			    }],
			    buttons:[{
			    	xtype	: 'button',
			    	text	: 'Agregar',
			    	handler : function(me){
			    		Ext.ComponentQuery.query("#gridAgrega").forEach(function(it,idx){
			    			Ice.log("Data: ",it.store.getData())
			    			it.store.data.items.forEach(function(e,i){
			    				Ice.log("item..:",e)
			    				if(e.data.amparada){
			    					
			    					var obj={
			    							opcional: e.data.opcional,
			    							cdgarant:e.data.cdgarant,
			    							dsgarant:e.data.dsgarant,
			    							deducible:e.data.deducible,
			    							suma_asegurada: e.data.suma_asegurada,
			    							amparada:e.data.amparada?"S":"N"
			    						}
			    					Ice.log("p-",obj)
			    					i
			    					gridCoberturas.store.add(obj);
			    				}
			    			})
			    		})
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
          }catch(e){
        	  Ice.generaExcepcion(e,paso)
          }
      },
      
      editarCobertura:function(grid, rowIndex, colIndex) {
      	try{
      		me = this.getView()
    		var paso="Evento selecciona cobertura "
    		var record = grid.getStore().getAt(rowIndex);
    		Ice.log("record:", record);	
    		var comps = Ice.generaComponentes({
                pantalla: 'COBERTURAS',
                seccion: 'GARANTIAS',
                modulo: me.modulo || '',
                estatus: (me.flujo && me.flujo.estatus) || '',
                cdramo: me.cdramo || '',
                cdtipsit: me.cdtipsit ||'',
                auxKey: me.auxkey || '',	                
                items: true 
//                columns: true,
//                fields:true
            });
            Ice.log('Ice.view.bloque.ListaSituaciones.initComponent comps:', comps);	
            var form=me.down('[xtype=form]');
            form.removeAll();
            form.add(comps.COBERTURAS.GARANTIAS.items)
               
    		
    	}catch(e){
    		Ice.generaExcepcion(e, paso);
    	}
    }
    
    
});