function getBookShelfView(selected) {
  $$('sidebarId').unselect();
  window.currView = "bookShelf";
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
        webix.ui(displayBook(selected, 0, "main"), $$("mainViewId"));
      }
    }
  }
}

function getBooks(selected) {
  switch (selected.title) {
    case "English":
      return getEnglishBooks();
    case "Russian":
      return getRussianBooks();
    default:
      break;
  }
}

function getSections(path, size) {
  var array = [];
  for (var i = 0; i < size; i++) {
    array.push("res/books/" + path + "-section-" + i + ".html");
  }
  return array;
}

function getEnglishBooks() {
  return [{
      id: 1,
      title: "Sünnet-i Seniyye",
      img: "img/books_cover/ing11lema.jpg",
      sections: getSections("ing11lema/ing11lema", 2),
      content: "res/books/ing11lema/fihrist.txt"
    },
    {
      id: 2,
      title: "Mucizat-ı Ahmediye",
      img: "img/books_cover/ing19mektub.jpg",
      sections: getSections("ing19mektub/ing19mektub", 14),
      content: "res/books/ing19mektub/fihrist.txt"
    },
    {
      id: 3,
      title: "Onbeşinci Şua",
      img: "img/books_cover/rays.jpg",
      sections: getSections("ing15sua/ing15sua", 8),
      content: "res/books/ing15sua/fihrist.txt"
    },
    {
      id: 4,
      title: "Yirmiikinci Söz",
      img: "img/books_cover/words.jpg",
      sections: getSections("ing22soz/ing22soz", 4),
      content: "res/books/ing22soz/fihrist.txt"
    },
    {
      id: 6,
      title: "Yirmiüçüncü Söz",
      img: "img/books_cover/words.jpg",
      sections: getSections("ing23soz/ing23soz", 7),
      content: "res/books/ing23soz/fihrist.txt"
    },
    {
      id: 7,
      title: "Yirmibeşinci Söz",
      img: "img/books_cover/ing25soz.jpg",
      sections: getSections("ing25soz/ing25soz", 10),
      content: "res/books/ing25soz/fihrist.txt"
    },
    {
      id: 8,
      title: "Yirmialtıncı Mektub",
      img: "img/books_cover/letters.jpg",
      sections: getSections("ing26mektub/ing26mektub", 1),
      content: "res/books/ing26mektub/fihrist.txt"
    }, {
      id: 9,
      title: "Yirmidokuzuncu Söz",
      img: "img/books_cover/ing29soz.jpg",
      sections: getSections("ing29soz/ing29soz", 4),
      content: "res/books/ing29soz/fihrist.txt"
    },
    {
      id: 10,
      title: "Otuzuncu Söz",
      img: "img/books_cover/ing30soz.jpg",
      sections: getSections("ing30soz/ing30soz", 3),
      content: "res/books/ing30soz/fihrist.txt"
    },
    {
      id: 11,
      title: "Otuz Birinci Söz",
      img: "img/books_cover/words.jpg",
      sections: getSections("ing31soz/ing31soz", 4),
      content: "res/books/ing31soz/fihrist.txt"
    }, {
      id: 12,
      title: "Otuz İkinci Söz",
      img: "img/books_cover/words.jpg",
      sections: getSections("ing32soz/ing32soz", 7),
      content: "res/books/ing32soz/fihrist.txt"
    },
    {
      id: 13,
      title: "Otuz Üçüncü Söz",
      img: "img/books_cover/ing33pencere.jpg",
      sections: getSections("ing33soz/ing33soz", 7),
      content: "res/books/ing33soz/fihrist.txt"
    },
    {
      id: 5,
      title: "ssss",
      img: "img/books_cover/words.jpg",
      sections: getSections("ing22soz/ing22soz", 4),
      content: "res/books/ing22soz/fihrist.txt"
    }, {
      id: 5,
      title: "ssss",
      img: "img/books_cover/words.jpg",
      sections: getSections("ing22soz/ing22soz", 4),
      content: "res/books/ing22soz/fihrist.txt"
    },
    {
      id: 5,
      title: "ssss",
      img: "img/books_cover/words.jpg",
      sections: getSections("ing22soz/ing22soz", 4),
      content: "res/books/ing22soz/fihrist.txt"
    },
    {
      id: 5,
      title: "ssss",
      img: "img/books_cover/words.jpg",
      sections: getSections("ing22soz/ing22soz", 4),
      content: "res/books/ing22soz/fihrist.txt"
    }, {
      id: 5,
      title: "ssss",
      img: "img/books_cover/words.jpg",
      sections: getSections("ing22soz/ing22soz", 4),
      content: "res/books/ing22soz/fihrist.txt"
    },
    {
      id: 5,
      title: "ssss",
      img: "img/books_cover/words.jpg",
      sections: getSections("ing22soz/ing22soz", 4),
      content: "res/books/ing22soz/fihrist.txt"
    },
    {
      id: 5,
      title: "ssss",
      img: "img/books_cover/words.jpg",
      sections: getSections("ing22soz/ing22soz", 4),
      content: "res/books/ing22soz/fihrist.txt"
    }, {
      id: 5,
      title: "ssss",
      img: "img/books_cover/words.jpg",
      sections: getSections("ing22soz/ing22soz", 4),
      content: "res/books/ing22soz/fihrist.txt"
    },
    {
      id: 5,
      title: "ssss",
      img: "img/books_cover/words.jpg",
      sections: getSections("ing22soz/ing22soz", 4),
      content: "res/books/ing22soz/fihrist.txt"
    },
    {
      id: 5,
      title: "ssss",
      img: "img/books_cover/words.jpg",
      sections: getSections("ing22soz/ing22soz", 4),
      content: "res/books/ing22soz/fihrist.txt"
    }
  ]
}

