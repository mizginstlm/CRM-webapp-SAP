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

        return BaseController.extend("mozos.customername.projectname.controller.Offers", {
            onInit: async function () {
              BaseController.prototype.onInit.apply(this, arguments);
              
                this.oMainModel.setProperty("/OffersInput", {});
                this.attachCustommozosEvents("Offers", this.onDetailRouteMatch);

                var resultDetail = await this.request("GetOfferPage", {});
                this.oMainModel.setProperty("/getOfferPage", resultDetail);

                var showOpportunity = await this.request("ShowOpportunity", {});//modül combosu için
                this.oMainModel.setProperty("/showOpportunity", showOpportunity);

                var showMoneyUnit = await this.request("ShowMoneyUnit", {});
                this.oMainModel.setProperty("/showMoneyUnit", showMoneyUnit);

                // var fileUploader = this.getView().byId("_IDGenFileUploader1");
                // fileUploader.setButtonText("Dosya Ekle");

                var Offers = BlockBase.extend("sap.uxap.sample.SharedBlocks.Offers", {
                    metadata: {
                        views: {
                            Collapsed: {
                                viewName: "sap.uxap.sample.SharedBlocks.Offers",
                                type: "XML"
                            },
                            Expanded: {
                                viewName: "sap.uxap.sample.SharedBlocks.Offers",
                                type: "XML"
                            }
                        }
                    },
                    renderer: {}
                });
                return Offers;
            },

            onDetailRouteMatch: async function (oArguments) {
                this.awref = oArguments.awref;
                await this.listOffersDatas();
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
                        await that.listOffersDatas();
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

            handleUploadComplete: function (oEvent) {
                var sResponse = oEvent.getParameter("response"),
                  iHttpStatusCode = parseInt(/\d{3}/.exec(sResponse)[0]),
                  sMessage;
                if (sResponse) {
                  sMessage =
                    iHttpStatusCode === 200
                      ? sResponse + " (Upload Success)"
                      : sResponse + " (Upload Error)";
                  MessageToast.show(sMessage);
                }
              },
              handleUploadPress: function () {
                var oFileUploader = this.byId("fileUploader");
                oFileUploader
                  .checkFileReadable()
                  .then(
                    function () {
                      oFileUploader.upload();
                    },
                    function (error) {
                      MessageToast.show(
                        "The file cannot be read. It may have changed."
                      );
                    }
                  )
                  .then(function () {
                    oFileUploader.clear();
                  });
              },

            onFileChange: async function (oEvent) {
                this.file = oEvent.getParameters().files[0];
            },

            getFileModel: async function () {
                if (!this.file) {
                    // this.showToast("Dosya Seçiniz...");
                    return;
                }
                var reader = new FileReader();
                var that = this;
                return new Promise(function (resolve, reject) {
                    reader.onload = async function (e) {
                        var vContent = e.currentTarget.result;
                        var fileNames = that.file.name.split(".");
                        var fileType = fileNames[fileNames.length - 1];
                        var fileName = that.file.name.substring(
                            0,
                            that.file.name.indexOf(fileType) - 1
                        );
                        var mimeType = vContent.substring(5, vContent.indexOf(";base64"));
                        var returningFile = {
                            prjid: "02",
                            awref: "",
                            objxt: fileName,
                            mtype: fileType,
                            ftype: mimeType,
                            bs64c: vContent,
                            indeu: "I",
                        };

                        that.byId("_IDGenFileUploader1").setValue(undefined);
                        resolve(returningFile);
                    };
                    reader.readAsDataURL(that.file);
                });
            },

            handleMessageToastPress: function (msg) {
                var msg1 = "Kaydedildi";
                var mdule = this.getView().byId("module")._lastValue;

                if (mdule == "") {
                    MessageToast.show(msg);
                } else {
                    MessageToast.show(msg1);
                }
            },

            submitOffers: async function () {
                var file = await this.getFileModel();
                var currentURL = window.location.href;
                var awref = currentURL.substring(currentURL.lastIndexOf("/") + 1);
                this.oMainModel.setProperty("/selectedProcess", {
                    awref: awref,
                });

                var reqObj = this.oMainModel.getProperty("/OffersInput");
                reqObj.awref = awref;
                var resultData = await this.request("GetOfferPage", {
                  data: reqObj,
                  file: file
                })

                this.oMainModel.setProperty("/getOfferPage", resultData);
                this.handleMessageToastPress("messagge");
                this.oMainModel.setProperty("/OffersInput", {});
                await this.listOffersDatas();
      },

      listOffersDatas : async function () {
        var resultDetail = await this.request("ShowOfferPage", {
            awref: this.awref
        });
        this.oMainModel.setProperty("/showOfferPage", resultDetail);
      },

      onEditRowPress: function (oData) {
        this.oMainModel.setProperty("/OffersInput", oData);
      },

    

        });

    }
);
