var toolbar = {
  view: "toolbar",
  id: "toolbarId",
  padding: 3,
  elements: [{
      view: "icon",
      icon: "mdi mdi-menu",
      id: "menuIconId",
      tooltip: _("Expand menu"),
      click: function() {
        $$("sidebarId").toggle();
      }
    },
    { hidden: isMobile.test(navigator.userAgent) },
    { view: "label", label: _("Risale-i Nur Comparative") },
    {
      view: "button",
      type: "icon",
      icon: "mdi mdi-undo",
      label: _("Back"),
      width: 100,
      on: {
        onItemClick: (id, e) => {
          switch (window.rnk.currView) {
            case "bookShelf":
              webix.ui(getLangView(), $$("mainViewId"));
              break;
            case "bookView":
              webix.ui(getBookShelfView(window.rnk.selectedLang), $$("mainViewId"));
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
    { id: "langId", icon: "mdi mdi-flag-outline", value: _("Languages") },
    { id: "searchId", icon: "mdi mdi-file-find", value: _("Search") },
    { id: "trDictId", icon: "mdi mdi-book-alphabet", value: _("Turkish Dictionary") },
    { id: "engDictId", icon: "mdi mdi-book-outline", value: _("English Dictionary") },
    { id: "downloadId", icon: "mdi mdi-soundcloud", value: _("Download Audio Books") },
    { id: "languageId", icon: "mdi mdi-book", value: _("Web Language") },
    { id: "aboutId", icon: "mdi mdi-sticker-alert-outline", value: _("About Us") },
    { id: "callId", icon: "mdi mdi-comment-text-outline", value: _("Contact Us") },
    { id: "shareId", icon: "mdi mdi-share", value: _("Share") }

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
      window.history.pushState('lang', null, "");
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
    case "languageId":
      showLangMenu();
      break;
  }
  if (myView) webix.ui(myView, $$("mainViewId"));
}

function showLangMenu() {
  var result = {
    view: "window",
    head: false,
    modal: true,
    position: "center",
    id: "langMenuId",
    scroll: true,
    body: {
      padding: 10,
      rows: [{
          view: "icon",
          align: "right",
          icon: "mdi mdi-window-close",
          click: () => {
            webix.$$("langMenuId").close();
            $$('sidebarId').unselectAll();
          }
        },
        {
          view: "radio",
          vertical: true,
          width: 150,
          value: window.rnk.lang,
          on: {
            onChange: (newVal, oldVal) => {
              myStorage("put", "rnkLang", newVal);
              window.rnk.lang = newVal;
              location.reload();
            }
          },
          options: [
            { id: "tr", value: _("Turkish") },
            { id: "en", value: _("English") },
            { id: "arb", value: _("Arabic") },
            { id: "ru", value: _("Russian") },
            { id: "fr", value: _("French") },
            { id: "gr", value: _("German") },
            { id: "chi", value: _("Chinese") },
            { id: "ind", value: _("Indonesian") },
            { id: "jap", value: _("Japanese") },
            { id: "pers", value: _("Persian") },
            { id: "uzb", value: _("Uzbek") },
            { id: "spa", value: _("Spanish") },
            { id: "kor", value: _("Korean") }
          ]
        }
      ]
    }
  };

  webix.ui(result).show();
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

window.onpopstate = function(e) {
  fullScreen(false);
  switch (e.state) {
    case "lang":
      webix.ui(getLangView(), $$("mainViewId"));
      break;
    case "shelf":
      webix.ui(getBookShelfView(window.rnk.selectedLang), $$("mainViewId"));
      break;
    case "book":
      webix.ui(displayBook(window.rnk.book, 0, "main"), $$("mainViewId"));
      break;
  }
};

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
    tooltip: _("Exit Full Screen"),
    css: "webix_secondary",
    on: {
      onItemClick: (id, e) => {
        fullScreen(false);
      }
    }
  }
});