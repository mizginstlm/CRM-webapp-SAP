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

    return BaseController.extend("mozos.customername.projectname.controller.Opportunity", {
      onInit: async function () {

        BaseController.prototype.onInit.apply(this, arguments);
        this.attachCustommozosEvents("Opportunity", this.onDetailRouteMatch);

        this.oMainModel.setProperty("/OpportunityInput", {});

        var showOpportunity = await this.request("ShowOpportunity", {});
        this.oMainModel.setProperty("/showOpportunity", showOpportunity);

        var showSource = await this.request("ShowSource", {});
        this.oMainModel.setProperty("/showSource", showSource);

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
                await that.listOpportunityDatas();
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
        await this.listOpportunityDatas();
    },

      handleMessageToastPress: function (msg) {
        var msg1 = "Kaydedildi";
        var modul = this.getView().byId("modul")._lastValue;

        if (modul == "") {
          MessageToast.show(msg);
        } else {
          MessageToast.show(msg1);
        }
      },

      submitOpportunity: async function () {
        var currentURL = window.location.href;
        var awref = currentURL.substring(currentURL.lastIndexOf("/") + 1);

        this.oMainModel.setProperty("/selectedProcess", {
          awref: awref,
        });
        var reqObj = this.oMainModel.getProperty("/OpportunityInput");
        reqObj.awref = awref;
        var resultData = await this.request("GetOpportunityData", {
          data: reqObj
        })
        this.oMainModel.setProperty("/getOpportunityData", resultData);
        this.handleMessageToastPress("messagge");
        this.oMainModel.setProperty("/OpportunityInput", {});
        await this.listOpportunityDatas();

      },

      listOpportunityDatas : async function () {
        var resultDetail = await this.request("ShowOpportunityData", {
            awref: this.awref
        });

        this.oMainModel.setProperty("/showOpportunityData", resultDetail);
      },
      onEditRowPress: function (oData) {
        this.oMainModel.setProperty("/OpportunityInput", oData);
      },

    });

  }
);
