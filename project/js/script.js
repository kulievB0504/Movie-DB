/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

// 1
const adv = document.querySelectorAll('.promo__adv img');
const genre = document.querySelector('.promo__genre');
const bg = document.querySelector('.promo__bg');
adv.forEach((rev) => {
    rev.remove();
});

genre.innerHTML = "Драма";

bg.style.backgroundImage = "url('img/bg.jpg')";

const lis = document.querySelectorAll('.promo__interactive-list li');

movieDB.movies.sort();

lis.forEach((el, idx) => {
    el.innerHTML = (idx + 1) + ". " + movieDB.movies[idx];
    const DelBtn = '<div class="delete"></div>';
    el.innerHTML += DelBtn;
    el.onclick = (e) =>{
        if (e.target.classList.contains('delete')) {
            e.currentTarget.remove();
        }
    };
});