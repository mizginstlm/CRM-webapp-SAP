
sap.ui.define(['sap/uxap/BlockBase'],
	function (BlockBase) {
		"use strict";

		var CustomerTeam = BlockBase.extend("sap.uxap.sample.SharedBlocks.CustomerTeam", {
			metadata: {
				views: {
					Collapsed: {
						viewName: "sap.uxap.sample.SharedBlocks.CustomerTeam",
						type: "XML"
					},
					Expanded: {
						viewName: "sap.uxap.sample.SharedBlocks.CustomerTeam",
						type: "XML"
					}
				}
			},
			renderer: {}
		});

		return CustomerTeam;

	});
