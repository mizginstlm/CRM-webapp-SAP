sap.ui.define(['sap/uxap/BlockBase'],
	function (BlockBase) {
		"use strict";

var Competitors = BlockBase.extend("sap.uxap.sample.SharedBlocks.Competitors", {
    metadata: {
        views: {
            Collapsed: {
                viewName: "sap.uxap.sample.SharedBlocks.Competitors",
                type: "XML"
            },
            Expanded: {
                viewName: "sap.uxap.sample.SharedBlocks.Competitors",
                type: "XML"
            }
        }
    },
    renderer: {}
});
return Competitors;

});
