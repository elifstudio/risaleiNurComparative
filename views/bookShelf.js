function getBookShelfView(selected) {
  $$('sidebarId').unselect();
  window.rnk.currView = "bookShelf";
  hideMainSidebar(true);
  return {
    view: "dataview",
    id: "mainViewId",
    select: true,
    type: {
      height: "240",
      width: "160",
      type: "tiles",
    },
    template: "<img src='#img#' height='80%' width='100%'>" +
      "<div style='text-align:center;word-wrap:break-word; height:50px;'>#title#</div>",
    data: getBooks(selected),
    on: {
      onSelectChange: () => {
        var selected = $$("mainViewId").getSelectedItem();
        window.rnk.book = selected;
        webix.ui(displayBook(selected, 0, "main"), $$("mainViewId"));
        window.history.pushState("book", null, "");
      }
    }
  }
}

function getBooks(selected) {
  switch (selected.id) {
    case "en":
      return getEnglishBooks();
    case "ru":
      return getRussianBooks();
    case "arb":
      return getArabicBooks();
    case "fr":
      return getFrenchBooks();
    case "gr":
      return getGermanBooks();
    case "chi":
      return getChineseBooks();
    case "ind":
      return getIndonesianBooks();
    case "jap":
      return getJapaneseBooks();
    case "pers":
      return getPersianBooks();
    case "uzb":
      return getUzbekBooks();
    case "spa":
      return getSpanishBooks();
    case "kor":
      return getKoreanBooks();
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
      title: "Sözler",
      img: "img/books_cover/words.jpg",
      sections: getSections("ingsozler/ingsozler", 73),
      content: "res/books/ingsozler/fihrist.txt"
    },
    {
      id: 2,
      title: "Lemalar",
      img: "img/books_cover/flashes.jpg",
      sections: getSections("inglemalar/inglemalar", 46),
      content: "res/books/inglemalar/fihrist.txt"
    },
    {
      id: 3,
      title: "Mektubat",
      img: "img/books_cover/letters.jpg",
      sections: getSections("ingmektubat/ingmektubat", 55),
      content: "res/books/ingmektubat/fihrist.txt"
    },
    {
      id: 4,
      title: "Gençlik Rehberi",
      img: "img/books_cover/guideforyouth.jpg",
      sections: getSections("inggenclik/inggenclik", 17),
      content: "res/books/inggenclik/fihrist.txt"
    },
    {
      id: 5,
      title: "Meyve Risalesi",
      img: "img/books_cover/ingmeyve.jpg",
      sections: getSections("ingmeyve/ingmeyve", 9),
      content: "res/books/ingmeyve/fihrist.txt"
    },
    {
      id: 6,
      title: "Elhüccetüz Zehra",
      img: "img/books_cover/rays.jpg",
      sections: getSections("ing15sua/ing15sua", 8),
      content: "res/books/ing15sua/fihrist.txt"
    },
    {
      id: 7,
      title: "Ayet-ül Kübra",
      img: "img/books_cover/supremesign.jpg",
      sections: getSections("ingayetulkubra/ingayetulkubra", 8),
      content: "res/books/ingayetulkubra/fihrist.txt"
    },
    {
      id: 8,
      title: "Haşir Risalesi",
      img: "img/books_cover/inghasir.jpg",
      sections: getSections("inghasir/inghasir", 21),
      content: "res/books/inghasir/fihrist.txt"
    },
    {
      id: 9,
      title: "Hastalar Risalesi",
      img: "img/books_cover/inghastalar.jpg",
      sections: getSections("inghastalar/inghastalar", 8),
      content: "res/books/inghastalar/fihrist.txt"
    },
    {
      id: 10,
      title: "Küçük Sözler",
      img: "img/books_cover/ingkucuksozler.jpg",
      sections: getSections("ingkucuksozler/ingkucuksozler", 11),
      content: "res/books/ingkucuksozler/fihrist.txt"
    },
    {
      id: 11,
      title: "Tabiat Risalesi",
      img: "img/books_cover/nature.jpg",
      sections: getSections("ingtabiat/ingtabiat", 5),
      content: "res/books/ingtabiat/fihrist.txt"
    },
    {
      id: 12,
      title: "Yirmiüçüncü Söz",
      img: "img/books_cover/beliefandman2.jpg",
      sections: getSections("ing23soz/ing23soz", 7),
      content: "res/books/ing23soz/fihrist.txt"
    },
    {
      id: 13,
      title: "Otuz Üçüncü Söz",
      img: "img/books_cover/ing33pencere.jpg",
      sections: getSections("ing33soz/ing33soz", 7),
      content: "res/books/ing33soz/fihrist.txt"
    },
    {
      id: 14,
      title: "Uhuvvet Risalesi (22.Mektub)",
      img: "img/books_cover/ikhlas.jpg",
      sections: getSections("inguhuvvet/inguhuvvet", 2),
      content: "res/books/inguhuvvet/fihrist.txt"
    },
    {
      id: 15,
      title: "Tesettür Risalesi",
      img: "img/books_cover/ingtesettur.jpg",
      sections: getSections("ingtesettur/ingtesettur", 2),
      content: "res/books/ingtesettur/fihrist.txt"
    },
    {
      id: 16,
      title: "İhlas Risaleleri",
      img: "img/books_cover/ikhlas.jpg",
      sections: getSections("ingihlas/ingihlas", 4),
      content: "res/books/ingihlas/fihrist.txt"
    },
    {
      id: 17,
      title: "Mucizat-ı Kuraniye",
      img: "img/books_cover/ing25soz.jpg",
      sections: getSections("ing25soz/ing25soz", 10),
      content: "res/books/ing25soz/fihrist.txt"
    },
    {
      id: 18,
      title: "Mucizat-ı Ahmediye",
      img: "img/books_cover/ing19mektub.jpg",
      sections: getSections("ing19mektub/ing19mektub", 14),
      content: "res/books/ing19mektub/fihrist.txt"
    },
    {
      id: 19,
      title: "Ramazan-İktisat-Şükür Risalesi",
      img: "img/books_cover/ramadan.jpg",
      sections: getSections("ingramazan/ingramazan", 3),
      content: "res/books/ingramazan/fihrist.txt"
    },
    {
      id: 20,
      title: "Münacat Risalesi (3.Şua)",
      img: "img/books_cover/rays.jpg",
      sections: getSections("ingmunacat/ingmunacat", 2),
      content: "res/books/ingmunacat/fihrist.txt"
    },
    {
      id: 21,
      title: "Sünnet-i Seniyye",
      img: "img/books_cover/ing11lema.jpg",
      sections: getSections("ing11lema/ing11lema", 2),
      content: "res/books/ing11lema/fihrist.txt"
    },
    {
      id: 22,
      title: "Yirmiikinci Söz",
      img: "img/books_cover/words.jpg",
      sections: getSections("ing22soz/ing22soz", 4),
      content: "res/books/ing22soz/fihrist.txt"
    },
    {
      id: 23,
      title: "Şeytanla Münazara",
      img: "img/books_cover/letters.jpg",
      sections: getSections("ing26mektub/ing26mektub", 1),
      content: "res/books/ing26mektub/fihrist.txt"
    }, {
      id: 24,
      title: "Yirmidokuzuncu Söz",
      img: "img/books_cover/ing29soz.jpg",
      sections: getSections("ing29soz/ing29soz", 4),
      content: "res/books/ing29soz/fihrist.txt"
    },
    {
      id: 25,
      title: "Ene ve Zerre Risaleleri",
      img: "img/books_cover/ing30soz.jpg",
      sections: getSections("ing30soz/ing30soz", 3),
      content: "res/books/ing30soz/fihrist.txt"
    },
    {
      id: 26,
      title: "Miraç ve Şakk-ı Kamer Risalesi",
      img: "img/books_cover/words.jpg",
      sections: getSections("ing31soz/ing31soz", 4),
      content: "res/books/ing31soz/fihrist.txt"
    }, {
      id: 27,
      title: "Otuz İkinci Söz",
      img: "img/books_cover/words.jpg",
      sections: getSections("ing32soz/ing32soz", 7),
      content: "res/books/ing32soz/fihrist.txt"
    },
  ]
}

