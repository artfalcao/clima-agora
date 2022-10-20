// Variáveis e Seleção de Elementos
const apiKey = "c542d637f0bb5ea25565e80ccec5c662"
const apiCountryURL = "https://countryflagsapi.com/png/"
const apiUnsplash = "https://source.unsplash.com/1600x900/?"

const cityInput = document.getElementById("city-input")
const searchBtn = document.getElementById("search")

const cityElement = document.querySelector("#city")
const tempElement = document.querySelector("#temperature span")
const descElement = document.querySelector("#description")
const weatherIconElement = document.querySelector("#weather-icon")
const countryElement = document.querySelector("#country")
const humidityElement = document.querySelector("#humidity span")
const windElement = document.querySelector("#wind span")

const weatherContainer = document.querySelector("#weather-data")

const errorMessageContainer = document.querySelector("#error-message");


//Funções
const getWeatherData = async(city) => {

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    const res = await fetch(apiWeatherURL)
    const data = await res.json()

    return data
}

const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide")
  }
  
  const hideInformation = () => {
    errorMessageContainer.classList.add("hide")
    weatherContainer.classList.add("hide")
  }


const showWeatherData = async (city) => {
    hideInformation()

    const data = await getWeatherData(city)

    //Tratando Error
    if (data.cod === "404") {
        showErrorMessage()
        return;
    }

    cityElement.innerText = data.name
    tempElement.innerText = parseInt(data.main.temp)
    descElement.innerText = data.weather[0].description
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    countryElement.setAttribute("src", apiCountryURL + data.sys.country)
    humidityElement.innerText = `${data.main.humidity}%`
    windElement.innerText = `${data.wind.speed}km/h`

    // Mudar Bg-Image
    document.body.style.backgroundImage = `url("${apiUnsplash + city}")`

    weatherContainer.classList.remove("hide")
}

//Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault()
    
    const city = cityInput.value
    
    showWeatherData(city)

})

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value

        showWeatherData(city)
    }
})

