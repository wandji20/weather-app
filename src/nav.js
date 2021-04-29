import "../assets/logo.png";

export default function displayNav(){
  const body =  document.querySelector('body')
  const content = document.querySelector('#content')
  const nav = body.insertBefore(document.createElement('nav'), content)
  const logo = nav.appendChild(document.createElement('img'))
  logo.src = "../assets/logo.png"

  const form = nav.appendChild(document.createElement('form'))
  const cityName = form.appendChild(document.createElement('input'))
  cityName.type = 'text'
  cityName.placeholder = 'Enter a city name'
  const formSubmit = form.appendChild(document.createElement('input'))
  formSubmit.type = "submit";
  formSubmit.innerHTML = 'Search'
  formSubmit.setAttribute('class', 'submit-btn' )

  const btnContainer = nav.appendChild(document.createElement('div'))
  const tempBtn = btnContainer.appendChild(document.createElement('button'))
  tempBtn.setAttribute('class', 'temp-btn')
  tempBtn.textContent = 'F / C'
}