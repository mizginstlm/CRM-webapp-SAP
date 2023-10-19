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
    return BaseController.extend("mozos.customername.projectname.controller.DetailedCustomer", {
      onInit: async function () {
        BaseController.prototype.onInit.apply(this, arguments);
        this.attachRouteMatch("DetailedCustomer", this.onDetailRouteMatch);

        var sendPercant = await this.request("SendPercant", {});
        this.oMainModel.setProperty("/sendPercant", sendPercant);

        var oObjectPageLayout = this.getView().byId("ObjectPageLayout");
        oObjectPageLayout.attachEvent("sectionChange", this.onSectionChange, this);

      },

      valueChanged: function (oEvent) {
        var iValue = oEvent.getParameter("value")
        var percent = this.getView().byId("sourceId").getSelectedKey();//burda text olacak ama number olrak iste
        var oView = this.getView();
        oView.byId("indicator31").setValue(percent * 25);
      },

 
      onDetailRouteMatch: async function (oEvent) {
        var oArguments = oEvent.getParameter("arguments");
        this.oArguments = oArguments;
        var awref = oArguments.awref;
        console.log(oArguments);
        var awref = oArguments.awref;
        await this.showDetail(awref);
        this.byId("ObjectPageLayout").setSelectedSection(this.byId("_IDGenObjectPageSection1"));
        this.selectedSection = this.byId("ObjectPageLayout").getSections()[0].getCustomData()[0].getKey();
        await this.onSectionChange();
      },

      onSectionChange: async function (oEvent) {
        if (oEvent) {
          var oSelectedSection = oEvent.getParameter("section");
          this.selectedSection = oSelectedSection.getCustomData()[0].getKey();
        }
        var events = this.oMainModel.getProperty("/mozosCustomEvents");
        var founded = false;
        if (events) {
          for (let i = 0; i < events.length; i++) {
            const element = events[i];
            if (element.key === this.selectedSection) {
              await element.func(this.oArguments);
              founded = true;
            }
          }
        }

        if (founded === false) {
          await this.wait(10);
          this.onSectionChange(undefined);
        }
      },

      showDetail: async function (awref) {
        this.oMainModel.setProperty("/showCustomerInput", {});
        var resultDetail = await this.request("ShowCustomerInput", {
          awref: awref,
        });
        this.oMainModel.setProperty("/showCustomerInput", resultDetail);
      },
    });

  }
);

