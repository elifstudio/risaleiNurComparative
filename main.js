var toolbar = {
  view: "toolbar",
  padding: 3,
  elements: [{
      view: "icon",
      icon: "mdi mdi-menu",
      tooltip: "Expand menu",
      click: function() {
        $$("sidebarId").toggle();
      }
    },
    { view: "label", label: "Risale-i Nur Karşılaştırma" },
  ]
};

var sidebar = {
  view: "sidebar",
  id: "sidebarId",
  collapsed: true,
  width: 180,
  data: [
    { id: "langId", icon: "mdi mdi-flag-outline", value: "Diller" },
    { id: "searchId", icon: "mdi mdi-file-find", value: "Ara" },
    { id: "aphorismId", icon: "mdi mdi-diamond-stone", value: "Vecizeler" },
    { id: "trDictId", icon: "mdi mdi-book-alphabet", value: "Türkçe Lügat" },
    { id: "engDictId", icon: "mdi mdi-book-outline", value: "İnglizce Lügat" },
    { id: "downloadId", icon: "mdi mdi-soundcloud", value: "Sesli Risale İndir" },
    { id: "languageId", icon: "mdi mdi-book", value: "Dil/Language" },
    { id: "nightModeId", icon: "mdi mdi-brightness-3", value: "Gece Modu" },
    { id: "aboutId", icon: "mdi mdi-sticker-alert-outline", value: "Hakkımızda" },
    { id: "callId", icon: "mdi mdi-comment-text-outline", value: "İrtibat" },
    { id: "shareId", icon: "mdi mdi-share", value: "Uygulamayı paylaş" }

  ],
  on: {
    onAfterSelect: function(id) {
      getSelectedView(id);
      webix.message(this.getItem(id).value)
    }
  }
};

function getSelectedView(viewId) {
  var myView;
  switch (viewId) {
    case "langId":
      myView = getLangView();
      break;
    default:
      break;
  }
  webix.ui(myView, $$("mainViewId"));
}

var mainLayout = {
  rows: [toolbar,
    {
      cols: [sidebar,
        { view: "template", id: "mainViewId" }
      ]
    }
  ]
}

webix.ui(mainLayout);
webix.ui.fullScreen();

webix.ready(() => {
  $$('sidebarId').select("langId");
});