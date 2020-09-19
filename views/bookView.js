function displayBook(selected, selectedSection, flag) {
  window.rnk.currSection = selectedSection;
  window.rnk.currView = "bookView";
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
                if (flag == "chapter") {
                  scrollTo(window.rnk.onAfterLoadChapter);
                }
                if (flag == "prev") scrollTo("bottom", 10);
              }
            }
          },
          {
            view: "scrollview",
            id: "scrollview",
            scroll: "auto",
            height: 40,
            body: {
              cols: [
                {},
                {
                  view: "richselect",
                  id: "zoomId",
                  width: 100,
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
                { view: "text", placeholder: "Sayfa", width: 80, id: "pageId" },
                {
                  view: "button",
                  type: "icon",
                  icon: "mdi mdi-arrow-right-bold",
                  width: 30,
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
                if (sectionNum != window.rnk.currSection) {
                  changeSection(selected, sectionNum, "chapter");
                  window.rnk.onAfterLoadChapter = id;
                } else scrollTo(id);
              }
            }
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
  viewType = "COMPARATIVE_TOP_AND_BOTTOM_OTHER_FIRST";
  console.log(viewType);
  var trFirst = false;
  switch (viewType) {
    case "COMPARATIVE_SIDE_BY_SIDE_OTHER_FIRST":
      $("td.col-OTHER, td.col-TR").show();
      $('#mergedTable').removeClass('topAndBottom onlySideOther onlySideTR').addClass('sideBySide');
      $("td.col-OTHER, td.col-TR").removeAttr('colspan');
      trFirst = false;
      break;
    case "COMPARATIVE_SIDE_BY_SIDE_TR_FIRST":
      $("td.col-OTHER, td.col-TR", iframe.document).show();
      $('#mergedTable', iframe.document).removeClass('topAndBottom onlySideOther onlySideTR').addClass('sideBySide');
      $("td.col-OTHER, td.col-TR", iframe.document).removeAttr('colspan');
      trFirst = true;
      break;
    case "COMPARATIVE_TOP_AND_BOTTOM_OTHER_FIRST":
      $("td.col-OTHER, td.col-TR", iframe.document).show();
      $('#mergedTable', iframe.document).removeClass('sideBySide onlySideOther onlySideTR').addClass('topAndBottom');
      $("td.col-OTHER, td.col-TR", iframe.document).removeAttr('colspan');
      trFirst = false;
      break;
    case "COMPARATIVE_TOP_AND_BOTTOM_TR_FIRST":
      $("td.col-OTHER, td.col-TR").show();
      $('#mergedTable').removeClass('sideBySide onlySideOther onlySideTR').addClass('topAndBottom');
      $("td.col-OTHER, td.col-TR").removeAttr('colspan');
      trFirst = true;
      break;
    case "ONLY_SIDE_OTHER":
      $("td.col-OTHER").show();
      $("td.col-OTHER").attr('colspan', '2');
      $("td.col-TR").hide();
      $("td.col-TR").removeAttr('colspan');
      $('#mergedTable').removeClass('sideBySide topAndBottom onlySideTR').addClass('onlySideOther');
      break;
    case "ONLY_SIDE_TR":
      $("td.col-TR").show();
      $("td.col-TR").attr('colspan', '2');
      $("td.col-OTHER").hide();
      $("td.col-OTHER").removeAttr('colspan');
      $('#mergedTable').removeClass('sideBySide topAndBottom onlySideOther').addClass('onlySideTR');
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

  //after layout change, restore the previous paragraph
  //if ($(window).data('currentPrg') !== undefined)
  //  scrollToAnchor($(window).data('currentPrg'), 1, function() {});
}