
sap.ui.define(['sap/uxap/BlockBase'],
	function (BlockBase) {
		"use strict";

		var Address = BlockBase.extend("sap.uxap.sample.SharedBlocks.Address", {
			metadata: {
				views: {
					Collapsed: {
						viewName: "sap.uxap.sample.SharedBlocks.Address",
						type: "XML"
					},
					Expanded: {
						viewName: "sap.uxap.sample.SharedBlocks.Address",
						type: "XML"
					}
				}
			},
			renderer: {}
		});

		return Address;

	});
