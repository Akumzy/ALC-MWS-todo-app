/**
 * Select any HTMLElement that matches the selector
 * @param {string} selector
 * @param {boolean} all
 */
function getElement(selector, all = false) {
  if (all) {
    return document.querySelectorAll(selector)
  }
  return document.querySelector(selector)
}
/**
 * Toggle a specific class on an Element
 * @param {HTMLElement|string} target
 * @param {string} cls
 */
function toggleClass(target, cls) {
  let el
  if (typeof target === 'string') {
    el = getElement(target)
  } else {
    el = target
  }
  el.classList.toggle(cls)
}

getElement('#openModal').addEventListener('click', function(event) {
  toggleClass('.modal', 'open')
})

getElement('.modal-close').addEventListener('click', function(event) {
  toggleClass('.modal', 'open')
})
