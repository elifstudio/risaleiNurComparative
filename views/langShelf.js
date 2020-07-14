function getLangView() {
  return {
    view: "dataview",
    id: "mainViewId",
    select: true,
    xCount: 2,
    type: {
      height: "auto",
      width: "auto",
      type: "tiles",
    },
    on: {
      onSelectChange: () => {
        var selected = $$("mainViewId").getSelectedItem();
        webix.ui(getBookShelfView(), $$("mainViewId"));
      }
    },
    template: "<div class='webix_strong' style='text-align:center;'>#title#</div>" +
      "<img src='#source#' style='margin:auto;display:block;' alt='Girl in a jacket' width='70' height='70'>",
    data: [
      { id: 1, title: "English", source: "img/england.svg" },
      { id: 2, title: "Arabic", source: "img/saudi-arabia.svg" },
      { id: 3, title: "Russian", source: "img/russia.svg" },
      { id: 4, title: "French", source: "img/france.svg" },
      { id: 5, title: "German", source: "img/german.svg" },
      { id: 6, title: "Chinese", source: "img/china.svg" },
      { id: 7, title: "Indonesian", source: "img/indonesia.svg" },
      { id: 8, title: "Japanese", source: "img/japan.svg" },
      { id: 9, title: "Persian", source: "img/iran.svg" },
      { id: 10, title: "Uzbek", source: "img/uzbekistan.svg" },
      { id: 11, title: "Spanish", source: "img/spain.svg" },
    ]
  }
}