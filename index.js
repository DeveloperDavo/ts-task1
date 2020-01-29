let toggleHighlightStartingFromRow1 = false
const ulId = 'ulId'

function render(reviews) {
  const body = document.querySelector('body')
  const ul = document.createElement('ul')
  ul.setAttribute('id', ulId)
  reviews.map(({ markDescription, comment, creationDate }, i) => {
    const li = document.createElement('li')
    if ((i + (toggleHighlightStartingFromRow1 ? 1 : 0)) % 2 != 0)
      li.classList.add('highlight')
    const text = document.createTextNode(
      `${markDescription} ${comment} ${creationDate}`
    )
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

document.querySelector('#highlight-toggle').addEventListener('change', () => {
  toggleHighlightStartingFromRow1 = !toggleHighlightStartingFromRow1
  document.querySelector('#' + ulId).remove()
  getReviews()
})

window.addEventListener('load', () => {
  getReviews().then(reviews => render(reviews))
})
