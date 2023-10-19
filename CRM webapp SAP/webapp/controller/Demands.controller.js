sap.ui.define(
  [
    "mozos/customername/projectname/controller/BaseController",
    "sap/m/MessageToast",
    "sap/ui/core/mvc/Controller",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/MessageToast",
    "sap/m/DialogType",
    "sap/m/ButtonType"
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (BaseController, MessageToast, Dialog, Button, DialogType, ButtonType) {
    "use strict";

    return BaseController.extend("mozos.customername.projectname.controller.Demands", {
      onInit: async function () {
        BaseController.prototype.onInit.apply(this, arguments);
        this.attachRouteMatch("Demands", this.onDemandsRouteMatch);
      },


      onDeleteRowPress: function (selectedRowData) {
        console.log("onDeleteRowPress function called.");
        var that = this;

        var oDialog = new sap.m.Dialog({
          title: "Confirm",
          type: sap.m.DialogType.Message,
          content: new sap.m.Text({ text: "Do you want to delete this?" }),
          buttons: [
            new sap.m.Button({
              text: "Delete",
              type: sap.m.ButtonType.Emphasized,
              press: async function () {
                sap.m.MessageToast.show("Submit pressed!");
                var resultDetail = await that.request("PassiveCustomer", {
                  awref: selectedRowData.awref
                });

                oDialog.close();
                await that.getList();
              }
            }),
            new sap.m.Button({
              text: "Cancel",
              press: function () {
                oDialog.close();
              }
            })
          ]
        });

        oDialog.open();
      },

      onDetailPress(oEvent) {
        var sPath = oEvent.getParameters().listItem.oBindingContexts.main.sPath;
        var data = this.oMainModel.getProperty(sPath);
        this.getRouter().navTo("DetailedCustomer", { awref: data.awref });
      },

      onDemandsRouteMatch: async function (oEvent) {
        await this.getList();
      },

      getList: async function () {
        this.oMainModel.setProperty("/showList", []);
        var resultDetail = await this.request("ShowList", {

        });
        this.oMainModel.setProperty("/showList", resultDetail);
      },

      onEditRowPress: function (oData) {
        this.getRouter().navTo("RouteEdit", { awref: oData.awref });
      },

    });
  }
);
