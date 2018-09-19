// Smooth Scroll
$('a.smooth-scroll[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000);
      return false;
    }
  }
});

// Back-to-top
if ($('#back-to-top').length) {
    var scrollTrigger = 100, // px
        backToTop = function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
                $('#back-to-top').addClass('show');
            } else {
                $('#back-to-top').removeClass('show');
            }
        };
    backToTop();
    $(window).on('scroll', function () {
        backToTop();
    });
    $('#back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 1000);
    });
}

// Masquage du back-to-top à l'ouverture d'une fenêtre modale
$(document).ready(function (){
    $(".modal").on('show.bs.modal', function(){
        $('#back-to-top').removeClass('show');    
    });

    $(".modal").on('hide.bs.modal', function(){
        $('#back-to-top').addClass('show');    
    });
});

// Fermeture du menu hamburger au click 
$(document).ready(function () {
  $(".navbar-nav li a").click(function(event) {
    $(".navbar-collapse").collapse('hide');
  });
});

// Load more
$(function () {
    $(".card-columns .card").hide();
    $(".card-columns .card").slice(0, 6).show();
    $("#loadMore").click(function(e){
        e.preventDefault();
        $(".card-columns .card:hidden").slice(0, 3).show();
        if($(".card-columns .card:hidden").length == 0){
            $("#loadMore").hide();
        }        
    });
});

