// Variáveis e Seleção de Elementos
const apiKey = "c542d637f0bb5ea25565e80ccec5c662"
const apiCountryURL = "https://countryflagsapi.com/png/"

const cityInput = document.getElementById("city-input")
const searchBtn = document.getElementById("search")

const cityElement = document.querySelector("#city")
const tempElement = document.querySelector("#temperature span")
const descElement = document.querySelector("#description")
const weatherIconElement = document.querySelector("#weather-icon")
const countryElement = document.querySelector("#country")
const umidityElement = document.querySelector("#umidity span")
const windElement = document.querySelector("#wind span")


//Funções
const getWeatherData = async(city) => {

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    const res = await fetch(apiWeatherURL)
    const data = await res.json()

    console.log(data)

}


const showWeatherData = (city) => {
    getWeatherData(city)
}

//Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault()
    
    const city = cityInput.value
    
    showWeatherData(city)

})

