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

    return BaseController.extend("mozos.customername.projectname.controller.CustomerTeam", {
      onInit: async function () {

        BaseController.prototype.onInit.apply(this, arguments);
        this.attachCustommozosEvents("CustomerTeam", this.onDetailRouteMatch);

        this.oMainModel.setProperty("/CustomerTeamInput", {});

        var decisionProcess = await this.request("DecisionProcess", {});
        this.oMainModel.setProperty("/decisionProcess", decisionProcess);

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
      },

      onDeleteRowPress: async function (selectedRowData) {
        console.log("onDeleteRowPress function called.");
        var that  = this;
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
                var resultDetail = await that.request("DeleteRecords", {
                  guid : selectedRowData.guid,
                  awref: selectedRowData.awref
                  
                });
                console.log(selectedRowData)
                await that.listCustomerTeamDatas();
                oDialog.close();
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
      
  

      
      onDetailRouteMatch: async function (oArguments) {
        this.awref = oArguments.awref;
       await this.listCustomerTeamDatas();
      },

      handleMessageToastPress: function (msg) {
        var pernr = this.getView().byId("pernr")._lastValue;

        var msg1 = "Kaydedildi";

        if (pernr == "") {
          MessageToast.show(msg);
        } else {
          MessageToast.show(msg1);
        }
      },

      sendCrewApprove: async function () {
        var currentURL = window.location.href;
        var awref = currentURL.substring(currentURL.lastIndexOf("/") + 1);

        this.oMainModel.setProperty("/selectedProcess", {
          awref: awref,
        });

      var reqObj = this.oMainModel.getProperty("/CustomerTeamInput");
        reqObj.awref = awref;
        var resultData = await this.request("GetCustomerCrew", {
          data: reqObj
        })
        this.oMainModel.setProperty("/getCustomerCrew", resultData);
        this.handleMessageToastPress("messagge");
        await this.listCustomerTeamDatas()
        this.oMainModel.setProperty("/CustomerTeamInput", {});

      },

      listCustomerTeamDatas : async function () {
        var resultDetail = await this.request("ShowCustomerCrew", {
          awref: this.awref
        });
        this.oMainModel.setProperty("/showCustomerCrew", resultDetail);
      },

      onEditRowPress: function (oData) {
        this.oMainModel.setProperty("/CustomerTeamInput", oData);
      },

    });

  }
);
