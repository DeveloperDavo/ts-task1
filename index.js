const UL_ID = 'ulId'

function toggleHighlight(toggleFirst, i, li) {
  if ((i + (toggleFirst ? 0 : 1)) % 2 === 0) {
    li.classList.add('highlight')
  }
}

function createLi({ markDescription, comment, creationDate }, toggleFirst, i) {
  const li = document.createElement('li')
  const text = document.createTextNode(
    `${markDescription} ${comment} ${creationDate}`
  )
  toggleHighlight(toggleFirst, i, li)
  li.appendChild(text)
  return li
}

function render(reviews, toggleFirst) {
  const body = document.querySelector('body')
  const ul = document.createElement('ul')
  ul.setAttribute('id', UL_ID)
  const listItems = reviews.map((review, i) => {
    return createLi(review, toggleFirst, i)
  })
  listItems.forEach(li => ul.append(li))
  body.appendChild(ul)
}

function getReviews() {
  return fetch(
    'https://api-qa.trustedshops.com/rest/internal/v2/shops/X6A4AACCD2C75E430381B2E1C4CLASSIC/reviews.json'
  )
    .then(response => {
      return response.json()
    })
    .then(json => {
      return json.response.data.shop.reviews
    })
}

function rerender(reviews, toggleFirst) {
  document.querySelector('#' + UL_ID).remove()
  render(reviews, toggleFirst)
}

window.addEventListener('load', () => {
  getReviews().then(reviews => {
    let toggleFirst = false
    const state = { reviews }
    render(state.reviews, toggleFirst)
    document
      .querySelector('#highlight-toggle')
      .addEventListener('change', () => {
        toggleFirst = !toggleFirst
        rerender(state.reviews, toggleFirst)
      })
    document.querySelector('#refresh-button').addEventListener('click', () => {
      getReviews().then(reviews => {
        state.reviews = reviews
        rerender(state.reviews, toggleFirst)
      })
    })
  })
})
