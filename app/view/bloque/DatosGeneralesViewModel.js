/**
 * Created by jtezva on 5/22/2017.
 */
Ext.define('Ice.view.bloque.DatosGeneralesViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.bloquedatosgenerales',
    
    requires: [
        'Ext.data.validator.*'
    ],
    
    constructor: function (config) {
        Ice.log('Ice.view.bloque.DatosGeneralesViewModel.constructor config:', config);
        var me = this,
            view = config.view,
            paso = 'Construyendo modelo de bloque de datos generales';
        try {
            me.callParent(arguments);
            
            var modelName = Ext.id();
            Ext.define(modelName, {
                extend: 'Ext.data.Model',
                fields: view.modelFields,
                validators: view.modelValidators
            });
            
            me.setLinks({
                datos: {
                    type: modelName,
                    create: true
                }
            });
            
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    }
});