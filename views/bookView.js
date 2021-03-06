function displayBook(selected, selectedSection, flag) {
  window.rnk.currSection = selectedSection;
  window.rnk.currView = "bookView";
  hideMainSidebar(false);
  var section = {
    view: "accordion",
    multi: true,
    id: "mainViewId",
    cols: [{
        header: _("Menu"),
        collapsed: isMobile.test(navigator.userAgent),
        id: "bookViewMenuId",
        width: 180,
        body: {
          view: "form",
          elements: [{
              view: "button",
              type: "icon",
              icon: "mdi mdi-table-of-contents",
              label: _("Content"),
              css: "webix_secondary",
              on: {
                onItemClick: (id, e) => {
                  var isCollapsed = webix.$$("fihristId").config.collapsed ? false : true;
                  webix.$$("fihristId").define("collapsed", isCollapsed);
                }
              }
            },
            {
              view: "button",
              type: "icon",
              icon: "mdi mdi-fullscreen",
              label: _("Full Screen"),
              css: "webix_secondary",
              on: {
                onItemClick: (id, e) => {
                  fullScreen(true);
                }
              }
            },
            {
              view: "switch",
              onLabel: _("Day"),
              offLabel: _("Night"),
              css: { "padding-left": "15%" },
              value: window.rnk.nightMode == "gunduz" ? 1 : 0,
              on: {
                onChange: (newVal, oldVal) => {
                  window.rnk.nightMode = newVal == 1 ? "gunduz" : "gece";
                  changeNightMode(window.rnk.nightMode);
                }
              }
            },
            { template: _("Font-Size"), type: "section" },
            {
              cols: [{
                  view: "button",
                  type: "icon",
                  icon: "mdi mdi-plus-box-outline",
                  on: {
                    onItemClick: (id, e) => {
                      window.rnk.zoom = window.rnk.zoom + 5;
                      zoomOut(window.rnk.zoom);
                      webix.message("Font-size: " + window.rnk.zoom + "%");
                    }
                  }
                },
                {
                  view: "button",
                  type: "icon",
                  icon: "mdi mdi-minus-box-outline",
                  on: {
                    onItemClick: (id, e) => {
                      window.rnk.zoom = window.rnk.zoom - 5;
                      zoomOut(window.rnk.zoom);
                      webix.message("Font-size: " + window.rnk.zoom + "%");
                    }
                  }
                }
              ]
            },
            { template: _("Reading-Mode"), type: "section" },
            {
              rows: [{
                  cols: [getReadModeButton("mdi-format-columns", "CSSOF"), getReadModeButton("mdi-format-align-center", "CTBOF")]
                },
                {
                  cols: [getReadModeButton("TR", "OST"), getReadModeButton("EN", "OSO")]
                },
                {
                  cols: [getReadModeButton("mdi-compare-vertical", "swap"), {}]
                },
              ]
            },
            {}
          ]
        }
      },
      {
        view: "iframe",
        id: "iframeId",
        src: selected.sections[selectedSection],
        on: {
          onAfterLoad: () => {
            changeNightMode();
            zoomOut(window.rnk.zoom);
            changeReadingMode(window.rnk.readMode);
            addSectionButton(selected);
            if (flag == "chapter") {
              scrollTo(window.rnk.onAfterLoadChapter);
            }
            if (flag == "prev") scrollTo("bottom", 10);
          }
        }
      },
      { view: "resizer" },
      {
        header: _("Content"),
        collapsed: true,
        id: "fihristId",
        body: {
          rows: [{
              cols: [
                { view: "text", placeholder: _("Enter page"), width: 120, id: "pageId" },
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
      }
    ]
  }
  return section;
}

function getReadModeButton(icon, mode) {
  var isIcon = icon.indexOf("mdi") >= 0;
  return {
    view: "button",
    type: isIcon ? "icon" : "",
    icon: isIcon ? "mdi " + icon : "",
    label: isIcon ? "" : icon,
    id: mode,
    tooltip: getReadModeTooltip(mode),
    on: {
      onItemClick: (mode, e) => {
        if (mode == "swap") {
          if (window.rnk.readMode == "CSSOF") mode = "CSSTF";
          if (window.rnk.readMode == "CSSTF") mode = "CSSOF";
          if (window.rnk.readMode == "CTBOF") mode = "CTBTF";
          if (window.rnk.readMode == "CTBTF") mode = "CTBOF";
        }
        changeReadingMode(mode);
        window.rnk.readMode = mode;
      }
    }
  }
}

function getReadModeTooltip(mode) {
  switch (mode) {
    case "CSSOF":
      return _("Side by side");
    case "CTBOF":
      return _("Top by bottom");
    case "OST":
      return _("Only turkish");
    case "OSO":
      return _("Only other");
    case "swap":
      return _("Swap places");
  }
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
        addSectionButton(selected);
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
  $('body', iframe.document).css("font-size", value + "%");
}

function addSectionButton(selected) {
  var iframe = window.parent.frames[0];
  $('#mergedTable', iframe.document).css("margin-bottom", "100px");
  var style = "display:block;margin:0 auto;background-color:#b39ab5;color:white;border-radius:5px;cursor: pointer;";
  let next = '<button id="nextSectionId" style="' + style + '">' + _("Next page") + '</button>';
  let prev = '<button id="prevSectionId" style="' + style + '">' + _("Previous page") + '</button>';
  $('body', iframe.document).append(next);
  $('body', iframe.document).prepend(prev);

  $('#nextSectionId', iframe.document).click(() => {
    window.rnk.currSection++;
    if (window.rnk.currSection >= selected.sections.length)
      window.rnk.currSection = selected.sections.length - 1;
    else changeSection(selected, window.rnk.currSection, "next");
  });
  $('#prevSectionId', iframe.document).click(() => {
    window.rnk.currSection--;
    if (window.rnk.currSection < 0) window.rnk.currSection = 0;
    else changeSection(selected, window.rnk.currSection, "prev");
  });
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