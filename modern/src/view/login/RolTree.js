/**
 * Created by jtezva on 5/15/2017.
 */
Ext.define('Ice.view.login.RolTree', {
    extend: 'Ext.dataview.DataView',
    xtype: 'roltree',
    
    
    // validacion y modificacion de config
    constructor: function (config) {
        Ice.log('Ice.view.login.RolTree.constructor config:', config);
        this.callParent(arguments);
    },
    
    
    // configuracion que no usa config
    controller: 'roltree',
    
    center: true,
    
    store: {
        autoLoad: true,
        fields: [
            'cdsisrol',
            'dssisrol'
        ],
        proxy: {
            type: 'ajax',
            url: Ice.url.core.recuperarRoles,
            reader: {
                type: 'json',
                rootProperty: 'list',
                successProperty: 'success',
                messageProperty: 'message'
            }
        }
    },
    
    style: 'padding: 20px 0px 0px 20px;',
    itemTpl: new Ext.XTemplate(
        '<tpl for=".">',
            '<div style="float: left; margin: 0px 20px 20px 0px; padding: 10px; background: white;" class="thumb-wrap shadow">',
              '<table border="0">',
                '<tr><td align="center"><img src="resources/images/logo_sura_header.png" /></td></tr>',
                '<tr><td align="center">{dssisrol}</td></tr>',
              '</table>',
            '</div>',
        '</tpl>'
    ),
    itemSelector: 'div.thumb-wrap',
    
    listeners: {
        select: 'onSelect'
    },
    
    
    // propiedades no ext (para generar getters y setters)
    config: {},
    
    
    // configuracion que usa config (se encuentra en this)
    initialize: function () {
        Ice.log('Ice.view.login.RolTree.initComponent');
        var me = this,
            paso = 'Contruyendo selector de roles';
        try {
            var secciones = Ice.generaComponentes({
                pantalla: 'ROLTREE',
                seccion: 'ROLTREE'
            });
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});