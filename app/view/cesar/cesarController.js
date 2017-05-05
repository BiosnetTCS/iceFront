/**
 * Created by DCACORDE on 5/5/2017.
 */
Ext.define('Ice.view.cesar.cesarController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.cesarController',
//    listen : {
//        controller : {
//            '#' : {
//                unmatchedroute: 'onRouteChange'
//            }
//        }
//    },

    routes: {
        //':node': 'onRouteChange' jtezva: vacio para poner cadena get completa
    },

    lastView: null,
    buscar:function(){
    	alert();
    }
});
