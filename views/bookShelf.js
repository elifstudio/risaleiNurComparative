function getBookShelfView() {
  $$('sidebarId').unselect();
  return {
    view: "dataview",
    id: "mainViewId",
    select: true,
    type: {
      height: "200",
      width: "150",
      type: "tiles",
    },
    template: "<div>Title: #title#</div>",
    data: [
      { id: 1, title: "English" },
      { id: 2, title: "Arabic" },
      { id: 3, title: "Russian" },
      { id: 4, title: "French" },
      { id: 5, title: "German" },
      { id: 6, title: "Chinese" },
      { id: 7, title: "Indonesian" },
      { id: 8, title: "Japanese" },
      { id: 9, title: "Persian" },
      { id: 10, title: "Uzbek" },
      { id: 11, title: "Spanish" },
    ]
  }
}