function getRussianBooks() {
  return [{
      id: 1,
      title: "Gençlik Rehberi",
      img: "img/books_cover/ruscagenclik.jpg",
      sections: getSections("ruscagenclik/ruscagenclik", 18),
      content: "res/books/ruscagenclik/fihrist.txt"
    },
    {
      id: 2,
      title: "Ayet-ül Kübra",
      img: "img/books_cover/ruscaayetulkubra.jpg",
      sections: getSections("ruscaayetulkubra/ruscaayetulkubra", 8),
      content: "res/books/ruscaayetulkubra/fihrist.txt"
    },
    {
      id: 3,
      title: "Otuzüçüncü Söz",
      img: "img/books_cover/rusca33soz.jpg",
      sections: getSections("rusca33soz/rusca33soz", 7),
      content: "res/books/rusca33soz/fihrist.txt"
    },
    {
      id: 4,
      title: "Sünnet-i Seniyye",
      img: "img/books_cover/rusca11lema.jpg",
      sections: getSections("rusca11lema/rusca11lema", 2),
      content: "res/books/rusca11lema/fihrist.txt"
    },
    {
      id: 5,
      title: "Yirminci Mektub",
      img: "img/books_cover/rusca20mektub.jpg",
      sections: getSections("rusca20mektub/rusca20mektub", 4),
      content: "res/books/rusca20mektub/fihrist.txt"
    },
    {
      id: 6,
      title: "Haşir Risalesi",
      img: "img/books_cover/ruscahasir.jpg",
      sections: getSections("ruscahasir/ruscahasir", 21),
      content: "res/books/ruscahasir/fihrist.txt"
    },
    {
      id: 7,
      title: "Meyve Risalesi",
      img: "img/books_cover/ruscameyve.jpg",
      sections: getSections("ruscameyve/ruscameyve", 9),
      content: "res/books/ruscameyve/fihrist.txt"
    },
    {
      id: 8,
      title: "Tesettür Risalesi",
      img: "img/books_cover/ruscatesettur.jpg",
      sections: getSections("ruscatesettur/ruscatesettur", 1),
      content: "res/books/ruscatesettur/fihrist.txt"
    },
    {
      id: 9,
      title: "Küçük Sözler",
      img: "img/books_cover/ruscakucuksozler.jpg",
      sections: getSections("ruscakucuksozler/ruscakucuksozler", 5),
      content: "res/books/ruscakucuksozler/fihrist.txt"
    },
    {
      id: 10,
      title: "Uhuvvet Risalesi",
      img: "img/books_cover/ruscauhuvvet.jpg",
      sections: getSections("ruscauhuvvet/ruscauhuvvet", 2),
      content: "res/books/ruscauhuvvet/fihrist.txt"
    },
    {
      id: 11,
      title: "Küçük Sözler Renkli",
      img: "img/books_cover/ruscakucuksozler.jpg",
      sections: getSections("ruscakucuksozlerv5/ruscakucuksozlerv5", 3),
      content: "res/books/ruscakucuksozlerv5/fihrist.txt"
    },
    {
      id: 12,
      title: "Hastalar Risalesi",
      img: "img/books_cover/ruscahastalar.jpg",
      sections: getSections("ruscahastalar/ruscahastalar", 8),
      content: "res/books/ruscahastalar/fihrist.txt"
    },
    {
      id: 13,
      title: "Yirmiüçünçü Söz",
      img: "img/books_cover/rusca23soz.jpg",
      sections: getSections("rusca23soz/rusca23soz", 7),
      content: "res/books/rusca23soz/fihrist.txt"
    },
    {
      id: 14,
      title: "Tabiat Risalesi",
      img: "img/books_cover/ruscatabiat.jpg",
      sections: getSections("ruscatabiat/ruscatabiat", 5),
      content: "res/books/ruscatabiat/fihrist.txt"
    },
    {
      id: 15,
      title: "Yirmibirinci Lem'a",
      img: "img/books_cover/rusca21lema.jpg",
      sections: getSections("rusca21lema/rusca21lema", 2),
      content: "res/books/rusca21lema/fihrist.txt"
    },
    {
      id: 16,
      title: "Ramazan-ı Şerife Dairdir",
      img: "img/books_cover/ruscaramazan.jpg",
      sections: getSections("ruscaramazan/ruscaramazan", 2),
      content: "res/books/ruscaramazan/fihrist.txt"
    },
  ]
}

