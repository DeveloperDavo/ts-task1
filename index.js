const UL_ID = 'ulId'

function toggleHighlightStartingRow(toggleHighlightStartingFromRow1, i, li) {
  if ((i + (toggleHighlightStartingFromRow1 ? 0 : 1)) % 2 == 0) {
    li.classList.add('highlight')
  }
}

function createLi(
  { markDescription, comment, creationDate },
  toggleHighlightStartingFromRow1,
  i
) {
  const li = document.createElement('li')
  const text = document.createTextNode(
    `${markDescription} ${comment} ${creationDate}`
  )
  toggleHighlightStartingRow(toggleHighlightStartingFromRow1, i, li)
  li.appendChild(text)
  return li
}

function render(reviews, toggleHighlightStartingFromRow1) {
  const body = document.querySelector('body')
  const ul = document.createElement('ul')
  ul.setAttribute('id', UL_ID)
  const listItems = reviews.map((review, i) => {
    return createLi(review, toggleHighlightStartingFromRow1, i)
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

function rerender(reviews, toggleHighlightStartingFromRow1) {
  document.querySelector('#' + UL_ID).remove()
  render(reviews, toggleHighlightStartingFromRow1)
}

window.addEventListener('load', () => {
  getReviews().then(reviews => {
    let toggleHighlightStartingFromRow1 = false
    const state = { reviews }
    render(state.reviews, toggleHighlightStartingFromRow1)
    document
      .querySelector('#highlight-toggle')
      .addEventListener('change', () => {
        toggleHighlightStartingFromRow1 = !toggleHighlightStartingFromRow1
        rerender(state.reviews, toggleHighlightStartingFromRow1)
      })
    document.querySelector('#refresh-button').addEventListener('click', () => {
      getReviews().then(reviews => {
        state.reviews = reviews
        rerender(state.reviews, toggleHighlightStartingFromRow1)
      })
    })
  })
})
