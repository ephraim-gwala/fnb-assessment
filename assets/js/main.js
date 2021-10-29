var filepath = 'assets/json/playlists.json';
var navigation = $('#navigation');
var playlists = [];
var currentPlaylist;

$(document).ready(function () {

    $.getJSON(filepath, (data) => {

        $.each(data, function(key, item) {
            var navItem = key.toLowerCase();
            var nav = '<a class="p-2 text-dark" href="#'+navItem+'">'+key+'</a>';
            navigation.append(nav);

            playlists[navItem] = item;
        });

        var hash = location.hash;

        // Get first item of Array
        if(hash == '') {
            var navName = Object.keys(playlists)[0];
        } else {
            var navName = (hash.replace(/^#/, ""));
        }
        currentPlaylist = navName;
        $('#playlistTitle').html(navName);
        getPlaylist(navName);
    });

    $("#navigation a").on("click", function(){
        alert("The paragraph was clicked.");
    });

    $(window).on('hashchange', function(e){
        var hash = location.hash;
        var navName = ( hash.replace( /^#/, "" ));
        currentPlaylist = navName;
        $('#playlistTitle').html(navName);
        $('#listSongs').empty();
        getPlaylist(navName);
    });

    $('#sortPlaylist').change(function(){
        var sort = $(this).val();
        if(sort == 'title' ) {
            sortByTitle()
        } else if(sort == 'artist') {
            sortByArtist();
        }
    })
});

// Function: return html of list of songs
function getPlaylist(navName) {
    var playList = playlists[navName];
    $.each(playList, function(key, item) {
        var song = '<div class="card mb-3" >\n' +
            '<div class="card-body">\n' +
            '<div class="row">\n' +
            '<div class="col col-auto">\n' +
            '<img src="https://via.placeholder.com/150" alt="" class="img-fluid">\n' +
            '</div>\n' +
            '<div class="col">\n' +
            '<h3>Title: '+ item.title +'</h3>\n' +
            '<h4>Artist: '+ item.artist +'</h4>\n' +
            '<i onclick="rateSong(this)" class="fa fa-thumbs-up"></i>\n' +
            '</div>\n' +
            '<div class="col col-auto">\n' +
            '<i onclick="removeSong(\''+navName+'\','+key+')" class="fa fa-times-circle"></i>\n' +
            '</div>\n' +
            '</div>\n' +
            '</div>\n' +
            '</div>';
        $('#listSongs').append(song);
    });
}

function rateSong(x) {
    x.classList.toggle("fa-thumbs-down");
}

function removeSong(navName, i) {
    var tmp = playlists[navName].splice(i, 1);

    $('#listSongs').empty();
    getPlaylist(navName);
}

function sortByArtist() {
    playlists[currentPlaylist].sort(function(a, b) {
        var nameA = a.artist.toUpperCase(); // ignore upper and lowercase
        var nameB = b.artist.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    });

    $('#listSongs').empty();
    getPlaylist(currentPlaylist);
}

function sortByTitle() {
    playlists[currentPlaylist].sort(function(a, b) {
        var nameA = a.title.toUpperCase(); // ignore upper and lowercase
        var nameB = b.title.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    });

    $('#listSongs').empty();
    getPlaylist(currentPlaylist);
}
