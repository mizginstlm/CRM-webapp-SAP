sap.ui.define([
  "mozos/customername/projectname/controller/BaseController", "sap/m/MessageToast",
],
  /**
   * @param {typeof mozos.customername.projectname.controller.BaseController} BaseController
   */
  function (BaseController, MessageToast, Dialog, Button, DialogType, ButtonType) {
    "use strict";


    return BaseController.extend("mozos.customername.projectname.controller.Main", {
      onInit: async function () {
        BaseController.prototype.onInit.apply(this, arguments);
        this.attachRouteMatch("RouteMain", this.onRouteMatchMain);
        this.attachRouteMatch("RouteEdit", this.onRouteMatchEdit);
        this.oMainModel.setProperty("/MainInput", {});

        var sektor = await this.request("ShowSektor", {});
        this.oMainModel.setProperty("/showSektor", sektor);

        var custTypeData = await this.request("CustTypeData", {});
        this.oMainModel.setProperty("/custTypeData", custTypeData);

        var subSektor = await this.request("ShowSubSektor", {});
        this.oMainModel.setProperty("/showSubSektor", subSektor);
      },

      onRouteMatchMain: function (oEvent) {
        //clear screen
        this.oMainModel.setProperty("/Mode", "Create");
      },

      onRouteMatchEdit: async function (oEvent) {
        var oArguments = oEvent.getParameter("arguments");
        var awref = oArguments.awref;
        var result = await this.request("ShowCustomerInput", { awref: awref });
        this.oMainModel.setProperty("/MainInput", result);
        this.oMainModel.setProperty("/Mode", "Edit");
      },

      checkRequiredInputs: async function () {
        // this.oMainModel.setProperty("/MainInput", result);
        var oForm = this.getView().byId("_IDGenForm1");
        var aInputs = oForm.findAggregatedObjects(true, function (oControl) {
          return oControl.isA("sap.m.Input") && oControl.getRequired();
        });

        var bAllRequiredInputsFilled = true;
        aInputs.forEach(function (oInput) {
          if (!oInput.getValue()) { // Required input is not filled
            bAllRequiredInputsFilled = false;
          }
        });
        if (bAllRequiredInputsFilled) { // All required inputs are filled
          await this.sendApprove();

        } else {
          sap.m.MessageToast.show("Please fill in all required fields.");
          return;
        }
      },

      handleMessageToastPress: function (msg) {
        var namesurname = this.getView().byId("perName1")._lastValue;

        var msg1 = "Kaydedildi";

        if (namesurname == "") {
          MessageToast.show(msg);
        } else {
          MessageToast.show(msg1);

        }
      },

      showList: async function () {
        var oRouter = this.getOwnerComponent().getRouter()
        oRouter.navTo("Demands")
        var resultDetail = await this.request("ShowList", {
        });
        this.oMainModel.setProperty("/showList", resultDetail);
        console.log(resultDetail)
      },

      sendApprove: async function () {
        var reqObj = this.oMainModel.getProperty("/MainInput");
        var resultData = await this.request("GetCustomer", {
          data: reqObj
        })
        this.oMainModel.setProperty("/MainInput/is_kamu", resultData.isIns === 1 ? 0 : 1);
        this.oMainModel.setProperty("/getCustomer", resultData);
        this.handleMessageToastPress("messagge");
        this.oMainModel.setProperty("/MainInput", {});
      },

    });
  });
