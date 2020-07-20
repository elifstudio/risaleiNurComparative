function displayBook(selected) {
  return {
    view: "iframe",
    id: "mainViewId",
    src: "res/books/ing19soz/ing19soz-section-0.html",
    on: {
      onAfterLoad: () => {}
    }
  }
}