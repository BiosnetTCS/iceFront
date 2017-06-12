Ext.define('Ice.view.bloque.Coberturas', {
	
		extend  :       'Ext.Panel',
		xtype	:		'bloquecoberturas',
		
		constructor: function (config) {
	        Ice.log('Ice.view.bloque.DatosGenerales.constructor config:', config);
	        var me = this,
	            paso = 'Validando construcci\u00f3n de bloque de datos generales';
	            try {
	                
	            } catch (e) {
	                Ice.generaExcepcion(e, paso);
	            }
	        me.callParent(arguments);
	    },
		
});