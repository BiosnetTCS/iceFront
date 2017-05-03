Ext.define('Ice.view.cotizacion.Cotizacion', {
    extend: 'Ext.container.Container',
    xtype: 'cotizacion',
    
    requires: [
        'Ext.ux.layout.ResponsiveColumn',
        'Ext.form.Panel',
        'Ext.form.field.*',
        'Ext.layout.container.Accordion'
    ],
    
    layout: {
        type: 'accordion',
        titleCollapse: false,
        animate: true,
        activeOnTop: false
    },
    
    defaultFocus: 'form',
    
    items: [
        {
            xtype: 'form',
            title: 'Datos generales',
            
            defaultFocus: 'numberfield:not([value]):focusable:not([disabled])',
            
            layout: 'responsivecolumn',
            defaults: {
                userCls: 'big-50 small-100',
                labelAlign: 'top'
            },
            
            items: [
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Cotizaci\u00f3n'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Agente'
                }, {
                    xtype: 'datefield',
                    fieldLabel: 'Inicio de vigencia',
                    value: new Date()
                }, {
                    xtype: 'datefield',
                    fieldLabel: 'Fin de vigencia'
                }
            ],
            
            buttons: [
                {
                    text: 'Continuar',
                    iconCls: 'x-fa fa-arrow-right'
                }
            ]
        }, {
            xtype: 'form',
            title: 'Riesgo'
        }, {
            xtype: 'form',
            title: 'Coberturas'
        }
    ]
});
