const toggle = document.getElementById('nav-toggle');
const nav = document.getElementById('site-nav');

if (toggle && nav) {
  const closeNav = () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  document.addEventListener('click', (event) => {
    if (!toggle.contains(event.target) && !nav.contains(event.target)) closeNav();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      closeNav();
      toggle.focus();
    }
  });

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));
  window.matchMedia('(min-width: 801px)').addEventListener('change', closeNav);
}

// Click-to-play videos: YouTube is contacted only after a click.
document.querySelectorAll('a[data-youtube]').forEach(link => {
  link.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const frame = document.createElement('div');
    frame.className = link.className;
    const player = document.createElement('iframe');
    player.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(link.dataset.youtube) + '?autoplay=1&rel=0';
    player.title = link.dataset.title || 'Video';
    player.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    player.allowFullscreen = true;
    player.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.appendChild(player);
    link.replaceWith(frame);
    player.focus();
  });
});
