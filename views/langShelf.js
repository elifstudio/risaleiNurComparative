function getLangView() {
  window.rnk.currView = "langShelf";
  return {
    view: "dataview",
    id: "mainViewId",
    select: true,
    xCount: isMobile.test(navigator.userAgent) ? null : 2,
    type: {
      height: "auto",
      width: "auto",
      type: "tiles",
    },
    on: {
      onSelectChange: () => {
        var selected = $$("mainViewId").getSelectedItem();
        window.rnk.selectedLang = selected;
        webix.ui(getBookShelfView(selected), $$("mainViewId"));
        window.history.pushState("shelf", null, "");
      }
    },
    template: "<div class='webix_strong' style='text-align:center;'>#title#</div>" +
      "<img src='#source#' style='margin:auto;display:block;' alt='Girl in a jacket' width='70' height='70'>",
    data: [
      { id: "en", title: ("English"), source: "img/flags/england.svg" },
      { id: "arb", title: ("Arabic"), source: "img/flags/saudi-arabia.svg" },
      { id: "ru", title: ("Russian"), source: "img/flags/russia.svg" },
      { id: "fr", title: ("French"), source: "img/flags/france.svg" },
      { id: "gr", title: ("German"), source: "img/flags/german.svg" },
      { id: "chi", title: ("Chinese"), source: "img/flags/china.svg" },
      { id: "ind", title: ("Indonesian"), source: "img/flags/indonesia.svg" },
      { id: "jap", title: ("Japanese"), source: "img/flags/japan.svg" },
      { id: "pers", title: ("Persian"), source: "img/flags/iran.svg" },
      { id: "uzb", title: ("Uzbek"), source: "img/flags/uzbekistan.svg" },
      { id: "spa", title: ("Spanish"), source: "img/flags/spain.svg" },
      { id: "kor", title: ("Korean"), source: "img/flags/south-korea.svg" },
    ]
  }
}