function getArabicBooks() {
  return [{
      id: 1,
      title: "Hastalar Risalesi",
      img: "img/books_cover/arabihastalar.jpg",
      sections: getSections("arabihastalar/arabihastalar", 8),
      content: "res/books/arabihastalar/fihrist.txt"
    },
    {
      id: 2,
      title: "Gençlik Rehberi",
      img: "img/books_cover/arabigenclik.jpg",
      sections: getSections("arabigenclik/arabigenclik", 14),
      content: "res/books/arabigenclik/fihrist.txt"
    },
    {
      id: 3,
      title: "Haşir Risalesi(10.Söz)",
      img: "img/books_cover/arabihasir.jpg",
      sections: getSections("arabihasir/arabihasir", 8),
      content: "res/books/arabihasir/fihrist.txt"
    },
    {
      id: 4,
      title: "Tabiat Risalesi",
      img: "img/books_cover/arabitabiat.jpg",
      sections: getSections("arabitabiat/arabitabiat", 5),
      content: "res/books/arabitabiat/fihrist.txt"
    },
    {
      id: 5,
      title: "Küçük Sözler",
      img: "img/books_cover/arabikucuksozler.jpg",
      sections: getSections("arabikucuksozler/arabikucuksozler", 9),
      content: "res/books/arabikucuksozler/fihrist.txt"
    },
    {
      id: 6,
      title: "Hutbe-i Şamiye",
      img: "img/books_cover/arabihutbesamiye.jpg",
      sections: getSections("arabihutbesamiye/arabihutbesamiye", 5),
      content: "res/books/arabihutbesamiye/fihrist.txt"
    },
    {
      id: 7,
      title: "23.Söz",
      img: "img/books_cover/arabi23soz.jpg",
      sections: getSections("arabi23soz/arabi23soz", 3),
      content: "res/books/arabi23soz/fihrist.txt"
    },
    {
      id: 8,
      title: "Ramazan Risalesi",
      img: "img/books_cover/ramadan.jpg",
      sections: getSections("arabiramazan/arabiramazan", 2),
      content: "res/books/arabiramazan/fihrist.txt"
    },
    {
      id: 9,
      title: "Sünnet-i Seniyye Risalesi",
      img: "img/books_cover/arabi11lema.jpg",
      sections: getSections("arabi11lema/arabi11lema", 2),
      content: "res/books/arabi11lema/fihrist.txt"
    },
    {
      id: 10,
      title: "Tesettür Risalesi",
      img: "img/books_cover/arabitesettur.jpg",
      sections: getSections("arabitesettur/arabitesettur", 1),
      content: "res/books/arabitesettur/fihrist.txt"
    },
    {
      id: 11,
      title: "Uhuvvet Risalesi",
      img: "img/books_cover/arabiihlasuhuvvet.jpg",
      sections: getSections("arabiuhuvvet/arabiuhuvvet", 5),
      content: "res/books/arabiuhuvvet/fihrist.txt"
    },
    {
      id: 12,
      title: "İhlas Risalesi",
      img: "img/books_cover/arabiihlasuhuvvet.jpg",
      sections: getSections("arabiihlas/arabiihlas", 4),
      content: "res/books/arabiihlas/fihrist.txt"
    },
    {
      id: 13,
      title: "İçtihad Risalesi(27.Söz)",
      img: "img/books_cover/arabi27soz.jpg",
      sections: getSections("arabi27soz/arabi27soz", 4),
      content: "res/books/arabi27soz/fihrist.txt"
    },
  ]
}

