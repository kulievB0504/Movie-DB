import { movies } from "./db.js"

let ul = document.querySelector('.promo__interactive-list')
let promoBg = document.querySelector('.promo__bg')
let promoGenre = document.querySelector(".promo__genre")
let promoTitle = document.querySelector(".promo__title")
let promoDescr = document.querySelector(".promo__descr")
let imd = document.querySelector(".imd")
let reserch = document.querySelector(".reserch")
let ulGenres = document.querySelector('.genresUl')

let searchInput = document.querySelector('.header__search input')

searchInput.addEventListener('input', function () {
    let searchQuery = this.value.trim().toLowerCase()
    let filteredMovies = movies.filter(movie => movie.Title.toLowerCase().includes(searchQuery))
    reload(filteredMovies, ul)
})

let genres = ['All', ...new Set(movies.map(item => item.Genre))]

reload(movies, ul)

function reload(arr, place) {
    place.innerHTML = ''

    for (let item of arr) {
        let li = document.createElement('li')
        let div = document.createElement('div')
        li.innerHTML = item.Title
        li.classList.add('promo__interactive-item')
        div.classList.add('delete')

        place.append(li)
        li.append(div)

        li.onclick = () => {
            setMovies(item)
        };
    }
}

function setMovies(item) {
    promoBg.style.backgroundImage = `url(${item.Poster})`
    promoGenre.innerHTML = item.Genre
    promoTitle.innerHTML = item.Title
    promoDescr.innerHTML = item.Plot
    imd.innerHTML = `IMDb: ${item.imdbRating}`
    reserch.innerHTML = `Кинопоиск: ${item.Metascore}`
}

generateGenres(genres)

function generateGenres(array) {
    ulGenres.innerHTML = ""

    for (let item of array) {
        let li = document.createElement('li')
        let a = document.createElement('a')

        if (array.indexOf(item) === 0) {
            a.classList.add('promo__menu-item_active')
        }

        a.classList.add('promo__menu-item')
        a.href = "#"
        a.innerHTML = item

        li.append(a)
        ulGenres.append(li)

        li.onclick = () => {
            ulGenres.childNodes.forEach(e => e.firstChild.classList.remove('promo__menu-item_active'))

            li.firstChild.classList.add('promo__menu-item_active')

            let filtered = movies.filter(e => {
                let genre = e.Genre.toLowerCase()
                if (item.toLowerCase() === genre) {
                    return e;
                } else if (item.toLowerCase() === 'all') {
                    reload(movies, ul);
                }
            });

            if (filtered.length > 0) {
                reload(filtered, ul)
            }
        };
    }
}
