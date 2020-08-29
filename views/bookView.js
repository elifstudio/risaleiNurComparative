function displayBook(selected, selectedSection, flag) {
  window.currSection = selectedSection;
  window.currView = "bookView";
  var section = {
    id: "mainViewId",
    cols: [{
        rows: [{
            view: "iframe",
            id: "iframeId",
            src: selected.sections[selectedSection],
            on: {
              onAfterLoad: () => {
                if (flag == "chapter") {
                  scrollTo(window.onAfterLoadChapter);
                }
                if (flag == "prev") scrollTo("bottom", 10);
              }
            }
          },
          {
            cols: [
              {},
              {
                view: "button",
                id: "prev",
                value: "<",
                css: "webix_primary",
                width: 50,
                on: {
                  onItemClick: (id, e) => {
                    window.currSection--;
                    if (window.currSection < 0) window.currSection = 0;
                    else changeSection(selected, window.currSection, "prev");
                  }
                }
              },
              {
                view: "button",
                id: "next",
                value: ">",
                css: "webix_primary",
                width: 50,
                on: {
                  onItemClick: (id, e) => {
                    window.currSection++;
                    if (window.currSection >= selected.sections.length)
                      window.currSection = selected.sections.length - 1;
                    else changeSection(selected, window.currSection, "next");
                  }
                }
              }
            ]
          }
        ]

      },
      { view: "resizer" },
      {
        view: "accordion",
        multi: true,
        cols: [{
          header: "Fihrist",
          collapsed: true,
          body: {
            view: "tree",
            select: true,
            id: "fihrist",
            data: getChapters(selected.content),
            on: {
              onItemClick: (id, e, node) => {
                var item = webix.$$("fihrist").getItem(id);
                var page = Number(item.page.replace("#", ""));
                var sectionNum = getSectionNum(page);
                if (sectionNum != window.currSection) {
                  changeSection(selected, sectionNum, "chapter");
                  window.onAfterLoadChapter = id;
                } else scrollTo(id);
              }
            }
          }
        }]
      }
    ]
  }
  if (flag != "main") webix.ui(section, $$("mainViewId"));
  else return section;
}

function changeSection(selected, selectedSection, flag) {
  window.currSection = selectedSection;
  var result = {
    view: "iframe",
    id: "iframeId",
    src: selected.sections[selectedSection],
    on: {
      onAfterLoad: () => {
        if (flag == "chapter") {
          scrollTo(window.onAfterLoadChapter);
        }
        if (flag == "prev") scrollTo("bottom", 10);
      }
    }
  };
  webix.ui(result, $$("iframeId"));
}

function getSectionNum(page) {
  var sectionPageOffset = 10;
  return Math.floor(page / sectionPageOffset);
}

function getChapters(contentAddress) {
  var result = null;
  $.ajax({
    url: contentAddress,
    type: 'get',
    dataType: 'text',
    async: false,
    success: function(data) {
      var chapterConfig = data.split(/\r?\n/);
      result = configureChapters(chapterConfig);
    }
  });
  return result;
}

function configureChapters(chapterConfig) {
  var root = { data: [] };
  chapterConfig.forEach(e => {
    var data = e.split("::"); // 0-page, 1-chpt, 2-lang_1, 3-lang_2
    var mainStr = data[2];
    var treeStep = mainStr.includes("_") ? mainStr.match(/_/g).length : 0;
    if (treeStep == 0) { //root
      root.page = data[0];
      root.id = data[1];
      root.value = data[2] + ' / ' + data[3];
    } else if (treeStep == 1) {
      root.data.push({
        page: data[0],
        id: data[1],
        value: data[2].replace(/_/gi, "") + ' / ' + data[3],
        data: []
      });
      root.open = true;
    } else if (treeStep == 2) {
      var size = root.data.length - 1;

      root.data[size].data.push({
        page: data[0],
        id: data[1],
        value: data[2].replace(/_/gi, "") + ' / ' + data[3],
        data: []
      });
    } else if (treeStep == 3) {
      var size = root.data.length - 1;
      var size_1 = root.data[size].data.length - 1;

      root.data[size].data[size_1].data.push({
        page: data[0],
        id: data[1],
        value: data[2].replace(/_/gi, "") + ' / ' + data[3],
        data: []
      });
    } else if (treeStep == 4) {
      var size = root.data.length - 1;
      var size_1 = root.data[size].data.length - 1;
      var size_2 = root.data[size].data[size_1].data.length - 1;

      root.data[size].data[size_1].data[size_2].data.push({
        page: data[0],
        id: data[1],
        value: data[2].replace(/_/gi, "") + ' / ' + data[3],
        data: []
      });
    } else if (treeStep == 5) {
      var size = root.data.length - 1;
      var size_1 = root.data[size].data.length - 1;
      var size_2 = root.data[size].data[size_1].data.length - 1;
      var size_3 = root.data[size].data[size_1].data[size_2].data.length - 1;

      root.data[size].data[size_1].data[size_2].data[size_3].data.push({
        page: data[0],
        id: data[1],
        value: data[2].replace(/_/gi, "") + ' / ' + data[3]
      });
    }
  });
  var array = [root];
  return array;
}

function scrollTo(anchorId, animationTime, callback) {
  var iframe = window.parent.frames[0];
  var element = $("[name='" + anchorId + "']:visible", iframe.document).first();
  var iframeWindow = iframe.window;
  if ($(iframeWindow).scrollTop() + iframeWindow.innerHeight > $(iframe.document).height() - 50) {
    callback();
    return;
  }

  $('body, html', iframe.document).animate({
      scrollTop: element.offset().top - 15
    },
    animationTime,
    function() {
      if (callback) callback();
    });
}