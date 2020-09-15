var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

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
    {},
    {
      view: "button",
      type: "icon",
      icon: "mdi mdi-undo",
      label: "Geri",
      width: 100,
      on: {
        onItemClick: (id, e) => {
          switch (window.currView) {
            case "bookShelf":
              webix.ui(getLangView(), $$("mainViewId"));
              break;
            case "bookView":
              webix.ui(getBookShelfView(window.selectedLang), $$("mainViewId"));
              break;
            default:
              break;
          }

        }
      }
    }
  ]
};

var sidebar = {
  view: "sidebar",
  id: "sidebarId",
  width: 200,
  scroll: isMobile.test(navigator.userAgent),
  collapsed: isMobile.test(navigator.userAgent),
  data: [
    { id: "langId", icon: "mdi mdi-flag-outline", value: "Diller" },
    { id: "searchId", icon: "mdi mdi-file-find", value: "Ara" },
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
    }
  }
};

function getSelectedView(viewId) {
  var myView;
  switch (viewId) {
    case "langId":
      myView = getLangView();
      break;
    case "trDictId":
      window.open("https://www.luggat.com/", '_blank');
      $$('sidebarId').unselectAll();
      break;
    case "engDictId":
      window.open("https://dictionary.cambridge.org/", '_blank');
      $$('sidebarId').unselectAll();
      break;
    case "downloadId":
      window.open("http://www.kuranikerim.net.tr/risale-kulliyati.html", '_blank');
      $$('sidebarId').unselectAll();
      break;
  }
  if (myView) webix.ui(myView, $$("mainViewId"));
  else webix.message({ text: "Henüz hazır değil", type: "success" });
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