var submit = document.getElementById("submit");
var title = document.getElementById("title");
var labelTitle = document.getElementById("labeltitle");
var year = document.getElementById("year");
var labelYear = document.getElementById("labelyear");
var result = document.getElementById("result");
var select = document.getElementById("select");
var listing = document.querySelector(".listing");
var serie = document.querySelector(".serie");
var series = document.getElementById("series");
var game = document.querySelector("#game");
var movie = document.querySelector("#movie");
var showSearchBtn = document.getElementById('show-search-btn');
var searchForm = document.getElementById('search-form');

function films(page) {
    
    if (page == undefined || page === null) {
        page = 1;
    }

    var xhr = new XMLHttpRequest();
    xhr.open(
        "GET","http://www.omdbapi.com/?s=" + title.value +"&y=" + year.value +"&type=" + select.value +"&apikey=ec6823f9" + "&page=" + page,true
    );
    console.log(title.value)

    if (title.value == "") {
        Swal.fire({
            title: 'Veuillez entrer un titre',
            text: 'Veuillez entrer un titre',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        return false;
    }

    if (year.value == "") {
        xhr.open("GET" ,"http://www.omdbapi.com/?s=" + title.value +"&type=" + select.value +"&apikey=ec6823f9" + "&page=" + page,true);
    }

    xhr.onload = function () {
        if (xhr.status == 200) {
            var data = JSON.parse(xhr.responseText);
            console.log(data);
            result.innerHTML = "";
            pagination.innerHTML = "";
            listing.innerHTML = "";
            serie.innerHTML = "";

            if (data.Response == "False") {
                affichageFilmsProposes(data);
                affichageSeriesProposes(data);
                Swal.fire({
                    title: 'Aucun résultat trouvé',
                    text: 'Essayez avec un autre titre',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
            var nbPages = Math.floor(data.totalResults / data.Search.length);

            if (nbPages > 10) {
                nbPages = 10;
            }

            affichage(data);
            creerPagination(nbPages);
        }
    };
    xhr.send();
}

function affichage(data) {
    for (var i = 0; i < data.Search.length - 1; i++) {
        var p = document.createElement("p");
        p.setAttribute("class", "card-text card-title");
        p.setAttribute("style", "height: 50px; overflow: hidden; font-family: 'Montserrat', sans-serif;");

        var small = document.createElement("small");
        small.setAttribute( "class", "d-flex justify-content-center card-text");
        var img = document.createElement("img");
        img.setAttribute("class", "card-img-top img-fluid");
        var col4 = document.createElement("div");
        col4.setAttribute("class", "col");
        var card4 = document.createElement("div");
        card4.setAttribute("class", "card mb-4 bg-dark text-white text-center");
        card4.setAttribute("style", "");
        var cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body text-center");
        cardBody.setAttribute("style", "background-color: #0f161e;");

        var title = document.createTextNode(data.Search[i].Title);
        var year = document.createTextNode(data.Search[i].Year);

        if (data.Search[i].Poster == "N/A") {
            img.setAttribute("src", "https://via.placeholder.com/354x400");
        } else {
            img.setAttribute("src", data.Search[i].Poster);
        }

        col4.appendChild(card4);
        card4.appendChild(img);
        card4.appendChild(cardBody);
        cardBody.appendChild(p);
        cardBody.appendChild(small);
        p.appendChild(title);

        small.appendChild(year);
        result.appendChild(col4);
    }
}

function affichageFilmsProposes() {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://www.omdbapi.com/?s=" + "harry potter" + "&apikey=ec6823f9" ,true);
    xhr.onload = function () {
        if (xhr.status == 200) {
            var data = JSON.parse(xhr.responseText);
            console.log(data);
            listing.innerHTML = "";
            var p = document.createElement("p");
            p.innerHTML = "Notre selection de films";
            listing.appendChild(p);
            for (var i = 0; i < data.Search.length -4; i++) {
                var p = document.createElement("p");
                p.setAttribute("class", "card-text d-flex justify-content-center card-title");
                p.setAttribute("style", "height: 50px; overflow:; font-family: 'Montserrat', sans-serif;");
                var small = document.createElement("small");
                small.setAttribute( "class", " d-flex justify-content-center card-text");
                var img = document.createElement("img");
                img.setAttribute("class", "card-img-top img-fluid ");
                var col4 = document.createElement("div");
                col4.setAttribute("class", "col-md-4 col-lg-2 col-sm-6 col-xs-12");
                var card4 = document.createElement("div");
                card4.setAttribute("class", "card mb-5 bg-dark");
                card4.setAttribute("style", "height: ;");
                var cardBody = document.createElement("div");
                cardBody.setAttribute("class", "card-body text-center");
                cardBody.setAttribute("style", "background-color: #0f161e;");

                listing.appendChild(col4);
                col4.appendChild(card4);
                card4.appendChild(img);
                card4.appendChild(cardBody);
                cardBody.appendChild(p);
                cardBody.appendChild(small);

                var title = document.createTextNode(data.Search[i].Title);
                var year = document.createTextNode(data.Search[i].Year);
                var poster = document.createTextNode(data.Search[i].Poster);
                var plot = document.createTextNode(data.Search[i].Plot);
                if (poster == "N/A") {
                    img.setAttribute("src", "https://via.placeholder.com/354x400");
                } else {
                    img.setAttribute("src", data.Search[i].Poster);
                }
                p.appendChild(title);
                small.appendChild(year);
        }}
    };
    xhr.send();
}

function affichageSeriesProposes() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://www.omdbapi.com/?s=" + "doctor who" + "&type=" + "series" + "&apikey=ec6823f9" ,true);
    xhr.onload = function () {
        if (xhr.status == 200) {
            var data = JSON.parse(xhr.responseText);
            console.log(data);
            var p = document.createElement("p");
            p.innerHTML = "Notre selection de séries";
            listing.appendChild(p);
            for (var i = 0; i < data.Search.length - 4; i++) {
                var p = document.createElement("p");
                p.setAttribute("class", "card-text d-flex justify-content-center card-title");
                p.setAttribute("style", "height: 50px; overflow: hidden; font-family: 'Montserrat', sans-serif;");
                var small = document.createElement("small");
                small.setAttribute( "class", "d-flex justify-content-center card-text text-center text-white");
                var img = document.createElement("img");
                img.setAttribute("class", "card-img-top img-fluid");
                var col4 = document.createElement("div");
                col4.setAttribute("class", "col-md-4 col-lg-2 col-sm-6 col-xs-12");
                var card4 = document.createElement("div");
                card4.setAttribute("class", "card mb-5 bg-dark");
                var cardBody = document.createElement("div");
                cardBody.setAttribute("class", "card-body text-center");
                cardBody.setAttribute("style", "background-color: #0f161e;");

                serie.appendChild(col4);
                col4.appendChild(card4);
                card4.appendChild(img);
                card4.appendChild(cardBody);
                cardBody.appendChild(p);
                cardBody.appendChild(small);

                var title = document.createTextNode(data.Search[i].Title);
                var year = document.createTextNode(data.Search[i].Year);

                if (data.Search[i].Poster == "N/A") {
                    img.setAttribute("src", "https://via.placeholder.com/354x400");
                } else {
                    img.setAttribute("src", data.Search[i].Poster);
                }


                p.appendChild(title);
                small.appendChild(year);
        }}
    };
    xhr.send();
}

function creerPagination(pages) {
    let pagination = document.querySelector("#pagination");
    let ulPage = document.createElement("ul");
    ulPage.setAttribute("class", "pagination");


    for (let i = 1; i <= pages; i++) {
        let liPage = document.createElement("li");
        liPage.setAttribute("class", "page-item");
        let aPage = document.createElement("a");
        aPage.setAttribute("class", "page-link bg-dark text-white");
        aPage.href = i;
        aPage.innerHTML = i;

        aPage.addEventListener("click", function (e) {
            e.preventDefault();
            films(this.getAttribute("href"));
            document.location = "#";
        });

        liPage.appendChild(aPage);
        ulPage.appendChild(liPage);
    }

    pagination.appendChild(ulPage);
}

showSearchBtn.addEventListener("click", function () {
    searchForm.classList.toggle("d-none");
    submit.classList.toggle("d-none");
});

submit.addEventListener("click", films);
submit.addEventListener("click", function () {
    searchForm.classList.toggle("d-none");
    submit.classList.toggle("d-none");
});

game.addEventListener("click", function () {
    labelTitle.innerHTML = "Titre du jeu :";
    labelYear.innerHTML = "Année de sortie du jeu :";
});
movie.addEventListener("click", function () {
    labelTitle.innerHTML = "Titre du film :";
    labelYear.innerHTML = "Année de sortie du film :";
});
series.addEventListener("click", function () {
    labelTitle.innerHTML = "Titre de la série :";
    labelYear.innerHTML = "Année de sortie de la série :";
});

document.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        submit.click();
    }
});



affichageFilmsProposes();
affichageSeriesProposes();