function getFrenchBooks() {
  return [{
      id: 1,
      title: "Ramazan Risalesi",
      img: "img/books_cover/fransizcaramazan.jpg",
      sections: getSections("fransizcaramazan/fransizcaramazan", 2),
      content: "res/books/fransizcaramazan/fihrist.txt"
    },
    {
      id: 2,
      title: "Hastalar Risalesi",
      img: "img/books_cover/fransizcahastalar.jpg",
      sections: getSections("fransizcahastalar/fransizcahastalar", 6),
      content: "res/books/fransizcahastalar/fihrist.txt"
    },
    {
      id: 3,
      title: "Haşir Risalesi",
      img: "img/books_cover/fransizcahasir.jpg",
      sections: getSections("fransizcahasir/fransizcahasir", 21),
      content: "res/books/fransizcahasir/fihrist.txt"
    },
  ]
}

function getGermanBooks() {
  return [{
      id: 1,
      title: "Hastalar Risalesi",
      img: "img/books_cover/almancahastalar.jpg",
      sections: getSections("almancahastalar/almancahastalar", 2),
      content: "res/books/almancahastalar/fihrist.txt"
    },
    {
      id: 2,
      title: "Küçük Sözler",
      img: "img/books_cover/almancakucuksozler.jpg",
      sections: getSections("almancakucuksozler/almancakucuksozler", 5),
      content: "res/books/almancakucuksozler/fihrist.txt"
    },
    {
      id: 3,
      title: "23.Söz",
      img: "img/books_cover/almanca23soz.jpg",
      sections: getSections("almanca23soz/almanca23soz", 3),
      content: "res/books/almanca23soz/fihrist.txt"
    },
  ]
}

