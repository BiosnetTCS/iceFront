/**
 * Created by DCACORDE on 5/22/2017.
 */
Ext.define('Ice.view.bloque.SituacionesRiesgo', {	
	    extend: 'Ext.Panel',
	    xtype: 'bloquesituacionesriesgo',
	    
	    controller: 'bloquesituacionesriesgo',
	    viewModel: 'bloquesituacionesriesgo',
	    
	    requires: [
	        'Ext.ux.layout.ResponsiveColumn'
	    ],
	    
	    
	    // validacion de parametros de entrada
	    constructor: function (config) {
	        Ice.log('Ice.view.bloque.SituacionesRiesgo.constructor config:', config);
	        var me = this,
	            paso = 'Validando construcci\u00f3n de bloque situaciones de riesgo';
	            try {
	                if (!config) {
	                    throw 'No hay datos para bloque situaciones de riesgo';
	                }
	                
	                if (!config.cdramo || !config.cdtipsit) {
	                    throw 'Falta ramo y tipo de situaci\u00f3n para bloque de situaciones de riesgo';
	                }
	                
	                config.modulo = config.modulo || 'COTIZACION';
	                
	            } catch (e) {
	                Ice.generaExcepcion(e, paso);
	            }
	        me.callParent(arguments);
	    },
	    
	    
	    // configuracion del componente (no EXT)
	    config: {
	        datosFijosNuevos: true,
	        datosVariablesNuevos: true,
	        camposDisparanValoresDefectoFijos: [
	            'cdtipsit'
	        ]
	    },
	    
	    
	    // configuracio ext
	    title: 'Situaciones de riesgo',
	    
	 // para el responsive small-(%) big-(%)
//	    layout: 'responsivecolumn',
	    
//	    modelValidation: true,
	    
//	    bodyPadding: '10px 0px 0px 10px',
//	    defaults: {
//	        margin: '0px 10px 10px 0px',
//	        cls: 'big-50 small-100'
//	    },
	    
//	    buttons: [
//	        {
//	            text: 'Agregar',
//	            iconCls: 'x-fa fa-plus-circle',
//	            handler: 'onAgregarClic'
//	        }
//	    ],
	    
	    // contruccion usando metodos ext y parametros de entrada
	    initComponent: function () {
	        Ice.log('Ice.view.bloque.SituacionesRiesgo.initComponent');
	        var me = this,
	            paso = 'Construyendo bloque situaciones de riesgo';
	        try {
	            var comps = Ice.generaComponentes({
	                pantalla: 'BLOQUE_LISTA_SITUACIONES',
	                seccion: 'LISTA',
	                modulo: me.modulo || '',
	                estatus: (me.flujo && me.flujo.estatus) || '',
	                cdramo: me.cdramo || '',
	                cdtipsit: me.cdtipsit ||'',
	                auxKey: me.auxkey || '',
	                items: true,
	                validatos: true
	            });
	            Ice.log('Ice.view.bloque.SituacionesRiesgo.initComponent comps:', comps);
	            
	         // agregar binding a los componentes
	            for (var i = 0; i < comps.BLOQUE_LISTA_SITUACIONES.LISTA.items.length; i++) {
	                var item = comps.BLOQUE_LISTA_SITUACIONES.LISTA.items[i];
	                item.bind = '{datos.' + item.name + '}';
	            }
	            
	            Ice.log('items con bind:', comps.BLOQUE_LISTA_SITUACIONES.LISTA.items);
	            
	            // creando modelo para validaciones
	            var modelName = Ext.id();
	            Ext.define(modelName, {
	                extend: 'Ext.data.Model',
	                fields: comps.BLOQUE_LISTA_SITUACIONES.LISTA.fields,
	                validators: comps.BLOQUE_LISTA_SITUACIONES.LISTA.validators
	            });
	            
	            Ext.apply(me, {
	                items: [
	                    {
	                        xtype: 'bloquelistasituaciones',
	                        cdramo: '501',
	                        cdtipsit: '51',
	                        tbar: [
	                            {
	                                text: 'Agregar',
	                                iconCls: 'x-fa fa-plus-circle',
	                                handler: function(){
	                                    Ice.log('Agregar ',this);
	                                    me.getController().onAgregarClic();
	                                }	                                    
	                            }
	                        ],
	                        actionColumns: [
	                            {
	                                xtype:'actioncolumn',
	                                items: [{
	                                    iconCls: 'x-fa fa-edit',
	                                    tooltip: 'Editar',
	                                    handler: function(grid, rowIndex, colIndex) {
	                                        me.getController().onActualizar(grid, rowIndex, colIndex);
	                                    }
	                                },{
	                                    iconCls: 'x-fa fa-minus-circle',
	                                    tooltip: 'Borrar',
	                                    handler: function(grid, rowIndex, colIndex){
	                                        me.getController().onBorrarClic(grid, rowIndex, colIndex);
	                                    }
	                                }]
	                            }
	                        ]
	                    },{
	                        xtype: 'form',
	                        title: 'Editar situacion de riesgo',
	                        items: comps.BLOQUE_LISTA_SITUACIONES.LISTA.items,
	                        modelo: modelName,
	                        layout: 'responsivecolumn',
	                        hidden: true,
	                        buttons: [
	                            {
	                                xtype: 'button',
	                                text: 'Guardar',
	                                handler: 'onGuardar'
	                            },{
	                                xtype: 'button',
	                                text: 'Cancelar',
	                                handler: function (me){
	                                    var paso = '';
	                                    try{
	                                        paso = 'Antes de ocultar formulario de situacion';
	                                        me.up('form').hide();
	                                    } catch (e){
	                                        Ice.generaExcepcion(e, paso);
	                                    }
	                                }
	                            }
	                        ],
                            defaults: {
                                margin: '10px 10px 10px 0px',
                                cls: 'big-50 small-100'
                            }
	                    }
	                ]
	            });
	        } catch (e) {
	            Ice.generaExcepcion(e, paso);
	        }
	        
	        
	        // construir componente
	        me.callParent(arguments);
	        
	        
	        // comportamiento
	        paso = '';
//	        try {
//	            me.getController().custom();
//	        } catch (e) {
//	            Ice.generaExcepcion(e, paso);
//	        }
	    }
	
});