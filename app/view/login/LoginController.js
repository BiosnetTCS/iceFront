/**
 * Created by jtezva on 5/15/2017.
 */
Ext.define('Ice.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',
    
    onAceptarClic: function () {
        Ice.log('Ice.view.login.LoginController.onAceptarClic');
        this.login();
    },
    
    login: function () {
        Ice.log('Ice.view.login.LoginController.login');
        var me = this,
            paso;
        try {
            paso = 'Validando datos';
            var refs = me.getReferences(),
                form = refs.form,
                values = form.getValues();
            Ice.request({
                mascara: 'Iniciando sesi\u00f3n',
                url: Ice.url.core.login,
                params: {
                    'params.user': values.cdusuari || '',
                    'params.password': values.password || ''
                },
                success: function (action) {
                    var paso2 = 'Redireccionando...';
                    try {
                        Ice.query('#mainView').getController().redirectTo('login.action', true);
                    } catch (e) {
                        Ice.manejaExcepcion(e, paso2);
                    }
                }
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    }
});