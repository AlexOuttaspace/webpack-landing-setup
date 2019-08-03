export const setCurrentNavlink = () => {
  const navlinks = document.querySelectorAll('[data-js="navlink"]')

  navlinks.forEach((navlink) => {
    if (window.location.href === navlink.href) {
      navlink.classList.add('navigation__item-link_current')
    }
  })
}
