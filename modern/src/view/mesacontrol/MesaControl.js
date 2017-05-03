Ext.define('Ice.view.mesacontrol.MesaControl', {
    extend: 'Ext.Container',
    xtype: 'mesacontrol',
    
    requires: [
        'Ext.form.Panel',
        'Ext.field.*'
    ],
    
    cls: 'dashboard',
    
    scrollable: true,
    
    items: [
        {
            xtype: 'formpanel',
            title: 'Sin responsive',
            
            userCls: 'big-100 small-100 dashboard-item shadow',
            
            items: [
                {
                    xtype: 'textfield',
                    label: 'campo 1'
                }, {
                    xtype: 'textfield',
                    label: 'campo 2'
                }, {
                    xtype: 'textfield',
                    label: 'campo 3'
                }
            ]
        }, {
            xtype: 'formpanel',
            title: 'Responsive ext',
            
            userCls: 'big-100 small-100 dashboard-item shadow',
            
            layout: 'default',
            
            items: [
                {
                    xtype: 'textfield',
                    label: 'campo 1',
                    userCls: 'big-50 small-100 dashboard-item'
                }, {
                    xtype: 'textfield',
                    label: 'campo 2',
                    userCls: 'big-50 small-100 dashboard-item'
                }, {
                    xtype: 'textfield',
                    label: 'campo 3',
                    userCls: 'big-50 small-100 dashboard-item'
                }
            ]
        }, {
            xtype: 'formpanel',
            title: 'Responsive custom',
            
            userCls: 'big-100 small-100 dashboard-item shadow',
            
            layout: 'default',
            
            items: [
                {
                    xtype: 'textfield',
                    label: 'campo 1',
                    style: 'float: left; margin: 0px 10px 10px 0px;',
                    userCls: 'big-50 small-100'
                }, {
                    xtype: 'textfield',
                    label: 'campo 2',
                    style: 'float: left; margin: 0px 10px 10px 0px;',
                    userCls: 'big-50 small-100'
                }, {
                    xtype: 'textfield',
                    label: 'campo 3',
                    style: 'float: left; margin: 0px 10px 10px 0px;',
                    userCls: 'big-50 small-100'
                }
            ]
        }
    ]
        /*
        layout: 'hbox',
        
        height: 380,

        platformConfig: {
            phone: {
                height: 300
            }
        },

        bodyPadding: 15,
        
        defaults: {
            userCls: 'big-50 small-100',
            style: 'border: 1px solid green;'
        },
        
        items: [
            {
                xtype: 'textfield',
                label: 'Primer campo'
            }, {
                xtype: 'textfield',
                label: 'Segundo campo'
            }, {
                xtype: 'textfield',
                label: 'Tercer campo'
            }, {
                xtype: 'textfield',
                label: 'Cuarto campo'
            }, {
                xtype: 'textfield',
                label: 'Quinto campo'
            }
        ]
    }]*/
});
