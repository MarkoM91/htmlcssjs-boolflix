function addTitle(title, originalTitle, id, language,  vote, poster) {

  var tempDate = {

    title: title,
    original_title: originalTitle,
    id: id,
    cast:,
    original_language: language,
    flag: getFlagImg(language),
    vote_average: Math.floor(vote)/2,
    stars: "",              //  aggiungere stars in tempDate altrimenti ritorna  undefined;
    img: poster
  }

  for (var i = 1; i <= 5; i++) { // devo mettere maggiore o uguale  altrimenti mi mangia una stella.

     if (tempDate.vote_average >= i) { //

        tempDate.stars += "<i class='fas fa-star'></i>"; //  concateno ad ogni giro
     } else {

        tempDate.stars += "<i class='far fa-star'></i>";
     }
  }

  var template = $("#box-template").html();
  var compiled = Handlebars.compile(template);
  var li = compiled(tempDate);

  var ulFilms = $(".films");
  ulFilms.append(li);
}

function getFlagImg(flag) {

  var flagImg;
  switch(flag) {

    case "en":
      flagImg = '<img src="us.svg" width="38px" height="38px">';
    break;
    case "it":
      flagImg = '<img src="it.svg" width="38px" height="38px">';
    break;

    default:
      flagImg = '<img src="" width="38px">';
  }
  return flagImg;
}

function ajaxMovieResultParser(data) {

    var ress = data.results
    for (var i = 0; i < ress.length; i++) {
      var res = ress[i];
      var title = res.title;
      var originalTitle = res.original_title;
      var filmId = res.id;
      var language = res.original_language;
      var vote = res.vote_average;
      var poster= 'https://image.tmdb.org/t/p/w342' + res.poster_path;
      addTitle(title, originalTitle, filmId, language,  vote, poster);
  }

}

function ajaxTvSeriesResultParser(data) {

    var ressTv = data.results
    for (var i = 0; i < ressTv.length; i++) {
      var resTv = ressTv[i];
      var titleTv = resTv.name;
      var originalTitleTv = resTv.original_name;
      var tvId = resTv.id;
      var languageTv = resTv.original_language;
      var voteTv = resTv.vote_average;
      var posterTv = 'https://image.tmdb.org/t/p/w342' + resTv.poster_path;
      addTitle(titleTv, originalTitleTv, tvId, languageTv,  voteTv, posterTv);
  }
}



function ajaxMovie(me) {

  var content = me.val().toLowerCase();

  var div = $("div.film-container");
  div.remove();


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

  var div = $("div.film-container");
  div.remove();
  me.val("");

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
    },
    error: function(request, state, error) {

      console.log("request", request);
      console.log("state", state);
      console.log("error", error);
    }

  });
}

function ajaxCast(id) {

    var outDataCast = {

    api_key:"e99307154c6dfb0b4750f6603256716d"
    }

  $.ajax({
    url:"https://api.themoviedb.org/3/search/tv",
    data: outDataCast,
    method:"GET",
    success: function(data) {

        ajaxTvSeriesResultParser(data);
    },
    error: function(request, state, error) {

      console.log("request", request);
      console.log("state", state);
      console.log("error", error);
    }

  });
}

function hiddedBox() {

  var info= $(".info");
  info.hide();

  var img = $(".img");
  img.show();
}

function showInfo(me){


    me.hide();

    me.siblings(".info").show();
}

function hideInfo(me){

    me.hide();

    var img = $(".img");
    img.show();
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

var img = $(".img");
  $(document).on("click" , ".img", function() {

        hiddedBox();
        var me = $(this);
        showInfo(me);
  });

var info = $(".info");
  $(document).on("click" , ".info", function() {

        var me = $(this);
        hideInfo(me);
  });
}

$(document).ready(init);
