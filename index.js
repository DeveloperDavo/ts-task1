function render({ reviews }) {
  const body = document.querySelector('body')
  const ul = document.createElement('ul')
  reviews.map(({ markDescription, comment, creationDate }) => {
    const li = document.createElement('li')
    const text = document.createTextNode(
      `${markDescription} ${comment} ${creationDate}`
    )
    li.appendChild(text)
    ul.appendChild(li)
  })
  body.appendChild(ul)
}

function reviews() {
  fetch(
    'https://api-qa.trustedshops.com/rest/internal/v2/shops/X6A4AACCD2C75E430381B2E1C4CLASSIC/reviews.json'
  )
    .then(response => {
      return response.json()
    })
    .then(json => {
      render(json.response.data.shop)
    })
}

reviews()