function getChineseBooks() {
  return [{
      id: 1,
      title: "Hastalar Risalesi",
      img: "img/books_cover/cincehastalar.jpg",
      sections: getSections("cincehastalar/cincehastalar", 8),
      content: "res/books/cincehastalar/fihrist.txt"
    },
    {
      id: 2,
      title: "Ramazan-İktisat-Şükür Risalesi",
      img: "img/books_cover/cinceramazan.jpg",
      sections: getSections("cinceramazan/cinceramazan", 4),
      content: "res/books/cinceramazan/fihrist.txt"
    },
    {
      id: 3,
      title: "Küçük Sözler",
      img: "img/books_cover/cincekucuksozler.jpg",
      sections: getSections("cincekucuksozler/cincekucuksozler", 10),
      content: "res/books/cincekucuksozler/fihrist.txt"
    },

  ]
}

function getIndonesianBooks() {
  return [{
    id: 1,
    title: "Küçük Sözler",
    img: "img/books_cover/endonezcekucuksozler.jpg",
    sections: getSections("endonezcekucuksozler/endonezcekucuksozler", 11),
    content: "res/books/endonezcekucuksozler/fihrist.txt"
  }]
}

function getJapaneseBooks() {
  return [{
    id: 1,
    title: "Küçük Sözler",
    img: "img/books_cover/japkucuksozler.jpg",
    sections: getSections("japkucuksozler/japkucuksozler", 10),
    content: "res/books/japkucuksozler/fihrist.txt"
  }]
}

function getPersianBooks() {
  return [{
    id: 1,
    title: "Hastalar Risalesi",
    img: "img/books_cover/farsihastalar.png",
    sections: getSections("farsihastalar/farsihastalar", 7),
    content: "res/books/farsihastalar/fihrist.txt"
  }]
}

function getUzbekBooks() {
  return [{
      id: 1,
      title: "Küçük Sözler",
      img: "img/books_cover/ozbekkucuksozler.jpg",
      sections: getSections("ozbekkucuksozler/ozbekkucuksozler", 11),
      content: "res/books/ozbekkucuksozler/fihrist.txt"
    },
    {
      id: 2,
      title: "Hastalar Risalesi",
      img: "img/books_cover/ozbekhastalar.jpg",
      sections: getSections("ozbekhastalar/ozbekhastalar", 8),
      content: "res/books/ozbekhastalar/fihrist.txt"
    },
    {
      id: 3,
      title: "23.Söz",
      img: "img/books_cover/ozbek23soz.jpg",
      sections: getSections("ozbek23soz/ozbek23soz", 3),
      content: "res/books/ozbek23soz/fihrist.txt"
    },
  ]
}

function getSpanishBooks() {
  return [{
      id: 1,
      title: "Küçük Sözler",
      img: "img/books_cover/ispkucuksozler.jpg",
      sections: getSections("ispkucuksozler/ispkucuksozler", 9),
      content: "res/books/ispkucuksozler/fihrist.txt"
    },
    {
      id: 2,
      title: "Hastalar Risalesi",
      img: "img/books_cover/isphastalar.jpg",
      sections: getSections("isphastalar/isphastalar", 3),
      content: "res/books/isphastalar/fihrist.txt"
    },

  ]
}

function getKoreanBooks() {
  return [{
    id: 1,
    title: "Hastalar Risalesi",
    img: "img/books_cover/korecehastalar.jpg",
    sections: getSections("korecehastalar/korecehastalar", 6),
    content: "res/books/korecehastalar/fihrist.txt"
  }]
}