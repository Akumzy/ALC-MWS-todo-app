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

/**
 * Generate a HTML string for displaying a todo based on the given data
 * @param {{title:string;description:string;isCompleted:boolean}} data
 */
function generateTemplate(data) {
  let t = `
  <div class="todo-card flex">
    <div class="flex justify-center items-center">
    <input type="checkbox" value="${!!data.isCompleted}" />
    </div>
    <div class="flex-1">
      <h3 data-title></h3>
      <p data-description></p>
    </div>
    <div class="flex justify-center items-center">
    <span title="${!!data.isCompleted ? 'Delete' : 'Edit'}">
    ${
      !!data.isCompleted
        ? `<svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M9,3V4H4V6H5V19C5,20.1 5.9,21 7,21H17C18.1,21 19,20.1 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"
            >
              <title>Delete</title>
            </path>
          </svg>`
        : `<svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z"
            ></path>
          </svg>`
    }
      </span>
    </div>
  </div>
  `
  // We are doing this to avoid HTML injection
  let div = document.createElement('div')
  div.innerHTML = t
  div.querySelector('[data-title]').textContent = data.title
  div.querySelector('[data-description]').textContent = data.description
  return div.firstElementChild
}

getElement('#openModal').addEventListener('click', function(event) {
  toggleClass('.modal', 'open')
})

getElement('.modal-close').addEventListener('click', function(event) {
  toggleClass('.modal', 'open')
  // Reset the form fields
  getElement('.modal form').reset()
})

getElement('.modal form').addEventListener('submit', function(event) {
  // This prevent to form not to reload the page by trying to post the form field
  // to an endpoint
  event.preventDefault()
  // this is referring to this HTML Element the event was attached on
  // in this case it's the form element and we can access any of the form
  // element with the form element name attribute's name
  let description = this.description.value
  let title = this.title.value
  let template = generateTemplate({ title, description })
  getElement('#inProgress').appendChild(template)
  // Reset the form
  this.reset()
  toggleClass('.modal', 'open')
})
