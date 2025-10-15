// index.js

const handleClick = (ramen) => {
  const detailImage = document.querySelector('.detail-image');
  const name = document.querySelector('.name');
  const restaurant = document.querySelector('.restaurant');
  const rating = document.querySelector('#rating-display');
  const comment = document.querySelector('#comment-display');

  detailImage.src = ramen.image;
  detailImage.alt = ramen.name;
  name.textContent = ramen.name;
  restaurant.textContent = ramen.restaurant;
  rating.textContent = ramen.rating;
  comment.textContent = ramen.comment;
};

const handleSubmit = (e) => {
  e.preventDefault();

  const newRamen = {
    name: e.target.name.value,
    restaurant: e.target.restaurant.value,
    image: e.target.image.value,
    rating: e.target.rating.value,
    comment: e.target.comment.value,
  };

  const menu = document.getElementById('ramen-menu');
  const img = document.createElement('img');
  img.src = newRamen.image;
  img.alt = newRamen.name;
  img.addEventListener('click', () => handleClick(newRamen));
  menu.appendChild(img);

  e.target.reset();
};

const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');
  if (!form) return;
  form.addEventListener('submit', handleSubmit);
};

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(ramens => {
      const menu = document.getElementById('ramen-menu');
      ramens.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener('click', () => handleClick(ramen));
        menu.appendChild(img);
      });
      if (ramens.length > 0) handleClick(ramens[0]);
    });
};

const main = () => {
  displayRamens();
  addSubmitListener();
};

document.addEventListener('DOMContentLoaded', main);

module.exports = {
  displayRamens,
  addSubmitListener,
  handleClick,
  handleSubmit, // 👈 Added export
  main,
};
