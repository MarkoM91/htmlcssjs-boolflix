function addTitle(title, originalTitle, language, vote) {

  var tempDate = {

    title: title,
    original_title: originalTitle,
    original_language: language,
    vote_average: vote
  }

  var template = $("#box-template").html();
  var compiled = Handlebars.compile(template);
  var li = compiled(tempDate);

  var ulFilms = $(".films");
  ulFilms.append(li);
}

function ajaxResultParser(data) {

    var ress = data.results
    for (var i = 0; i < ress.length; i++) {
      var res = ress[i];
      var title = res.title;
      var originalTitle = res.original_title;
      var language = res.original_language;
      var vote = res.vote_average;
      addTitle(title, originalTitle, language, vote);
  }
}


function ajaxTest() {

  var me = $(this);
  var content = me.val().toLowerCase();

  var li = $("li");
  li.remove();

console.log(content);
  var outData = {
    api_key:"8b0cf308301e17a98d830746296be82f",
    language:"it-IT",
    query: content
  }
  $.ajax({

    url:"https://api.themoviedb.org/3/search/movie",
    data: outData,
    method:"GET",
    success: function(data) {
console.log(data);
        ajaxResultParser(data);


    },
    error: function(request, state, error) {

      console.log("request", request);
      console.log("state", state);
      console.log("error", error);
    }

  });
}


function init() {


var inputTxt = $("input#txt");
inputTxt.keyup(ajaxTest)
}



$(document).ready(init);
