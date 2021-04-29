import "../assets/logo.png";

export default function displayNav(){
  const body =  document.querySelector('body')
  const content = document.querySelector('#content')
  const nav = body.insertBefore(document.createElement('nav'), content)
  const logo = nav.appendChild(document.createElement('img'))
  logo.src = "../assets/logo.png"
}