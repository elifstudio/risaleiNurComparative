function displayBook(selected, selectedSection, flag) {
  window.rnk.currSection = selectedSection;
  window.rnk.currView = "bookView";
  hideMainSidebar(false);
  var section = {
    id: "mainViewId",
    cols: [{
        rows: [{
            view: "iframe",
            id: "iframeId",
            src: selected.sections[selectedSection],
            on: {
              onAfterLoad: () => {
                changeNightMode();
                zoomOut(window.rnk.zoom);
                changeReadingMode(window.rnk.readMode);
                if (flag == "chapter") {
                  scrollTo(window.rnk.onAfterLoadChapter);
                }
                if (flag == "prev") scrollTo("bottom", 10);
              }
            }
          },
          {
            view: "scrollview",
            id: "scrollviewId",
            scroll: "auto",
            height: 40,
            body: {
              cols: [
                {},
                {
                  view: "button",
                  type: "icon",
                  icon: "mdi mdi-fullscreen",
                  width: 40,
                  tooltip: "Full Screen",
                  css: "webix_secondary",
                  on: {
                    onItemClick: (id, e) => {
                      fullScreen(true);
                    }
                  }
                },
                {
                  view: "richselect",
                  id: "readModeId",
                  width: 100,
                  value: window.rnk.readMode,
                  tooltip: "Reading Mode",
                  options: [
                    { id: "CSSOF", value: "OTH-TR" },
                    { id: "CSSTF", value: "TR-OTH" },
                    { id: "CTBOF", value: "OTH/TR" },
                    { id: "CTBTF", value: "TR/OTH" },
                    { id: "OSO", value: "OTH" },
                    { id: "OST", value: "TR" },
                  ],
                  on: {
                    onChange: (newVal, oldVal) => {
                      changeReadingMode(newVal);
                      window.rnk.readMode = newVal;
                    }
                  }
                },
                {
                  view: "richselect",
                  id: "zoomId",
                  width: 100,
                  tooltip: "Font Size",
                  value: window.rnk.zoom,
                  options: [
                    { id: 80, value: "80%" },
                    { id: 90, value: "90%" },
                    { id: 100, value: "100%" },
                    { id: 110, value: "110%" },
                    { id: 120, value: "120%" },
                    { id: 130, value: "130%" },
                    { id: 140, value: "140%" }
                  ],
                  on: {
                    onChange: (newVal, oldVal) => {
                      zoomOut(newVal);
                      window.rnk.zoom = newVal;
                    }
                  }
                },
                {
                  view: "button",
                  id: "prev",
                  value: "<",
                  css: "webix_primary",
                  width: 50,
                  on: {
                    onItemClick: (id, e) => {
                      window.rnk.currSection--;
                      if (window.rnk.currSection < 0) window.rnk.currSection = 0;
                      else changeSection(selected, window.rnk.currSection, "prev");
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
                      window.rnk.currSection++;
                      if (window.rnk.currSection >= selected.sections.length)
                        window.rnk.currSection = selected.sections.length - 1;
                      else changeSection(selected, window.rnk.currSection, "next");
                    }
                  }
                }
              ]
            }
          }
        ]

      },
      { view: "resizer" },
      {
        view: "accordion",
        multi: true,
        id: "fihristId",
        cols: [{
          header: "Fihrist",
          collapsed: true,
          body: {
            rows: [{
                cols: [
                  { view: "text", placeholder: "Sayfa girin", width: 100, id: "pageId" },
                  {
                    view: "button",
                    type: "icon",
                    icon: "mdi mdi-arrow-right-bold",
                    width: 50,
                    css: "webix_secondary",
                    on: {
                      onItemClick: (id, e) => {
                        var page = Number(webix.$$("pageId").getValue());
                        var sectionNum = getSectionNum(page);
                        var pageStr = "page-" + page;
                        if (selected.sections.length >= sectionNum) {
                          if (sectionNum != window.rnk.currSection) {
                            changeSection(selected, sectionNum, "chapter");
                            window.rnk.onAfterLoadChapter = pageStr;
                          } else scrollTo(pageStr);
                        }
                      }
                    }
                  },
                  {}
                ]
              },
              {
                view: "tree",
                select: true,
                id: "fihrist",
                data: getChapters(selected.content),
                on: {
                  onItemClick: (id, e, node) => {
                    var item = webix.$$("fihrist").getItem(id);
                    var page = Number(item.page.replace("#", ""));
                    var sectionNum = getSectionNum(page);
                    if (sectionNum != window.rnk.currSection) {
                      changeSection(selected, sectionNum, "chapter");
                      window.rnk.onAfterLoadChapter = id;
                    } else scrollTo(id);
                  }
                }
              }
            ]
          }
        }]
      }
    ]
  }
  return section;
}

