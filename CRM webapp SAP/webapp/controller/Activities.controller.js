sap.ui.define(
  [
    "mozos/customername/projectname/controller/BaseController",
    "sap/m/MessageToast",
    "sap/ui/core/mvc/Controller",
    'sap/uxap/BlockBase',
    "sap/m/Dialog"
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (BaseController, MessageToast) {
    "use strict";

    return BaseController.extend("mozos.customername.projectname.controller.Activities", {
      onInit: async function () {


        BaseController.prototype.onInit.apply(this, arguments);
        this.oMainModel.setProperty("/ActivitiesInput", {});

        this.attachCustommozosEvents("Activities", this.onDetailRouteMatch);

        var activity = await this.request("ShowActivity", {});
        this.oMainModel.setProperty("/showActivity", activity);

        var activitycontent = await this.request("ActivityContent", {});
        this.oMainModel.setProperty("/activityContent", activitycontent);


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
      },

      onDetailRouteMatch: async function (oArguments) {
        this.awref = oArguments.awref;
        await this.listActivityDatas();
      },

      onDeleteRowPress: async function (selectedRowData) {
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
                var resultDetail = await that.request("DeleteRecords", {
                  guid: selectedRowData.guid,
                  awref: selectedRowData.awref

                });
                console.log(selectedRowData)
                await that.listActivityDatas();
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



      handleMessageToastPress: function (msg) {
        var activity = this.getView().byId("activity")._lastValue;

        var msg1 = "Kaydedildi";

        if (activity == "") {
          MessageToast.show(msg);
        } else {
          MessageToast.show(msg1);
          // location.reload();

        }
      },

      onActivityChange: function (oEvent) {
        if (oSelectedKey) {
          var oSelectedKey = oEvent.getParameter("activity");
          var activity = oSelectedKey.getKey();

          var oModel = this.getView().getModel("main");
          oModel.setProperty("/activity", activity);
        } else
          console.log("no selected items be!")
      },

      onActivityStatusChange: function (oEvent) {
        if (oSelectedKey) {
          var oSelectedKey = oEvent.getParameter("statu");
          var statu = oSelectedKey.getKey();

          var oModel = this.getView().getModel("main");
          oModel.setProperty("/selectedKey", statu);
        } else
          console.log("no selected items be!")
      },

      sendActivityApprove: async function () {
        var currentURL = window.location.href;
        var awref = currentURL.substring(currentURL.lastIndexOf("/") + 1);
        this.oMainModel.setProperty("/selectedProcess", {
          awref: awref,
        });

        var reqObj = this.oMainModel.getProperty("/ActivitiesInput");
        reqObj.awref = awref;
        var resultData = await this.request("GetActivityData", {
          data: reqObj
        })
        this.oMainModel.setProperty("/getActivityData", resultData);
        this.handleMessageToastPress("messagge");
        await this.listActivityDatas();
        this.oMainModel.setProperty("/ActivitiesInput", {});
      },

      listActivityDatas: async function () {
        var resultDetail = await this.request("ShowActivityData", {
          awref: this.awref
        });
        this.oMainModel.setProperty("/showActivityData", resultDetail);
      },
      onEditRowPress: function (oData) {
        this.oMainModel.setProperty("/ActivitiesInput", oData);
      },


    });

  }
);