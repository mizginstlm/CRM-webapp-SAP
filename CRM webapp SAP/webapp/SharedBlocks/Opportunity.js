sap.ui.define(['sap/uxap/BlockBase'],
	function (BlockBase) {
		"use strict";

var Opportunity = BlockBase.extend("sap.uxap.sample.SharedBlocks.Opportunity", {
    metadata: {
        views: {
            Collapsed: {
                viewName: "sap.uxap.sample.SharedBlocks.Opportunity",
                type: "XML"
            },
            Expanded: {
                viewName: "sap.uxap.sample.SharedBlocks.Opportunity",
                type: "XML"
            }
        }
    },
    renderer: {}
});
return Opportunity;

});
