sap.ui.define(['sap/uxap/BlockBase'],
	function (BlockBase) {
		"use strict";

var Offers = BlockBase.extend("sap.uxap.sample.SharedBlocks.Offers", {
    metadata: {
        views: {
            Collapsed: {
                viewName: "sap.uxap.sample.SharedBlocks.Offers",
                type: "XML"
            },
            Expanded: {
                viewName: "sap.uxap.sample.SharedBlocks.Offers",
                type: "XML"
            }
        }
    },
    renderer: {}
});
return Offers;

});
