function sidenav() {
	let bullets  = document.querySelectorAll('.sidenav a')
	let sections = document.querySelectorAll('section')
	let db = function() {
		for (let i = 0; i < bullets.length; i++) {
			let top    = sections[i].offsetTop
			let bottom = sections[i].offsetHeight + top
			let scroll = window.pageYOffset
			if ((scroll >= top && scroll < bottom) || ((top - scroll) <= 30) && (bottom - scroll >= 30)) {
				if (bullets[i].id !== 'active') {
					if (document.querySelector('#active')) {
						document.querySelector('#active').id = ''
					}
					bullets[i].id = 'active'
				}
			}
		}
	}
	window.addEventListener('scroll', db)
	db()
}

sidenav()


function anchorscroll(speed = 0.5, selector = '.anchorscroll', offset = 0) {

  window.raf = (function() {
    return window.requestAnimationFrame    ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  let anchors = [].slice.apply(document.querySelectorAll(selector)),
      links   = [].slice.apply(document.querySelectorAll('a')),
      hashes  = links.filter(x => x.getAttribute('href').charAt(0) === '#');

  for (let i = 0; i < hashes.length; i++) {

    ((num) => {
      hashes[num].addEventListener('click', (e) => {
        e.preventDefault();
        let hash     = hashes[num].getAttribute('href'),
            match    = anchors.filter(x => `#${x.id}` === hash),
            position = window.pageYOffset,
            top      = match[0].offsetTop;

        function scrollDown() {
          // Handle scrolling down to anchor
          if (top >= position + offset) {
            window.scrollTo(0, position);
            position += speed * 50;
            raf(scrollDown);
          }                    
        }

        function scrollUp() {
          // Handle scrolling up to anchor
          if (top <= position  + offset) {
            window.scrollTo(0, position);
            position -= speed * 50;
            raf(scrollUp);
          }                    
        }

        top >= position ? scrollDown() : scrollUp()

      }, false)

    })(i)
  }
} 

anchorscroll()