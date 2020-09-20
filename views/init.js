window.rnk = { nightMode: 'gunduz', zoom: 100, readMode: "CSSOF", history: [] };
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

function fullScreen(show) {
  if (show) {
    webix.$$("toolbarId").hide();
    webix.$$("sidebarId").hide();
    if (webix.$$("fihristId")) {
      webix.$$("fihristId").hide();
      webix.$$("scrollviewId").hide();
      webix.$$("fullScreenOff").show();
    }
  } else {
    webix.$$("toolbarId").show();
    webix.$$("sidebarId").show();
    if (webix.$$("fihristId")) {
      webix.$$("fihristId").show();
      webix.$$("scrollviewId").show();
      webix.$$("fullScreenOff").hide();
    }
  }
}

webix.ui({
  view: "popup",
  id: "fullScreenOff",
  left: 10,
  top: 25,
  escHide: false,
  relative: "right",
  css: { "opacity": "0.8" },
  body: {
    view: "button",
    type: "icon",
    icon: "mdi mdi-fullscreen-exit",
    width: 40,
    tooltip: "Exit Full Screen",
    css: "webix_secondary",
    on: {
      onItemClick: (id, e) => {
        fullScreen(false);
      }
    }
  }
});