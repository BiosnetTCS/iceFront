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
        	
        	
        	view.down('[xtype=bloquelistasituaciones]').on({
        		select:function(grid,record){
        	    	try{
        	    		Ice.log("-->",record,"view",view)
        	    		var paso="Evento selecciona cobertura "
        	    		var nmsituac=record.get('nmsituac')
        	    		Ice.log("nmsituac: ",nmsituac)
        	    		// aqui mandar los datos de a deveras
        	    		view.down('[xtype=gridpanel]').store.load()
        	    		
        	    	}catch(e){
        	    		Ice.generaExcepcion(e, paso);
        	    	}
        	    }
        	})
        	
        	view.down('[xtype=gridpanel]').on({
        		select:function(grid,record){
        	    	try{
        	    		var paso="Evento selecciona cobertura "
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
//        	                columns: true,
//        	                fields:true
        	            });
        	            Ice.log('Ice.view.bloque.ListaSituaciones.initComponent comps:', comps);	
        	            var form=view.down('[xtype=form]');
        	            form.removeAll();
        	            form.add(comps.COBERTURAS.GARANTIAS.items)
        	               
        	    		
        	    	}catch(e){
        	    		Ice.generaExcepcion(e, paso);
        	    	}
        	    }
        	})
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
	
    cargarSituaciones:function(){
    	
    	var me = this,
        view = me.getView();
		view.down("[xtype=bloquelistasituaciones]").store.load();
    	alert();
	},
	
	agregarCobertura:function(me){
		var paso="";
		try{
			paso="Generando ventana para añadir cobertura";
			var me = this,
	        view = me.getView();
			var gridCoberturas=view.down("[xtype=gridpanel]");
			
			Ice.log("gridCoberturas:",gridCoberturas)
			var store2= new Ext.data.Store({
				proxy:{
                    type: 'ajax',
                    autoLoad: true,
                    url: Ice.url.bloque.coberturas.datosCoberturas,
                    reader: {
                        type: 'json',
                        //rootProperty: 'roles',
                        successProperty: 'success',
                        messageProperty: 'message'
                    }
                }
			});
			Ext.create('Ext.window.Window', {
			    title: 'Añadir cobertura',
			    height: 200,
			    width: 400,
			    layout: 'fit',
			    items: [{  // Let's put an empty grid in just to illustrate fit layout
			        xtype: 'grid',
			        border: false,
			        itemId:"gridAgrega",
			        columns: gridCoberturas.columns,                 // One header just for show. There's no data,
			        store: store2 // A dummy empty data store
			    }],
			    buttons:[{
			    	xtype	: 'button',
			    	text	: 'Agregar',
			    	handler : function(me){
			    		
			    		Ext.ComponentQuery.query("#gridAgrega").forEach(function(it,idx){
			    			it.store.data.forEach(function(e,i){
			    				Ice.log("item..:",e)
			    				if(e.amparada){
			    					gridCoberturas.add(e);
			    				}
			    			})
			    		})
			    	}
			    }]
			}).show();
			store2.load();
		}catch(e){
			Ice.generaExcepcion(e, paso);
		}
	}
    
    
});