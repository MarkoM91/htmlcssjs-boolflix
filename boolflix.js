function addTitle(title, originalTitle, id, language,  vote, poster, plot) {

  var tempDate = {

    title:"Title: " +  title,
    original_title:"Original Title: " +  originalTitle,
    id: id,
    original_language: language,
    flag:"Language: " + " " +  getFlagImg(language),
    vote_average: vote,
    stars:"Vote: " + " " + getStars(vote),              //  aggiungere stars in tempDate altrimenti ritorna  undefined;
    img: poster,
    plot: "Plot: " + " " + plot
  }

  var template = $("#box-template").html();
  var compiled = Handlebars.compile(template);
  var li = compiled(tempDate);

  var ulFilms = $(".films");
  ulFilms.append(li);
}

function addCast(cast, filmId) {

  var container_film = $(".film-container[data-id='"+filmId+"']");
  var container_cast = container_film.find(".cast-members");

  container_cast.append("<div>"+cast.name+ ",","</div>");
}

function getStars(vote) {

  var newVote = Math.floor(vote)/2;

  var stars = "";

  for (var i = 1; i <= 5; i++) { // devo mettere maggiore o uguale  altrimenti mi mangia una stella.

     if (newVote >= i) { //

        stars += "<i class='fas fa-star'></i>"; //  concateno ad ogni giro
     } else {

        stars += "<i class='far fa-star'></i>";
     }
  }
  return stars;
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
      var plot = res.overview;
      addTitle(title, originalTitle, filmId, language,  vote, poster, plot);
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
      var plotTv = resTv.overview;
      addTitle(titleTv, originalTitleTv, tvId, languageTv,  voteTv, posterTv, plotTv);
  }
}

function ajaxMovieCastParser(castMovie) {

    for (var i = 0; i < castMovie.cast.length; i++) {

        if ( i < 5 ) {

          var cast= castMovie.cast[i];
          addCast(cast, castMovie.id);
        }
    }
}

function ajaxTvCastParser(castTv) {

    for (var i = 0; i < castTv.cast.length; i++) {

        if ( i < 5 ) {

          var castTv= castTv.cast[i];
          addCast(castTv, castTv.id);
        }
    }
}

function searchMovie(me) {

  var content = me.val().toLowerCase();

  var div = $("div.film-container");
  div.remove();

  ajaxMovie(content);
}

function searchTv(me) {

  var contentSeries = me.val().toLowerCase();

  var div = $("div.film-container");
  div.remove();

  ajaxTvSeries(contentSeries);
}

function searchMovieCast(me) {

  var cast_members = $(".cast-members div");
  cast_members.remove();

  var film_id = me.parent(".film-container").attr("data-id");

    if(!film_id) {

        return;
    }

    ajaxMovieCast(film_id)
}

function searchTvCast(me) {

  var cast_members = $(".cast-members div");
  cast_members.remove();

  var tv_id = me.parent(".film-container").attr("data-id");

  if(!tv_id) {

      return;
  }

  ajaxTvCast(tv_id)
}

function ajaxMovie(content) {

  var outData = {
    api_key:"8b0cf308301e17a98d830746296be82f",
    language:"en-EN",
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

function ajaxTvSeries(contentSeries) {

    var outDataSeries = {
    api_key:"e99307154c6dfb0b4750f6603256716d",
    language:"en-EN",
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

function ajaxMovieCast(film_id) {

    var outDataMovieCast = {

    api_key:"8b0cf308301e17a98d830746296be82f"
    }

  $.ajax({
    url:"https://api.themoviedb.org/3/movie/" + film_id + "/credits",
    data: outDataMovieCast,
    method:"GET",
    success: ajaxMovieCastParser,

    error: function(request, state, error) {

      console.log("request", request);
      console.log("state", state);
      console.log("error", error);
    }

  });
}

function ajaxTvCast(id) {

    var outDataTvCast = {

    api_key:"e99307154c6dfb0b4750f6603256716d"
    }

  $.ajax({
    url:"https://api.themoviedb.org/3/movie/" + id +"/credits",
    data: outDataTvCast,
    method:"GET",
    success: ajaxTvCastParser,

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

    searchMovieCast(me);

    searchTvCast(me);
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

        searchMovie(me);
        searchTv(me)
    }

  });

var img = $(".img");
  $(document).on("mouseenter" , ".img", function() {

        hiddedBox();
        var me = $(this);
        showInfo(me);
  });

var info = $(".info");
  $(document).on("mouseleave" , ".img", function() {

        var me = $(this);
        hideInfo(me);
  });
}

$(document).ready(init);
