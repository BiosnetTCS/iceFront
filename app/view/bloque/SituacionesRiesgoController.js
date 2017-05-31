/**
 * Created by jtezva on 5/22/2017.
 */
Ext.define('Ice.view.bloque.SituacionesRiesgoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bloquesituacionesriesgo',
    
    custom: function () {
        Ice.log('Ice.view.bloque.SituacionesRiesgoController.custom');
        var me = this,
            view = me.getView(),
            paso = 'Configurando comportamiento de bloque situaciones de riesgo';
            Ice.log('view: ',view);
        try {
            var refs = view.getReferences() || {};
            Ice.log('Ice.view.bloque.DatosGeneralesController refs:', refs);
            
            // agregar disparadores valores defecto fijos
            for (var i = 0; i < view.getCamposDisparanValoresDefectoFijos().length; i++) {
                var name = view.getCamposDisparanValoresDefectoFijos()[i];
                if (refs[name]) {
                    refs[name].setFieldStyle('border-left: 3px solid yellow;');
                    refs[name].on({
                        blur: function () {
                            me.cargarValoresDefectoFijos();
                        }
                    });
                }
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
  onAgregarClic: function () {
      this.agregar();
  },
  
  onBorrarClic: function (grid, rowIndex, colIndex) {
      this.borrar(grid, rowIndex, colIndex);
  },
  
  onGuardar: function () {
      this.guardar();
  },
  
  onActualizar: function (grid, rowIndex, colIndex) {
      this.actualizar(grid, rowIndex, colIndex);
  },
  
  agregar: function(){
      Ice.log('Ice.view.bloque.situacionesRiesgo.agregar');
      var me = this,
          view = me.getView(),
          paso = "";
      try{
          Ice.log('View items ',view.down('grid'));
          paso = "Antes de agregar situacion de riesgo";
          Ice.suspendEvents(view);
          var store = view.down('grid').getStore(),
              form = view.down('form');
          Ice.request({
              mascara: 'Agregando situacion de riesgo',
              url: Ice.url.bloque.situacionesRiesgo.agregar,
              params: {},
              success: function (json) {
                  var paso2 = 'LLenando store';
                  try {
                      Ice.log("situacion",json.situacion);                        
                      if(json.situacion){
//                          store.add(json.situacion);
                          var refs = view.getReferences();
                          for (var att in json.situacion) {
                              if (refs[att]) {
                                  refs[att].setValue(json.situacion[att]);
                              }
                          }
                      }
                      Ice.log('form',form);
                      form.show();
                      Ice.resumeEvents(view);
                  } catch (e) {
                      Ice.manejaExcepcion(e, paso2);
                  }
              }
          });
      } catch (e) {
          Ice.manejaExcepcion(e, paso);
      }
  },
  
  actualizar: function(grid, rowIndex, colIndex){
      Ice.log('Ice.view.bloque.situacionesRiesgo.actualizar grid',grid,' rowIndex ',rowIndex,' colIndex ',colIndex);
      var me = this,
          view = me.getView(),
          paso = "";
      try{
          Ice.log('View items ',view.down('grid'));
          paso = "Antes de editar situacion de riesgo";
          Ice.suspendEvents(view);
          var store = view.down('grid').getStore(),
              form = view.down('form'),
              data = store.getAt(rowIndex).data;
          Ice.log('Data ',data);
          Ice.request({
              mascara: 'Editando situacion de riesgo',
              url: Ice.url.bloque.situacionesRiesgo.carga,
              params: {
                  'params.cdunieco': data.cdunieco,
                  'params.cdramo': data.cdramo,
                  'params.estado': data.estado,
                  'params.nmpoliza': data.nmpoliza,
                  'params.nmsituac': data.nmsituac,
                  'params.cdtipsit': data.cdtipsit,
                  'params.nmsuplem': data.nmsuplem
              },
              success: function (json) {
                  var paso2 = 'LLenando store';
                  try {
                      Ice.log('json',json);
                      if(json.situacion){
                          var situacion = json.situacion; 
                          Ice.log("situacion",situacion);
//                          store.add(json.situacion);
                          var refs = view.getReferences();
                          for (var att in situacion) {
                              if (refs[att]) {
                                  refs[att].setValue(situacion[att]);
                              }
                          }
                      }
                      Ice.log('form',form);
                      form.show();
                      Ice.resumeEvents(view);
                  } catch (e) {
                      Ice.manejaExcepcion(e, paso2);
                  }
              }
          });
      } catch (e) {
          Ice.manejaExcepcion(e, paso);
      }
  },
  
  borrar: function(grid, rowIndex, colIndex){
      Ice.log('Ice.view.bloque.SituacionesRiesgoController.borrar  grid: ', grid, ' rowindex: ', rowIndex, ' colindex: ', colIndex);
      var me = this,
          view = me.getView(),
          paso = "",
          store = view.down('grid').getStore();
      try{
          paso = "Antes de borrar situacion de riesgo";
          Ice.suspendEvents(view);
          var situacion = store.getData().getAt(rowIndex).getData();            
          Ice.log('situacion: ',situacion);
          Ice.request({
              mascara: 'Borrando situacion de riesgo',
              url: Ice.url.bloque.situacionesRiesgo.borrar,
              params: {
                  nmsituac: situacion.nmsituac
              },
              success: function (json) {
                  var paso2 = 'Antes de recargar store';
                  try {
                      store.reload();
                      Ice.resumeEvents(view);
                  } catch (e) {
                      Ice.manejaExcepcion(e, paso2);
                  }
              }
          });
      } catch (e) {
          Ice.manejaExcepcion(e, paso);
      }
  },
  
  cargarValoresDefectoFijos: function () {
      Ice.log('Ice.view.bloque.SituacionesRiesgoController.cargarValoresDefectoFijos');
      var me = this,
          view = me.getView(),
          refs = view.getReferences();
      var paso = 'Cargando valores por defecto fijos de datos generales';
      try {
          if (view.getDatosFijosNuevos() !== true) {
              Ice.logWarn('Ice.view.bloque.SituacionesRiesgoController.cargarValoresDefectoFijos los datos fijos no son nuevos');
              return;
          }
          
          var errores = Ext.create(view.modelo, view.getValues()).getValidation().getData();
          
          for (var i = 0; i < view.getCamposDisparanValoresDefectoFijos().length; i++) {
              var name = view.getCamposDisparanValoresDefectoFijos()[i];
              if (refs[name] && errores[name] !== true) {
                  Ice.logWarn('Ice.view.bloque.SitacionesRiesgoController.cargarValoresDefectoFijos invalido <', name, ':', errores[name], '>');
                  return;
              }
          }
          Ice.log('Ice.view.bloque.SituacionesRiesgoController.cargarValoresDefectoFijos valores cargados ok');
          view.setDatosFijosNuevos(false);
      } catch (e) {
          Ice.manejaExcepcion(e, paso);
      }
  },
  
  cargarValoresDefectoVariables: function () {
      Ice.log('Ice.view.bloque.SituacionesRiesgoController.cargarValoresDefectoVariables');
      var me = this,
          view = me.getView(),
          refs = view.getReferences(),
          paso = 'Cargando valores por defecto variables de datos generales';
      try {
          if (view.getDatosVariablesNuevos() !== true) {
              Ice.logWarn('Ice.view.bloque.SituacionesRiesgoController.cargarValoresDefectoVariables los datos variables no son nuevos');
              return;
          }
          
          var errores = Ext.create(view.modelo, view.getValues()).getValidation().getData();
          
          for (var i = 0; i < view.getCamposDisparanValoresDefectoVariables().length; i++) {
              var name = view.getCamposDisparanValoresDefectoVariables()[i];
              if (refs[name] && errores[name] !== true) {
                  Ice.logWarn('Ice.view.bloque.SituacionesRiesgoController.cargarValoresDefectoVariables invalido <', name, ':', errores[name], '>');
                  return;
              }
          }
          Ice.log('Ice.view.bloque.SituacionesRiesgoController.cargarValoresDefectoVariables valores cargados ok');
          view.setDatosVariablesNuevos(false);
      } catch (e) {
          Ice.manejaExcepcion(e, paso);
      }
  },
  
  guardar: function (){
      Ice.log('Ice.view.bloque.SituacionesRiesgoController.guardar');
      var me = this,
          view = me.getView();
          paso = 'Antes de guardar valores situacion';
          var form = view.down('form');         
      try{
          form.hide();
          var store = view.down('grid').getStore();
          store.reload();
      } catch (e) {
          Ice.manejaExcepcion(e, paso);
      }   
      Ice.log('Ice.view.bloque.SituacionesRiesgoController.guardar ok');
  }
  
  
});