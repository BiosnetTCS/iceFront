Ext.define('Ice.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    listen : {
        controller : {
            '#' : {
                unmatchedroute: 'onRouteChange'
            }
        }
    },

    routes: {
        //':node': 'onRouteChange'  jtezva: vacio para poner cadena get completa
    },

    config: {
        showNavigation: true
    },

    collapsedCls: 'main-nav-collapsed',

    init: function (view) {
        var me = this,
            refs = me.getReferences();

        me.callParent([ view ]);

        me.nav = refs.navigation;
        me.navigationTree = refs.navigationTree;
    },

    onNavigationItemClick: function () {
        // The phone profile's controller uses this event to slide out the navigation
        // tree. We don't need to do anything but must be present since we always have
        // the listener on the view...
    },

    onNavigationTreeSelectionChange: function (tree, node) {
        var to = node && node.get('url');

        if (to) {
            this.redirectTo(to);
        }
    },

    onRouteChange: function (id) {
        this.setCurrentView(id);
    },

    onSwitchToClassic: function () {
        Ext.Msg.confirm('Switch to Classic', 'Are you sure you want to switch toolkits?',
                        this.onSwitchToClassicConfirmed, this);
    },

    onSwitchToClassicConfirmed: function (choice) {
        if (choice === 'yes') {
            var s = location.search;

            // Strip "?modern" or "&modern" with optionally more "&foo" tokens following
            // and ensure we don't start with "?".
            s = s.replace(/(^\?|&)modern($|&)/, '').replace(/^\?/, '');

            // Add "?classic&" before the remaining tokens and strip & if there are none.
            location.search = ('?classic&' + s).replace(/&$/, '');
        }
    },

    onToggleNavigationSize: function () {
        this.setShowNavigation(!this.getShowNavigation());
    },

    setCurrentView: function (hashTag) {
        hashTag = (hashTag || '').toLowerCase();

        var me = this,
            refs = me.getReferences(),
            mainCard = refs.mainCard,
            navigationTree = me.navigationTree,
            store = navigationTree.getStore(),
            node = store.findNode('url', hashTag),
            url = (node && node.get('url')) || 'page404',
            item = false; //mainCard.child('component[routeId=' + hashTag + ']'); jtezva para crear siempre nuevo

        if (!item) {
            var splitPuntoAction = url.indexOf('.action') !== -1 && url.split('.action'),
                splitNombreAction = splitPuntoAction && splitPuntoAction.length > 0 && splitPuntoAction[0].split('/'),
                nombreComp = (splitNombreAction && splitNombreAction.length > 0 && splitNombreAction[splitNombreAction.length - 1])
                    || 'page404',
                params = (splitPuntoAction && splitPuntoAction.length > 1 && splitPuntoAction[1]
                    && splitPuntoAction[1].indexOf('?') !== -1 && splitPuntoAction[1].split('?')[1]
                    && Ext.urlDecode(splitPuntoAction[1].split('?')[1])
                    ) || {};
            console.log('nombreComp:', nombreComp, 'params:', params);
            
            var config = Object.assign({
                xtype: nombreComp
                //routeId: hashTag,  // for existingItem search later (jtezva: comentado)
            }, params);
            
            console.log('config:', config);
            
            item = mainCard.add(config);
        }
        
        mainCard.setActiveItem(item);
        
        navigationTree.setSelection(node);

        //if (newView.isFocusable(true)) {
        //    newView.focus();
        //}
    },

    updateShowNavigation: function (showNavigation, oldValue) {
        // Ignore the first update since our initial state is managed specially. This
        // logic depends on view state that must be fully setup before we can toggle
        // things.
        //
        if (oldValue !== undefined) {
            var me = this,
                cls = me.collapsedCls,
                refs = me.getReferences(),
                logo = refs.logo,
                navigation = me.nav,
                navigationTree = refs.navigationTree,
                rootEl = navigationTree.rootItem.el;

            navigation.toggleCls(cls);
            logo.toggleCls(cls);

            if (showNavigation) {
                // Restore the text and other decorations before we expand so that they
                // will be revealed properly. The forced width is still in force from
                // the collapse so the items won't wrap.
                navigationTree.setMicro(false);
            } else {
                // Ensure the right-side decorations (they get munged by the animation)
                // get clipped by propping up the width of the tree's root item while we
                // are collapsed.
                rootEl.setWidth(rootEl.getWidth());
            }

            logo.element.on({
                transitionend: function () {
                    if (showNavigation) {
                        // after expanding, we should remove the forced width
                        rootEl.setWidth('');
                    } else {
                        navigationTree.setMicro(true);
                    }
                },
                single: true
            });
        }
    },

    toolbarButtonClick: function(btn){
        var href = btn.config.href;
        this.redirectTo(href);
    }
});