function getRussianBooks() {
  return [{
      id: 1,
      title: "Onbirinci Lem'a",
      img: "img/books_cover/rusca11lema.jpg",
      sections: getSections("rusca11lema/rusca11lema", 2),
      content: "res/books/rusca11lema/fihrist.txt"
    },
    {
      id: 2,
      title: "Yirminci Mektub",
      img: "img/books_cover/rusca20mektub.jpg",
      sections: getSections("rusca20mektub/rusca20mektub", 4),
      content: "res/books/rusca20mektub/fihrist.txt"
    },
    {
      id: 3,
      title: "Yirmibirinci Lem'a",
      img: "img/books_cover/rusca21lema.jpg",
      sections: getSections("rusca21lema/rusca21lema", 2),
      content: "res/books/rusca21lema/fihrist.txt"
    },
    {
      id: 4,
      title: "Yirmiüçünçü Söz",
      img: "img/books_cover/rusca23soz.jpg",
      sections: getSections("rusca23soz/rusca23soz", 7),
      content: "res/books/rusca23soz/fihrist.txt"
    },
    {
      id: 5,
      title: "Otuzüçüncü Söz",
      img: "img/books_cover/rusca33soz.jpg",
      sections: getSections("rusca33soz/rusca33soz", 7),
      content: "res/books/rusca33soz/fihrist.txt"
    },
    {
      id: 6,
      title: "Ayet-ül Kübra",
      img: "img/books_cover/ruscaayetulkubra.jpg",
      sections: getSections("ruscaayetulkubra/ruscaayetulkubra", 8),
      content: "res/books/ruscaayetulkubra/fihrist.txt"
    },
    {
      id: 7,
      title: "Gençlik Rehberi",
      img: "img/books_cover/ruscagenclik.jpg",
      sections: getSections("ruscagenclik/ruscagenclik", 18),
      content: "res/books/ruscagenclik/fihrist.txt"
    },
    {
      id: 8,
      title: "Haşir Risalesi",
      img: "img/books_cover/ruscahasir.jpg",
      sections: getSections("ruscahasir/ruscahasir", 21),
      content: "res/books/ruscahasir/fihrist.txt"
    },
    {
      id: 9,
      title: "Hastalar Risalesi",
      img: "img/books_cover/ruscahastalar.jpg",
      sections: getSections("ruscahastalar/ruscahastalar", 8),
      content: "res/books/ruscahastalar/fihrist.txt"
    },
    {
      id: 10,
      title: "Küçük Sözler",
      img: "img/books_cover/ruscakucuksozler.jpg",
      sections: getSections("ruscakucuksozler/ruscakucuksozler", 5),
      content: "res/books/ruscakucuksozler/fihrist.txt"
    },
    {
      id: 11,
      title: "Meyve Risalesi",
      img: "img/books_cover/ruscameyve.jpg",
      sections: getSections("ruscameyve/ruscameyve", 9),
      content: "res/books/ruscameyve/fihrist.txt"
    },
    {
      id: 12,
      title: "Ramazan-ı Şerife Dairdir",
      img: "img/books_cover/ruscaramazan.jpg",
      sections: getSections("ruscaramazan/ruscaramazan", 2),
      content: "res/books/ruscaramazan/fihrist.txt"
    },
    {
      id: 13,
      title: "Tabiat Risalesi",
      img: "img/books_cover/ruscatabiat.jpg",
      sections: getSections("ruscatabiat/ruscatabiat", 5),
      content: "res/books/ruscatabiat/fihrist.txt"
    },
    {
      id: 14,
      title: "Tesettür Risalesi",
      img: "img/books_cover/ruscatesettur.jpg",
      sections: getSections("ruscatesettur/ruscatesettur", 1),
      content: "res/books/ruscatesettur/fihrist.txt"
    },
    {
      id: 15,
      title: "Uhuvvet Risalesi",
      img: "img/books_cover/ruscauhuvvet.jpg",
      sections: getSections("ruscauhuvvet/ruscauhuvvet", 2),
      content: "res/books/ruscauhuvvet/fihrist.txt"
    },
    {
      id: 16,
      title: "Küçük Sözler Renkli",
      img: "img/books_cover/ruscakucuksozler.jpg",
      sections: getSections("ruscakucuksozlerv5/ruscakucuksozlerv5", 3),
      content: "res/books/ruscakucuksozlerv5/fihrist.txt"
    }
  ]
}