// Initialisation de Google Map
var map;
function initMap() {
	// Mise en place de la carte
	var parcMonceau = {lat: 48.880336, lng: 2.308565};
	map = new google.maps.Map(document.getElementById('map'), {
        center: parcMonceau,
        zoom: 15,
        styles: [
	    {
	        "featureType": "landscape",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "saturation": "-100"
	            }
	        ]
	    },
	    {
	        "featureType": "poi",
	        "elementType": "labels",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "poi",
	        "elementType": "labels.text.stroke",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "road",
	        "elementType": "labels.text",
	        "stylers": [
	            {
	                "color": "#545454"
	            }
	        ]
	    },
	    {
	        "featureType": "road",
	        "elementType": "labels.text.stroke",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway",
	        "elementType": "geometry.fill",
	        "stylers": [
	            {
	                "saturation": "-87"
	            },
	            {
	                "lightness": "-40"
	            },
	            {
	                "color": "#ffffff"
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway",
	        "elementType": "geometry.stroke",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway.controlled_access",
	        "elementType": "geometry.fill",
	        "stylers": [
	            {
	                "color": "#f0f0f0"
	            },
	            {
	                "saturation": "-22"
	            },
	            {
	                "lightness": "-16"
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway.controlled_access",
	        "elementType": "geometry.stroke",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway.controlled_access",
	        "elementType": "labels.icon",
	        "stylers": [
	            {
	                "visibility": "on"
	            }
	        ]
	    },
	    {
	        "featureType": "road.arterial",
	        "elementType": "geometry.stroke",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "road.local",
	        "elementType": "geometry.stroke",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "water",
	        "elementType": "geometry.fill",
	        "stylers": [
	            {
	                "saturation": "-52"
	            },
	            {
	                "hue": "#00e4ff"
	            },
	            {
	                "lightness": "-16"
	            }
	        ]
	    }
	]

    });

	// Définition du contenu de l'info-bulle
    var contentString = '<div id="infoMap">'+
            '<div>'+
            '</div>'+
            '<h5 id="infoMap-titre">Parc Monceau</h5>'+
            '<div id="infoMap-contenu">'+
            '<p>35 Boulevard de Courcelles</br>75008 Paris<p>' +
            '</div>'+
            '</div>';

    // Mise en place de l'info-bulle 
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    // Mise en place du marker
    var marker = new google.maps.Marker({
          position: parcMonceau,
          map: map,
          title: 'Parc Monceau',
    });

    marker.addListener('click', function() {
          infowindow.open(map, marker);
    });

}

// Arrêt des vidéos quand on quitte fenêtre modale
$(document).ready(function(){
    // Stockage de l'url contenu dans la propriété src de l'iframe dans une variable
    var url = $("#trailer-film1").attr('src');
    
    // A la fermeture de la fenêtre modale, on assigne une valeur nulle à l'url
    $(".modal").on('hide.bs.modal', function(){
        $("#trailer-film1").attr('src', '');
    });
    
    // On réassigne à la vidéo l'url stocké dans la variable
    $(".modal").on('show.bs.modal', function(){
        $("#trailer-film1").attr('src', url);
    });
});

$(document).ready(function(){
    // Stockage de l'url contenu dans la propriété src de l'iframe dans une variable
    var url = $("#trailer-film2").attr('src');
    
    // A la fermeture de la fenêtre modale, on assigne une valeur nulle à l'url
    $(".modal").on('hide.bs.modal', function(){
        $("#trailer-film2").attr('src', '');
    });
    
    // On réassigne à la vidéo l'url stocké dans la variable
    $(".modal").on('show.bs.modal', function(){
        $("#trailer-film2").attr('src', url);
    });
});

$(document).ready(function(){
    // Stockage de l'url contenu dans la propriété src de l'iframe dans une variable
    var url = $("#trailer-film3").attr('src');
    
    // A la fermeture de la fenêtre modale, on assigne une valeur nulle à l'url
    $(".modal").on('hide.bs.modal', function(){
        $("#trailer-film3").attr('src', '');
    });
    
    // On réassigne à la vidéo l'url stocké dans la variable
    $(".modal").on('show.bs.modal', function(){
        $("#trailer-film3").attr('src', url);
    });
});

$(document).ready(function(){
    // Stockage de l'url contenu dans la propriété src de l'iframe dans une variable
    var url = $("#trailer-film4").attr('src');
    
    // A la fermeture de la fenêtre modale, on assigne une valeur nulle à l'url
    $(".modal").on('hide.bs.modal', function(){
        $("#trailer-film4").attr('src', '');
    });
    
    // On réassigne à la vidéo l'url stocké dans la variable
    $(".modal").on('show.bs.modal', function(){
        $("#trailer-film4").attr('src', url);
    });
});

$(document).ready(function(){
    // Stockage de l'url contenu dans la propriété src de l'iframe dans une variable
    var url = $("#trailer-film5").attr('src');
    
    // A la fermeture de la fenêtre modale, on assigne une valeur nulle à l'url
    $(".modal").on('hide.bs.modal', function(){
        $("#trailer-film5").attr('src', '');
    });
    
    // On réassigne à la vidéo l'url stocké dans la variable
    $(".modal").on('show.bs.modal', function(){
        $("#trailer-film5").attr('src', url);
    });
});

$(document).ready(function(){
    // Stockage de l'url contenu dans la propriété src de l'iframe dans une variable
    var url = $("#trailer-film6").attr('src');
    
    // A la fermeture de la fenêtre modale, on assigne une valeur nulle à l'url
    $(".modal").on('hide.bs.modal', function(){
        $("#trailer-film6").attr('src', '');
    });
    
    // On réassigne à la vidéo l'url stocké dans la variable
    $(".modal").on('show.bs.modal', function(){
        $("#trailer-film6").attr('src', url);
    });
});

$(document).ready(function(){
    // Stockage de l'url contenu dans la propriété src de l'iframe dans une variable
    var url = $("#trailer-film7").attr('src');
    
    // A la fermeture de la fenêtre modale, on assigne une valeur nulle à l'url
    $(".modal").on('hide.bs.modal', function(){
        $("#trailer-film7").attr('src', '');
    });
    
    // On réassigne à la vidéo l'url stocké dans la variable
    $(".modal").on('show.bs.modal', function(){
        $("#trailer-film7").attr('src', url);
    });
});

$(document).ready(function(){
    // Stockage de l'url contenu dans la propriété src de l'iframe dans une variable
    var url = $("#trailer-film8").attr('src');
    
    // A la fermeture de la fenêtre modale, on assigne une valeur nulle à l'url
    $(".modal").on('hide.bs.modal', function(){
        $("#trailer-film8").attr('src', '');
    });
    
    // On réassigne à la vidéo l'url stocké dans la variable
    $(".modal").on('show.bs.modal', function(){
        $("#trailer-film8").attr('src', url);
    });
});

$(document).ready(function(){
    // Stockage de l'url contenu dans la propriété src de l'iframe dans une variable
    var url = $("#trailer-film9").attr('src');
    
    // A la fermeture de la fenêtre modale, on assigne une valeur nulle à l'url
    $(".modal").on('hide.bs.modal', function(){
        $("#trailer-film9").attr('src', '');
    });
    
    // On réassigne à la vidéo l'url stocké dans la variable
    $(".modal").on('show.bs.modal', function(){
        $("#trailer-film9").attr('src', url);
    });
});

$(document).ready(function(){
    // Stockage de l'url contenu dans la propriété src de l'iframe dans une variable
    var url = $("#trailer-film10").attr('src');
    
    // A la fermeture de la fenêtre modale, on assigne une valeur nulle à l'url
    $(".modal").on('hide.bs.modal', function(){
        $("#trailer-film10").attr('src', '');
    });
    
    // On réassigne à la vidéo l'url stocké dans la variable
    $(".modal").on('show.bs.modal', function(){
        $("#trailer-film10").attr('src', url);
    });
});

$(document).ready(function(){
    // Stockage de l'url contenu dans la propriété src de l'iframe dans une variable
    var url = $("#trailer-film11").attr('src');
    
    // A la fermeture de la fenêtre modale, on assigne une valeur nulle à l'url
    $(".modal").on('hide.bs.modal', function(){
        $("#trailer-film11").attr('src', '');
    });
    
    // On réassigne à la vidéo l'url stocké dans la variable
    $(".modal").on('show.bs.modal', function(){
        $("#trailer-film11").attr('src', url);
    });
});

$(document).ready(function(){
    // Stockage de l'url contenu dans la propriété src de l'iframe dans une variable
    var url = $("#trailer-film12").attr('src');
    
    // A la fermeture de la fenêtre modale, on assigne une valeur nulle à l'url
    $(".modal").on('hide.bs.modal', function(){
        $("#trailer-film12").attr('src', '');
    });
    
    // On réassigne à la vidéo l'url stocké dans la variable
    $(".modal").on('show.bs.modal', function(){
        $("#trailer-film12").attr('src', url);
    });
});


