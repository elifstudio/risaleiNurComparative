window.rnk = {
  nightMode: 'gunduz',
  zoom: 100,
  readMode: "CSSOF",
  history: [],
  lang: myStorage("get", "rnkLang") ? myStorage("get", "rnkLang") : "en",
};
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
var _ = locale;

function fullScreen(show) {
  if (show) {
    webix.$$("toolbarId").hide();
    if (webix.$$("fihristId")) {
      webix.$$("fihristId").hide();
      webix.$$("fullScreenOff").show();
      webix.$$("bookViewMenuId").hide();
    }
  } else {
    webix.$$("toolbarId").show();
    if (webix.$$("fihristId")) {
      webix.$$("fihristId").show();
      webix.$$("fullScreenOff").hide();
      webix.$$("bookViewMenuId").show();
    }
  }
}

function hideMainSidebar(show) {
  if (show) {
    webix.$$("menuIconId").show();
    webix.$$("sidebarId").show();
  } else {
    webix.$$("sidebarId").hide();
    webix.$$("menuIconId").hide();
  }
}

function myStorage(type, key, data) {
  if (type == "get") {
    return webix.storage.local.get(key);
  }
  if (type == "put") {
    webix.storage.local.put(key, data);
  }
}