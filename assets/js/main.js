/**
* main js script
*/
(function() {
    "use strict";
  
    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
      el = el.trim()
      if (all) {
        return [...document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }
  
    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
      let selectEl = select(el, all)
      if (selectEl) {
        if (all) {
          selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
          selectEl.addEventListener(type, listener)
        }
      }
    }
  
    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener)
    }
  
    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
      let position = window.scrollY + 200
      navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return
        let section = select(navbarlink.hash)
        if (!section) return
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active')
        } else {
          navbarlink.classList.remove('active')
        }
      })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)
  
    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
      let header = select('#header')
      let offset = header.offsetHeight
  
      let elementPos = select(el).offsetTop
      window.scrollTo({
        top: elementPos - offset,
        behavior: 'smooth'
      })
    }
  
    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')
    if (selectHeader) {
      const headerScrolled = () => {
        if (window.scrollY > screen.height-200) {
          selectHeader.classList.add('header-scrolled');
          selectHeader.classList.add('navbar-scrolled');
        } else {
          selectHeader.classList.remove('header-scrolled')
          selectHeader.classList.remove('navbar-scrolled');
        }
      }
      window.addEventListener('load', headerScrolled)
      onscroll(document, headerScrolled)
    }
  
    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add('active')
        } else {
          backtotop.classList.remove('active')
        }
      }
      window.addEventListener('load', toggleBacktotop)
      onscroll(document, toggleBacktotop)
    }
  
    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function(e) {
      select('#navbar').classList.toggle('navbar-mobile')
      this.classList.toggle('bi-list')
      this.classList.toggle('bi-x')
    })
  
    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function(e) {
      if (select('#navbar').classList.contains('navbar-mobile')) {
        e.preventDefault()
        this.nextElementSibling.classList.toggle('dropdown-active')
      }
    }, true)
  
    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function(e) {
      if (select(this.hash)) {
        e.preventDefault()
  
        let navbar = select('#navbar')
        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile')
          let navbarToggle = select('.mobile-nav-toggle')
          navbarToggle.classList.toggle('bi-list')
          navbarToggle.classList.toggle('bi-x')
        }
        scrollto(this.hash)
      }
    }, true)
  
    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
      if (window.location.hash) {
        if (select(window.location.hash)) {
          scrollto(window.location.hash)
        }
      }
    });
  
    /**
     * Preloader
     */
    let preloader = select('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.remove()
      });
    }
  
    /**
     * Initiate  glightbox 
     */
    const glightbox = GLightbox({
      selector: '.glightbox'
    });

    /**
     * services slider
     */
    new Swiper('.swiper', {
      speed: 400,
      loop: true,
      // autoplay: {
      //   delay: 5000,
      //   disableOnInteraction: false
      // },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });
  
    /**
     * Animation on scroll
     */
    window.addEventListener('load', () => {
      AOS.init({
        duration: 600,
        easing: "ease",
        once: false,
        mirror: true
      });
    });
  })()

/**
*envoie de mail
*/
function sendEmail() {
    if(document.getElementById('name').value === "" || document.getElementById('email').value === ""
      || document.getElementById('subject').value === "" || document.getElementById('message').value === ""){
        document.getElementsByClassName('error-message')[0].innerHTML="Veuillez remplir tous les champs s'il vous plait.";
        document.getElementsByClassName('error-message')[0].style.display='block';
    }
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;
    
    fetch('forms/contact.php', {
          method: 'POST',
          headers: {
               'Content-Type': 'application/x-www-form-urlencoded',
          },
           body: 'name=' + encodeURIComponent(name) + '&email=' + encodeURIComponent(email) + '&subject=' + encodeURIComponent(subject) + '&message=' + encodeURIComponent(message),
     })
     .then(response => response.json())
     .then(data => {
        if (data.success) {
            document.getElementsByClassName('error-message')[0].style.display='none';            
            const successMessage = document.getElementsByClassName('sent-message')[0];
            successMessage.style.display = 'block';
            document.getElementById('name').value='';
            document.getElementById('email').value='';
            document.getElementById('subject').value='';
            document.getElementById('message').value='';
        } else {
            document.getElementsByClassName('error-message')[0].value="Une erreur s'est produite lors de l'envoie, veuileez re-essayer ulterieurment."
        }
     })
    .catch(error => {
           console.error('Error:', error);
            document.getElementsByClassName('error-message')[0].innerHTML="Une erreur s'est produite lors de l'envoie, veuillez re-essayer ulterieurment."
            document.getElementsByClassName('error-message')[0].style.display='block'; 
    });
}