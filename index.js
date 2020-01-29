const ulId = 'ulId'

function toggleHighlightStartingRow(toggleHighlightStartingFromRow1, i, li) {
  if ((i + (toggleHighlightStartingFromRow1 ? 0 : 1)) % 2 == 0) {
    li.classList.add('highlight')
  }
}

function render(reviews, toggleHighlightStartingFromRow1) {
  const body = document.querySelector('body')
  const ul = document.createElement('ul')
  ul.setAttribute('id', ulId)
  reviews.map(({ markDescription, comment, creationDate }, i) => {
    const li = document.createElement('li')
    const text = document.createTextNode(
      `${markDescription} ${comment} ${creationDate}`
    )
    toggleHighlightStartingRow(toggleHighlightStartingFromRow1, i, li)
    li.appendChild(text)
    ul.appendChild(li)
  })
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

window.addEventListener('load', () => {
  let toggleHighlightStartingFromRow1 = false
  getReviews().then(reviews => {
    render(reviews, toggleHighlightStartingFromRow1)
    document
      .querySelector('#highlight-toggle')
      .addEventListener('change', () => {
        toggleHighlightStartingFromRow1 = !toggleHighlightStartingFromRow1
        document.querySelector('#' + ulId).remove()
        render(reviews, toggleHighlightStartingFromRow1)
      })
  })
})
