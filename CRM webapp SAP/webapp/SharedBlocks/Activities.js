
sap.ui.define(['sap/uxap/BlockBase'],
	function (BlockBase) {
		"use strict";

		var Activities = BlockBase.extend("sap.uxap.sample.SharedBlocks.Activities", {
			metadata: {
				views: {
					Collapsed: {
						viewName: "sap.uxap.sample.SharedBlocks.Activities",
						type: "XML"
					},
					Expanded: {
						viewName: "sap.uxap.sample.SharedBlocks.Activities",
						type: "XML"
					}
				}
			},
			renderer: {}
		});
		return Activities;

	});
