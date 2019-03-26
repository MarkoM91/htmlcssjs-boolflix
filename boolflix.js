function addTitle(title, originalTitle, language, vote) {

  var tempDate = {

    title: title,
    original_title: originalTitle,
    original_language: language,
    vote_average: Math.floor(vote),
    stars: "<i class='fas fa-star'></i>"
  }

  var template = $("#box-template").html();
  var compiled = Handlebars.compile(template);
  var li = compiled(tempDate);

  var ulFilms = $(".films");
  ulFilms.append(li);
}

function ajaxMovieResultParser(data) {

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

function ajaxTvSeriesResultParser(data) {

    var ressTv = data.results
    for (var i = 0; i < ressTv.length; i++) {
      var resTv = ressTv[i];
      var titleTv = resTv.name;
      var originalTitleTv = resTv.original_name;
      var languageTv = resTv.original_language;
      var voteTv = resTv.vote_average;
      addTitle(titleTv, originalTitleTv, languageTv, voteTv);
  }
}


function ajaxMovie(me) {

  var content = me.val().toLowerCase();

  var li = $("li");
  li.remove();

  var outData = {
    api_key:"8b0cf308301e17a98d830746296be82f",
    language:"it-IT",
    query: content
  }

  console.log(outData.query);
  $.ajax({

    url:"https://api.themoviedb.org/3/search/movie",
    data: outData,
    method:"GET",
    success: function(data) {

        ajaxMovieResultParser(data);
    },
    error: function(request, state, error) {

      console.log("request", request);
      console.log("state", state);
      console.log("error", error);
    }

  });
}



function ajaxTvSeries(me) {

  var contentSeries = me.val().toLowerCase();

  var li = $("li");
  li.remove();

  var outDataSeries = {
    api_key:"e99307154c6dfb0b4750f6603256716d",
    language:"it-IT",
    query: contentSeries
  }

  $.ajax({
    url:"https://api.themoviedb.org/3/search/tv",
    data: outDataSeries,
    method:"GET",
    success: function(data) {

        ajaxTvSeriesResultParser(data);
    console.log(data);
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
  inputTxt.keyup(function() {

    var me = $(this);
    if (event.which == 13) {

      ajaxMovie(me);
      ajaxTvSeries(me)
    }

  });
}



$(document).ready(init);
