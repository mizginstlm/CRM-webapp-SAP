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

    return BaseController.extend("mozos.customername.projectname.controller.Address", {
      onInit: async function () {

        BaseController.prototype.onInit.apply(this, arguments);
        this.oMainModel.setProperty("/AddressInput", {});
        var inputs = this.oMainModel.getProperty("/AddressInput");

        // var main = this.oMainModel.getData();
        inputs.country
        var country = await this.request("ShowCountry", {});
        this.oMainModel.setProperty("/showCountry", country);
        this.attachCustommozosEvents("Address", this.onDetailRouteMatch);
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

      },
      onDetailRouteMatch: async function (oArguments) {
        this.awref = oArguments.awref;
        await this.listAdressDatas();
      },

      handleMessageToastPress: function (msg) {
        var countrykey = this.getView().byId("countrycode")._lastValue;

        var msg1 = "Kaydedildi";

        if (countrykey == "") {
          MessageToast.show(msg);
        } else {
          MessageToast.show(msg1);
        }
      },

      onDeleteRowPress: async function (selectedRowData) {
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
                var resultDetail = await that.request("DeleteRecords", {
                  awref: selectedRowData.awref,
                  guid: selectedRowData.guid
                });
                await that.listAdressDatas();
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

      submitAddress: async function () {
        var currentURL = window.location.href;
        var awref = currentURL.substring(currentURL.lastIndexOf("/") + 1);
        this.oMainModel.setProperty("/selectedProcess", {
          awref: awref,
        });
        var reqObj = this.oMainModel.getProperty("/AddressInput");
        reqObj.awref = awref;
        var resultData = await this.request("GetAddressData", {
          data: reqObj
        })
        this.oMainModel.setProperty("/getAddressData", resultData);
        this.handleMessageToastPress("messagge");
        await this.listAdressDatas();
        this.oMainModel.setProperty("/AddressInput", {});
      },

      listAdressDatas: async function () {
        var resultDetail = await this.request("ShowAddressData", {
          awref: this.awref //Route match de doldurduk burada kullanuyouruz
        });

        this.oMainModel.setProperty("/showAddressData", resultDetail);
      },

      onEditRowPress: function (oData) {
        this.oMainModel.setProperty("/AddressInput", oData);
      },

      

    });

  }
);
