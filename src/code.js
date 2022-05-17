const form = document.querySelector('.form')
const text = document.querySelector('.text')
let list = []
let ul = document.createElement('ul')

form.addEventListener('submit', (event) => {
  event.preventDefault()
  console.log(event.target.textInput.value)
  const key = config.SECRET_API_KEY
  const data = {
    'prompt': `Translate this into 1. French, 2. Spanish and 3. Japanese:\n\n${event.target.textInput.value}\n\n`,
    'temperature': 0.3,
    'max_tokens': 100,
    'top_p': 1.0,
    'frequency_penalty': 0.0,
    'presence_penalty': 0.0,
  }

  const headers = {
    'Authorization': `Bearer ${key}`
  }
  const url = 'https://api.openai.com/v1/engines/text-curie-001/completions'
  axios.post(url, data, { headers })
    .then(response => {
      console.log(response.data.choices[0].text)

      let lists = {
        key: list.length,
        text: event.target.textInput.value,
        translation: response.data.choices[0].text
      }

      list.push(lists)
      displayList()
      console.warn('added', { lists })
    })
    .catch(error => console.error(error))

  function displayList() {
    text.innerHTML = ''
    ul.innerHTML = ''
    list.sort(function(a, b){return b.key - a.key})
    list.forEach(item => {
      let li = document.createElement('li')
      li.innerHTML = item.text
      let childList = li.appendChild(document.createElement('li'))
      childList.innerHTML = item.translation
      ul.append(li)
      ul.appendChild(childList)
    })
    text.append(ul)
    console.log(list)
  }
})