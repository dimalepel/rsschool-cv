window.addEventListener('load', async function () {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/sw.js');
      console.log('SW register success');
    } catch (e) {
      console.log('SW register fail');
    }
  }
});


// Checking for active js
const body = document.querySelector('body');
body.classList.remove('page--no-js');

// Working with the mobile menu
const menuTrigger = document.querySelector('.js--navigation-switch');
const navigationLayer = document.querySelector('.js--navigation');

menuTrigger.addEventListener('click', function (evt) {
  evt.preventDefault();
  
  this.classList.toggle('active');
  
  if (navigationLayer.classList.contains('open')) {
    navigationLayer.classList.remove('open');
    navigationLayer.style.maxHeight = 0;
  } else {
    navigationLayer.classList.add('open');
    navigationLayer.style.maxHeight = navigationLayer.scrollHeight + 'px';
  }
});

// Opening the project details
const breakpointDesktop = 1024;
const currentWindowSize = window.innerWidth;

if (currentWindowSize < breakpointDesktop) {
  const projectOpen = document.querySelectorAll('.js--prject-toggle');
  const closeProjectDetail = document.querySelectorAll('.js--close-project-detail');
  
  projectOpen.forEach(function (item) {
    item.addEventListener('click', function (evt) {
      evt.preventDefault();
      
      this.nextElementSibling.classList.add('open');
    });
  });
  
  closeProjectDetail.forEach(function (item) {
    item.addEventListener('click', function (evt) {
      evt.preventDefault();
      
      this.parentElement.classList.remove('open');
    });
  });
}

// Showing the active link when scrolling
const sections = document.querySelectorAll('section[id]');
let heightHeader = 63;

function scrollActive() {
  const scrollY = window.pageYOffset;
  
  sections.forEach(function (current) {
    const sectionHeight = current.offsetHeight;
    if (currentWindowSize >= breakpointDesktop) {
      heightHeader = 90;
    }
    const sectionTop = current.offsetTop - heightHeader - 2;
    const sectionId = current.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector('.main-navigation__link[href*=' + sectionId + ']').classList.add('active');
    } else {
      document.querySelector('.main-navigation__link[href*=' + sectionId + ']').classList.remove('active');
    }
  });
}

window.addEventListener('scroll', scrollActive);

// Smooth scroll to the anchor
const navigationLinks = document.querySelectorAll('.main-navigation__link');

navigationLinks.forEach(function (link) {
  link.addEventListener('click', function(evt) {
    evt.preventDefault();
    
    let href = this.getAttribute('href').substring(1);
    const scrollTarget = document.getElementById(href);
    const topOffset = heightHeader;
    if (currentWindowSize >= breakpointDesktop) {
      heightHeader = 90;
    }
    const elementPosition = scrollTarget.getBoundingClientRect().top;
    const offsetPosition = elementPosition - topOffset;
    
    window.scrollBy({
      top: offsetPosition,
      behavior: 'smooth'
    });
  
    if (currentWindowSize < breakpointDesktop) {
      navigationLayer.classList.remove('open');
      navigationLayer.style.maxHeight = 0;
      menuTrigger.classList.remove('active');
    }
  });
});

// Highlight code
hljs.highlightAll();