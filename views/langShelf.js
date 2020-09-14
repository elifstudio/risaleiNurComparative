function getLangView() {
  window.currView = "langShelf";
  return {
    view: "dataview",
    id: "mainViewId",
    select: true,
    xCount: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? null : 2,
    type: {
      height: "auto",
      width: "auto",
      type: "tiles",
    },
    on: {
      onSelectChange: () => {
        var selected = $$("mainViewId").getSelectedItem();
        window.selectedLang = selected;
        webix.ui(getBookShelfView(selected), $$("mainViewId"));
      }
    },
    template: "<div class='webix_strong' style='text-align:center;'>#title#</div>" +
      "<img src='#source#' style='margin:auto;display:block;' alt='Girl in a jacket' width='70' height='70'>",
    data: [
      { id: 1, title: "English", source: "img/flags/england.svg" },
      { id: 2, title: "Arabic", source: "img/flags/saudi-arabia.svg" },
      { id: 3, title: "Russian", source: "img/flags/russia.svg" },
      { id: 4, title: "French", source: "img/flags/france.svg" },
      { id: 5, title: "German", source: "img/flags/german.svg" },
      { id: 6, title: "Chinese", source: "img/flags/china.svg" },
      { id: 7, title: "Indonesian", source: "img/flags/indonesia.svg" },
      { id: 8, title: "Japanese", source: "img/flags/japan.svg" },
      { id: 9, title: "Persian", source: "img/flags/iran.svg" },
      { id: 10, title: "Uzbek", source: "img/flags/uzbekistan.svg" },
      { id: 11, title: "Spanish", source: "img/flags/spain.svg" },
      { id: 12, title: "Korean", source: "img/flags/south-korea.svg" },
    ]
  }
}