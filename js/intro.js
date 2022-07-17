const CLASS_HIDDEN = 'hidden';
const CLASS_WRAPDASH = 'wrapperDash';
const KEY_USERNAME = 'username';
const images = [
  "src/images/0.jpg",
  "src/images/1.jpg",
  "src/images/2.jpg"
];

const wrapper = document.querySelector('.wrapper');
const intro = document.querySelector('.intro');
const loginForm = document.querySelector('#loginForm');
const loginInput = document.querySelector('#loginForm input');
const savedUsername = localStorage.getItem(KEY_USERNAME);
const dashboard = document.querySelector('.dashboard');
const userHeader = document.querySelector('h1 .username');

const setIntro = {
  background: function() {
    const randomBg = images[Math.floor(Math.random() * images.length)];
    wrapper.style.backgroundImage = `url(${randomBg})`;
  },
  username: function(e) {
    e.preventDefault();
    const username = loginInput.value;
    localStorage.setItem(KEY_USERNAME, username);

    setIntro.dashboard();
    setIntro.header(username);
  },
  dashboard: function() {
    wrapper.classList.add(CLASS_WRAPDASH);
    intro.classList.add(CLASS_HIDDEN);
    dashboard.classList.remove(CLASS_HIDDEN);
  },
  header: function(username) {
    userHeader.innerHTML = username;
  }
}

if (savedUsername === null) {
  loginForm.addEventListener('submit', setIntro.username);
} else {
  setIntro.dashboard();
  setIntro.header(savedUsername);
}

setIntro.background();
