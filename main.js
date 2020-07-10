var toolbar = {
  view: "toolbar",
  padding: 3,
  elements: [{
      view: "icon",
      icon: "mdi mdi-menu",
      click: function() {
        $$("$sidebar1").toggle();
      }
    },
    { view: "label", label: "Risale-i Nur Karşılaştırma" },
  ]
};

var sidebar = {
  view: "sidebar",
  data: [
    { id: "langId", icon: "mdi mdi-flag", value: "Diller" },
    { id: "aphorismId", icon: "mdi mdi-book-alphabet", value: "Vecizeler" },
    { id: "trDictId", icon: "mdi mdi-book", value: "Türkçe sözlük" },
    { id: "engDictId", icon: "mdi mdi-book", value: "İnglizce sözlük" },

  ],
  on: {
    onAfterSelect: function(id) {
      webix.message("Selected: " + this.getItem(id).value)
    }
  }
};

var mainLayout = {
  rows: [toolbar,
    {
      cols: [sidebar,
        { template: "" }
      ]
    }
  ]
}

webix.ui(mainLayout);