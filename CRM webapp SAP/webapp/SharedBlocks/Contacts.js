sap.ui.define(['sap/uxap/BlockBase'],
	function (BlockBase) {
		"use strict";

var Contacts = BlockBase.extend("sap.uxap.sample.SharedBlocks.Contacts", {
    metadata: {
        views: {
            Collapsed: {
                viewName: "sap.uxap.sample.SharedBlocks.Contacts",
                type: "XML"
            },
            Expanded: {
                viewName: "sap.uxap.sample.SharedBlocks.Contacts",
                type: "XML"
            }
        }
    },
    renderer: {}
});
return Contacts;

});
