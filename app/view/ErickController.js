/**
 * Created by DEORTIZT on 5/5/2017.
 */
Ext.define('Ice.view.ErickController', {
    extend: 'Ext.app.ViewController',
    alias:  'controller.erickCntlr',
    
    imprimeNombre: function(objeto){
        Ext.Msg.alert('Nombre','Erick');
        if(!Ext.isEmpty(objecto)){
            if(!Ext.isEmpty(objeto['callback'])){
                if(objeto['callback'] typeof === 'function'){
                    objeto['callback']();
                }
            }
        }
    }
});