function onContextMenuListener() {
  console.log("JSINT WORKY contextmenu");
  console.log($(this).text());

  // when a selection is made, change the active prg. to the prg. that contains that selection
  changeActiveParagraph($(this).closest("tr.row-Paragraph"));

  var result = getSelectionTextAndItsLangCode().split("%%%"); // e.g. "TR%%%kuvvetiyle"
  //window.androidInterface.receiveSelectedText(result[1], $(this).text(), result[0]);
}

function getSelectionTextAndItsLangCode() {
  var colClass = $(window.getSelection().anchorNode).closest("td").attr("class"); //col-TR or col-OTHER
  var lang = (colClass == "col-TR") ? langLabel1 : langLabel2; // by default, TR lang label is set to langLabel1
  return lang + "%%%" + window.getSelection().toString();
}

function changeReadingMode(viewType) {
  var trFirst = false;
  switch (viewType) {
    case "COMPARATIVE_SIDE_BY_SIDE_OTHER_FIRST":
      $("td.col-OTHER, td.col-TR").show();
      $('#mergedTable').removeClass('topAndBottom onlySideOther onlySideTR').addClass('sideBySide');
      $("td.col-OTHER, td.col-TR").removeAttr('colspan');
      trFirst = false;
      break;
    case "COMPARATIVE_SIDE_BY_SIDE_TR_FIRST":
      $("td.col-OTHER, td.col-TR").show();
      $('#mergedTable').removeClass('topAndBottom onlySideOther onlySideTR').addClass('sideBySide');
      $("td.col-OTHER, td.col-TR").removeAttr('colspan');
      trFirst = true;
      break;
    case "COMPARATIVE_TOP_AND_BOTTOM_OTHER_FIRST":
      $("td.col-OTHER, td.col-TR").show();
      $('#mergedTable').removeClass('sideBySide onlySideOther onlySideTR').addClass('topAndBottom');
      $("td.col-OTHER, td.col-TR").removeAttr('colspan');
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
  $("tr").has("td.col-OTHER").has("td.col-TR").each(function() {
    var col1 = $(this).children("td.col-OTHER").first();
    var col2 = $(this).children("td.col-TR").first();
    if (trFirst)
      col1.insertAfter(col2);
    else
      col2.insertAfter(col1);
  });

  //after layout change, restore the previous paragraph
  if ($(window).data('currentPrg') !== undefined)
    scrollToAnchor($(window).data('currentPrg'), 1, function() {});
}

function receiveCurrentPrgAndPage() {}

function showBookmarkLabel(anchorId, label) {
  $("tr[name='" + anchorId + "']").before("<tr class='IgnorePrg bookmark'><td colspan='2'><center><button class='bookmarkButton'>" + label +
    "</button></center></td></tr>");
}

function changeNightMode(enable) {
  if (enable == "true") {

    $('body').attr('class', 'gece');
  } else {
    $('body').attr('class', 'gunduz');
  }
}

function initPage(nightMode, currentReadingMode, anchorId) {
  //do whatever required on first load here

  console.log("initPage called!" + " nightMode: " + nightMode +
    " currentReadingMode " + currentReadingMode +
    " anchorId " + anchorId);

  changeNightMode(nightMode);

  //if page otherside is RTL, notify the css
  if (langLabel2 == "AR" || langLabel2 == "FA")
    $('#mergedTable').addClass('otherSideRTL');

  // adjust the current reading mode
  changeReadingMode(currentReadingMode);


  // scroll to the required place
  if (anchorId) {
    scrollToAnchor(anchorId, 1, function() {
      //setTimeout(function() { window.androidInterface.initPageFinished(); }, 500);
    });
  } else {
    // if no first loading anchor defined just signal that loaded
    //setTimeout(function() { window.androidInterface.initPageFinished(); }, 500);
  }

  $.data(window, 'initPageFinished', true); // exit from the state


}

function scrollToAnchor(anchorId, animationTime, callback) {
  scrollTo($("[name='" + anchorId + "']:visible").first(), animationTime, callback);
}

function scrollTo(element, animationTime, callback) {
  // if user has already scrolled to bottom, manually changeActivePrg
  // for triggering highlighting, setting current prg etc.
  //    if($(window).scrollTop() + $(window).height() > $(document).height() - 50) {

  if ($(window).scrollTop() + window.innerHeight > $(document).height() -
    50) { //- 150) { // todo: giving extra 150 prevents fihrist jump if scroll at the end
    //    var scrollHeight = $(document).height();
    //    var scrollPosition = $(window).height() + $(window).scrollTop();
    //    if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
    console.log("reached the bottom!!");
    changeActiveParagraph(element);
    callback();
    return;
  }

  $('body, html').animate({
      scrollTop: element.offset().top - 15
    },
    animationTime,
    function() {
      if (callback)
        callback();
      //            $.data(window, 'animationTimer',
      //                setTimeout(function () {
      //
      //                }, 500));
    });
}

function setCurrentPrgAndPage(newPrg) {
  // COPY THE currentPrg TO prevPrg BEFORE CHANGING THE currentPrg
  if ($(window).data('currentPrg') !== undefined)
    $(window).data('prevPrg', $(window).data('currentPrg'));

  // MANUALLY SET THE CURRENT PRG (e.g. the prg item clicked by user)
  if (newPrg) {
    var currentPrgElt = newPrg;
    $(window).data('currentPrg', currentPrgElt.attr('name'));
  }
  // OTHERWISE, SET AUTOMATICALLY THE TOP PRG AS THE NEW CURRENT PRG
  else {
    var currentPrgElt = getElementByTopOffset("tr.row-Paragraph", $(window).scrollTop());

    $(window).data('currentPrg', currentPrgElt.attr('name'));
  }

  //    var currentPage = getPrevElementByTopOffset(".pageNumber", $(window).scrollTop());
  var currentPage = getPrevElementByTopOffset(".pageNumber", currentPrgElt.offset().top);

  $(window).data("currentPage", currentPage.attr("name"));
}



function changeActiveParagraph(elt, callback) {
  setCurrentPrgAndPage(elt); // give the closest paragraph to be set as currentPrg
  highlightParagraph(elt.attr("name"));
  /*if (!$(window).data('debugMode'))
    window.androidInterface.activePrgChanged($(window).data('currentPrg'),
      $(window).data('prevPrg'),
      $(window).data('currentPage'));*/


}

function onScrollListener() {

  setCurrentPrgAndPage();

  var currentPrgElt = $("tr[name='" + $(window).data('currentPrg') + "']");
  var currentPageElt = $("[name='" + $(window).data('currentPage') + "']:visible").first();

  var activeParagraphDistanceToWindow = currentPrgElt.offset().top - $(window).scrollTop();

  console.log("onScrollListener() " +
    "\n" + "prevPrgId = " + $(window).data('prevPrg') +
    "\n" + "currentPrg = " + $(window).data('currentPrg') +
    "\n" + "activeParagraphDistanceToWindow = " + activeParagraphDistanceToWindow +
    "\n" + "currentPage = " + $(window).data('currentPage') +
    " = " + currentPrgElt.offset().top + " - " + $(window).scrollTop() +
    " (currentPrgElt.offset().top - $(window).scrollTop())");


  highlightParagraph(currentPrgElt.attr("name"));

  /*if (!$(window).data('debugMode')) {
    window.androidInterface.scrollFinished($(window).data('currentPrg'),
      $(window).data('prevPrg'), activeParagraphDistanceToWindow,
      $(window).data('currentPage'));
  }*/

}

// first Paragraf-1 elt in current scroll
function getElementByTopOffset(selector, offsetTop) {
  var paragraphTooTall = $(selector).not(".IgnorePrg").filter(function(index, elem) {
    //       return $(elem).offset().top <= offsetTop && $(elem).offset().top + $(elem).height() >= offsetTop + window.innerHeight / 2;

    // instead of $(elem).height , assume that height is the vertical distance between the element and the first next element with the same selector
    // because paragraf-1 elems. are followed by paragraf-2 elems., height does not give us the real distance until the next paragraf-1
    try {
      return $(elem).offset().top <= offsetTop && $(elem).nextAll(selector + ":first").offset().top >= offsetTop + window.innerHeight / 2;
    } catch (error) {
      // console.log(error);
      // console.log($(elem).text());
      // console.log($(elem).nextAll(selector + ":first").text());

      console.log("Exception: paragraphTooTall is the last one in the page!");
      if ($(elem).nextAll(selector + ":first").length == 0) {
        // it means we are at the lasl elt. in the section with this selector
        return true;
      }
    }
  });
  if (paragraphTooTall.length > 0)
    return paragraphTooTall.first();
  else {
    return $(selector).not(".IgnorePrg").filter(function(index, elem) {
      return $(elem).offset().top >= offsetTop;
    }).first();
  }
}


// get prev pageAralik elt in current scroll
function getPrevElementByTopOffset(selector, offsetTop) {
  return $(selector).filter(function(index, elem) {
    return $(elem).offset().top <= offsetTop;
  }).last();
}

function highlightParagraph(paragraphId) {
  console.log("highlightParagraph(paragraphId) = " + paragraphId);
  var parentRow = $("tr[name='" + paragraphId + "']");
  $("tr").removeClass("highlighted");
  parentRow.addClass("highlighted");
  //prg.nextUntil(prg.nextAll(".Paragraf-1:first"), ".Paragraf-2").addClass("highlighted");
}

function highlightSearchedWordsInParagraphs(prgNames, words) {
  // Parse the JSON arrays passed by Android webview
  prgNames = JSON.parse(prgNames);
  words = JSON.parse(words);
  console.log("highlightSearchedWordsInParagraphs " + prgNames + " = " + words);

  var replacementFunc = function() {
    // var regexQuery = new RegExp(words.map(function(keyword) { return regexPattern.replace("KEY", keyword); }).join("|"), "gui");

    for (var i = 0; i < words.length; i++) {
      // Alternative 1 (?<=[\s,.:;"']|^)(KEY.*?)(?=[\s,.:;"']|$)
      // Alternative 2 (?:^|\\s)(KEY.*?)
      // lookbehind not supported on android webview!
      // use (?:) or (?!) lookaheads instead of lookbehinds (?<=)
      // also flag 'u' in regex is not supported, they need to be omitted
      var regexPatternPartialWord = "([\\s<>,.:;\"“”'(){}\\[\\]،؛—﴾﴿…?!#»«¿¡`´’„“]|^)(KEY.*?)";
      var regexPatternFullWord = "([\\s<>,.:;\"“”'(){}\\[\\]،؛—﴾﴿…?!#»«¿¡`´’„“]|^)(KEY)([\\s<>,.:;\"“”\'(){}\\[\\]،؛—﴾﴿…?!#»«¿¡`´’„“]|$)";
      var alternatedWord = generateAlternatedWord(words[i]);
      var regexHasArabicChars =
        /([\s\(\)\{\}]*[\u0600-\u06FF\uFE70-\uFEFF\u0750-\u077f\uFB50-\uFDFF][\u0600-\u06FF\uFE70-\uFEFF\u0750-\u077f\uFB50-\uFDFF\s\.\(\)\*]+)/g;

      var isArabic = false;
      if (regexHasArabicChars.test(words[i])) {
        alternatedWord = generateAlternatedArabicWord(alternatedWord);
        isArabic = true;
      }

      var replacedSpanPartialWordZWJArabic =
        "$1 <span class='searchHighlighted'>$2&zwj;</span>"; //span separation breaks the arabic joined chars. rejoin them with zero-width-joiner
      var replacedSpanFullWord = "$1<span class='searchHighlighted'>$2</span>$3";
      var replacedSpanPartialWord = "$1<span class='searchHighlighted'>$2</span>";

      var regexQueryPartialWord = new RegExp(regexPatternPartialWord.replace("KEY", alternatedWord), "gi"); // global flag replaces all occurences
      var regexQueryFullWord = new RegExp(regexPatternFullWord.replace("KEY", alternatedWord), "gi"); // global flag replaces all occurences

      var partialMatch = regexQueryPartialWord.test($(this).text());
      var fullwordMatch = regexQueryFullWord.test($(this).text());

      if (partialMatch || fullwordMatch) {
        console.log($(this).html() + " CONTAINS :  " + words);

        if (this.nodeType == Node.TEXT_NODE)
          var newHtml = $(this).parent("p, span").html();
        else
          var newHtml = $(this).html();

        if (isArabic) {
          if (fullwordMatch)
            newHtml = newHtml.replace(regexQueryFullWord, replacedSpanFullWord);
          else
            newHtml = newHtml.replace(regexQueryPartialWord, replacedSpanPartialWordZWJArabic);
        } else {
          // we dont need partial match detection for putting &zwj; for latin alphabet
          //                    if(fullwordMatch)
          //                        newHtml = newHtml.replace(regexQueryFullWord, replacedSpan);
          //                    else
          newHtml = newHtml.replace(regexQueryPartialWord, replacedSpanPartialWord);
        }

        if (this.nodeType == Node.TEXT_NODE) {
          console.log("TEXT_NODE: " + $(this).text() + " contains ");
          $(this).parent().html(newHtml);
        } else {
          $(this).html(newHtml);
          console.log("newHtml:\n" + $(this).prop('outerHTML'));
        }
      } else {
        console.log($(this).html() + " DOES NOT CONTAIN ONE OF : " + words);
      }

    }

  };

  // remove previous highlightings
  //    $("span.searchHighlighted").removeClass("searchHighlighted");

  $.each(prgNames, function(index) {
    var row = $("tr[name='" + prgNames[index] + "']");
    if (row.length) {
      // this returns the following: tr > td > p > a , tr > td > p > TEXT_NODE , tr > td > p > span
      console.log("SEARCHING " + row.attr('name'));
      row.contents().contents().contents().each(replacementFunc);
    }
  });
}

function generateAlternatedWord(word) {
  return word
    //turkish chars
    // SOME CHARS ARE COMMENTED OUT BECAUSE THEY SHOULDN'T BE REPEATEDLY REPLACED
    // CHARS LIKE Ü,Ö ALSO EXIST IN OTHER LANGS LIKE GERMAN
    .replace(/a/gi, "[âÂaA]")
    .replace(/u/gi, "[ûÛuU]")
    .replace(/ü/gi, "[üÜ]")
    .replace(/i/gi, "[iİîÎI]")
    .replace(/ı/gi, "[Iı]")
    .replace(/ç/gi, "[çÇ]")
    .replace(/ş/gi, "[şŞ]")
    .replace(/ğ/gi, "[ğĞ]")
    .replace(/ö/gi, "[öÖ]")
    //spanish chars
    .replace(/á/gi, "[áÁ]")
    .replace(/é/gi, "[éÉ]")
    .replace(/í/gi, "[íÍ]")
    .replace(/ó/gi, "[óÓ]")
    .replace(/ú/gi, "[úÚ]")
    .replace(/ñ/gi, "[ñÑ]")
    //russian chars
    //            .replace(/а/gi, "[Аа]")
    .replace(/б/gi, "[Бб]")
    .replace(/в/gi, "[Вв]")
    .replace(/г/gi, "[Гг]")
    .replace(/д/gi, "[Дд]")
    //            .replace(/е/gi, "[Ее]")
    .replace(/ё/gi, "[Ёё]")
    .replace(/ж/gi, "[Жж]")
    .replace(/з/gi, "[Зз]")
    .replace(/и/gi, "[Ии]")
    .replace(/й/gi, "[Йй]")
    .replace(/к/gi, "[Кк]")
    .replace(/л/gi, "[Лл]")
    .replace(/м/gi, "[Мм]")
    .replace(/н/gi, "[Нн]")
    .replace(/п/gi, "[Пп]")
    .replace(/р/gi, "[Рр]")
    .replace(/с/gi, "[Сс]")
    .replace(/т/gi, "[Тт]")
    .replace(/у/gi, "[Уу]")
    .replace(/ф/gi, "[Фф]")
    .replace(/х/gi, "[Хх]")
    .replace(/ц/gi, "[Цц]")
    .replace(/ч/gi, "[Чч]")
    .replace(/ш/gi, "[Шш]")
    .replace(/щ/gi, "[Щщ]")
    .replace(/ъ/gi, "[Ъъ]")
    .replace(/ы/gi, "[Ыы]")
    .replace(/ь/gi, "[Ьь]")
    .replace(/э/gi, "[Ээ]")
    .replace(/ю/gi, "[Юю]")
    .replace(/я/gi, "[Яя]")
    // german chars
    .replace(/ä/gi, "[äÄ]")
    //            .replace(/ö/gi, "[öÖ]")
    //            .replace(/ü/gi, "[üÜ]")
    .replace(/ß/gi, "[ßẞ]")
    // french chars
    .replace(/ù/gi, "[ùÙ]")
    .replace(/ÿ/gi, "[ÿŸ]")
    .replace(/à/gi, "[àÀ]")
    .replace(/ÿ/gi, "[ÿŸ]")
    //            .replace(/é/gi, "[éÉ]")
    .replace(/è/gi, "[èÈ]")
    .replace(/ê/gi, "[êÊ]")
    .replace(/ï/gi, "[ïÏ]")
    .replace(/ô/gi, "[ôÔ]")
    .replace(/œ/gi, "[œŒ]")
    // italian chars
    .replace(/à/gi, "[àÀ]")
    .replace(/è/gi, "[èÈ]")
    //            .replace(/é/gi, "[éÉ]")
    .replace(/ì/gi, "[ìÌ]")
    .replace(/ò/gi, "[òÒ]")
    //            .replace(/ó/gi, "[óÓ]")
    .replace(/ù/gi, "[ùÙ]");
}

function generateAlternatedArabicWord(word) {

  var harekeler = "[\u064B\u064C\u064D\u064E\u064F\u0650\u0651\u0652\u0653\u0654\u0655]"

  return word
    .replace(/ء/gui, "ء" + harekeler + "*")
    .replace(/[ااأإآ]/gui, "((ا" + harekeler + "*)|[ااأآإء]|(أ\u064F))") // duz elif
    .replace(/[ىي]/gui, "((ى" + harekeler + "*)|(ي" + harekeler + "*))")
    .replace(/ت/gui, "ت" + harekeler + "*")
    .replace(/ة/gui, "((ة" + harekeler + "*)|(ت" + harekeler + "*))")
    .replace(/ب/gui, "ب" + harekeler + "*")
    .replace(/ث/gui, "ث" + harekeler + "*")
    .replace(/ج/gui, "ج" + harekeler + "*")
    .replace(/ح/gui, "ح" + harekeler + "*")
    .replace(/خ/gui, "خ" + harekeler + "*")
    .replace(/د/gui, "د" + harekeler + "*")
    .replace(/ذ/gui, "ذ" + harekeler + "*")
    .replace(/ر/gui, "ر" + harekeler + "*")
    .replace(/ز/gui, "ز" + harekeler + "*")
    .replace(/س/gui, "س" + harekeler + "*")
    .replace(/ش/gui, "ش" + harekeler + "*")
    .replace(/ص/gui, "ص" + harekeler + "*")
    .replace(/ض/gui, "ض" + harekeler + "*")
    .replace(/ط/gui, "ط" + harekeler + "*")
    .replace(/ظ/gui, "ظ" + harekeler + "*")
    .replace(/ع/gui, "ع" + harekeler + "*")
    .replace(/غ/gui, "غ" + harekeler + "*")
    .replace(/ف/gui, "ف" + harekeler + "*")
    .replace(/ق/gui, "ق" + harekeler + "*")
    .replace(/ك/gui, "ك" + harekeler + "*")
    .replace(/ل/gui, "ل" + harekeler + "*")
    .replace(/م/gui, "م" + harekeler + "*")
    .replace(/ن/gui, "ن" + harekeler + "*")
    .replace(/ه/gui, "ه" + harekeler + "*")
    .replace(/و/gui, "و" + harekeler + "*");

  // .replace(/ي/gui, "((ى"+harekeler+"?)|(ي"+harekeler+"?))")
  // .replace(/آ/gui, "((ا"+harekeler+"?)|[ااأإء])")   // uzatmali elif
  // .replace(/أ/gui, "((ا"+harekeler+"?)|[ااأإء])")     // ustu hemzeli elif
  // .replace(/إ/gui, "((ا"+harekeler+"?)|[ااأإء])")     // alti hemzeli elif
  // .replace(/ا/gui, "((ا"+harekeler+"?)|[ااأإء])")

}


$(window).on("load", function() {


  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  $(window).data('debugMode', false);
  $.data(window, 'initPageFinished', false);

  //  FOR BROWSER TESTING
  //    $(window).data('debugMode', true);
  //    $.data(window, 'initPageFinished', true);


  //    send the anchor id of the last prg of section to android client
  if (!$(window).data('debugMode')) {
    // window.androidInterface.receiveLastPrgOfSection($("tr.row-Paragraph").not(".IgnorePrg").last().attr("name"));

    //send all id's of all prg's which is right after a fihrist item
    var fihristPrgMapping = $("a[name^='fihrist']").map(function() {
      return $(this).attr("name") + ":::" + $(this).closest("tr").nextAll("tr.row-Paragraph:first").attr("name");
    });
    // window.androidInterface.receiveFihristPrgMapping(fihristPrgMapping);

  }




  //DETECT SCROLL STOPPING
  $(window).scroll(function() {
    clearTimeout($.data(this, 'scrollTimer'));
    $.data(this, 'scrollTimer', setTimeout(function() {
      if ($.data(window, 'initPageFinished')) {
        // disable scrolling callbacks on first load
        onScrollListener();
      } else {
        console.log("JSINT initPage CANNOT INVOKE ONSCROLLLISTENER");
        //                onScrollListener();
      }
    }, 100));
  });

  // catch the "TAP" event
  $('p.Paragraf-2, p.Paragraf-1').not(".IgnorePrg")
    .on('click', function() {
      $(this).data('moved', '0');
      if ($(this).data('moved') == 0) {

        //                $('body').animate({ scrollTop: $(this).offset().top - 50}, 500,
        //                    function() { });
        //                scrollTo($(this).closest("tr"), 500);

        changeActiveParagraph($(this).closest("tr.row-Paragraph"));


      }
    });

  // for lugat popup
  $(".Paragraf-1, .Paragraf-2, .Alt-Başlık").on("contextmenu", onContextMenuListener);


});