function changeSection(selected, selectedSection, flag) {
  window.rnk.currSection = selectedSection;
  var result = {
    view: "iframe",
    id: "iframeId",
    src: selected.sections[selectedSection],
    on: {
      onAfterLoad: () => {
        changeNightMode();
        zoomOut(window.rnk.zoom);
        changeReadingMode(window.rnk.readMode);
        if (flag == "chapter") {
          scrollTo(window.rnk.onAfterLoadChapter);
        }
        if (flag == "prev") scrollTo("bottom", 10);
      }
    }
  };
  webix.ui(result, $$("iframeId"));
}

function getSectionNum(page) {
  var sectionPageOffset = 10;
  return Math.floor(Math.max(0, (page - 1)) / sectionPageOffset);
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

  $('body, html', iframe.document).animate({
      scrollTop: element.offset().top - 15
    },
    animationTime,
    function() {
      if (callback) callback();
    });
}

function changeNightMode(mode) {
  // mode can be 'gece' or 'gunduz'
  if (window.rnk.currView == "bookView") {
    var iframe = window.parent.frames[0];
    $('body', iframe.document).attr('class', mode ? mode : window.rnk.nightMode);
  }
}

function zoomOut(value) {
  var iframe = window.parent.frames[0];
  $('body', iframe.document).css("zoom", value + "%");
  changeReadingMode();
}

function changeReadingMode(viewType) {
  var iframe = window.parent.frames[0];
  var trFirst = false;
  switch (viewType) {
    case "CSSOF":
      $("td.col-OTHER, td.col-TR", iframe.document).show();
      $('#mergedTable', iframe.document).removeClass('topAndBottom onlySideOther onlySideTR').addClass('sideBySide');
      $("td.col-OTHER, td.col-TR", iframe.document).removeAttr('colspan');
      trFirst = false;
      break;
    case "CSSTF":
      $("td.col-OTHER, td.col-TR", iframe.document).show();
      $('#mergedTable', iframe.document).removeClass('topAndBottom onlySideOther onlySideTR').addClass('sideBySide');
      $("td.col-OTHER, td.col-TR", iframe.document).removeAttr('colspan');
      trFirst = true;
      break;
    case "CTBOF":
      $("td.col-OTHER, td.col-TR", iframe.document).show();
      $('#mergedTable', iframe.document).removeClass('sideBySide onlySideOther onlySideTR').addClass('topAndBottom');
      $("td.col-OTHER, td.col-TR", iframe.document).removeAttr('colspan');
      trFirst = false;
      break;
    case "CTBTF":
      $("td.col-OTHER, td.col-TR", iframe.document).show();
      $('#mergedTable', iframe.document).removeClass('sideBySide onlySideOther onlySideTR').addClass('topAndBottom');
      $("td.col-OTHER, td.col-TR", iframe.document).removeAttr('colspan');
      trFirst = true;
      break;
    case "OSO":
      $("td.col-OTHER", iframe.document).show();
      $("td.col-OTHER", iframe.document).attr('colspan', '2');
      $("td.col-TR", iframe.document).hide();
      $("td.col-TR", iframe.document).removeAttr('colspan');
      $('#mergedTable', iframe.document).removeClass('sideBySide topAndBottom onlySideTR').addClass('onlySideOther');
      break;
    case "OST":
      $("td.col-TR", iframe.document).show();
      $("td.col-TR", iframe.document).attr('colspan', '2');
      $("td.col-OTHER", iframe.document).hide();
      $("td.col-OTHER", iframe.document).removeAttr('colspan');
      $('#mergedTable', iframe.document).removeClass('sideBySide topAndBottom onlySideOther').addClass('onlySideTR');
      break;
  }

  // adjust the language precedence
  $("tr", iframe.document).has("td.col-OTHER").has("td.col-TR").each(function() {
    var col1 = $(this, iframe.document).children("td.col-OTHER").first();
    var col2 = $(this, iframe.document).children("td.col-TR").first();
    if (trFirst)
      col1.insertAfter(col2);
    else
      col2.insertAfter(col1);
  });
}