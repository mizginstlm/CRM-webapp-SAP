
sap.ui.define(['sap/uxap/BlockBase'],
	function (BlockBase) {
		"use strict";

		var GroupCompany = BlockBase.extend("sap.uxap.sample.SharedBlocks.GroupCompany", {
			metadata: {
				views: {
					Collapsed: {
						viewName: "sap.uxap.sample.SharedBlocks.GroupCompany",
						type: "XML"
					},
					Expanded: {
						viewName: "sap.uxap.sample.SharedBlocks.GroupCompany",
						type: "XML"
					}
				}
			},
			renderer: {}
		});

		return GroupCompany;

	});
