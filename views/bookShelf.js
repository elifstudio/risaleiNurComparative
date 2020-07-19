function getBookShelfView(selected) {
  $$('sidebarId').unselect();
  return {
    view: "dataview",
    id: "mainViewId",
    select: true,
    type: {
      height: "200",
      width: "160",
      type: "tiles",
    },
    template: "<img src='#img#' height='90%' width='100%'><div>#title#</div>",
    data: getBooks(selected),
    on: {
      onSelectChange: () => {
        var selected = $$("mainViewId").getSelectedItem();
        webix.ui(displayBook(selected), $$("mainViewId"));
      }
    }
  }
}

function getBooks(selected) {
  switch (selected.title) {
    case "English":
      return getEnglishBooks();
    default:
      break;
  }
}

function getEnglishBooks() {
  return [
    { id: 1, title: "Sünnet-i Seniyye", img: "img/books_cover/ing11lema.jpg" },
    { id: 2, title: "Mucizat-ı Ahmediye", img: "img/books_cover/ing19mektub.jpg" }
  ]
}