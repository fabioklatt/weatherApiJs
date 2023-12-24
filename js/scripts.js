//variáveis e seleção de elementos
const apiKey = "a16e8c6750097b1f8e150c3d5601658d"
const apiCountryURL = "https://flagsapi.com/BE/flat/64.png"
const apiUnsplash = "https://source.unsplash.com/1600x900/?"

const cityInput = document.querySelector("#city-input")
const searchBtn = document.getElementById("search")
const sugButton = document.querySelector(".sugButton")
const cityElement = document.querySelector("#city")
const tempElement = document.querySelector("#temperature span")
const descElement = document.querySelector("#description")
const weatherIconElement = document.querySelector("#weather-icon")
const countryElement = document.querySelector("#country")
const humidityElement = document.querySelector("#humidity span")
const windElement = document.querySelector("#wind span")

const weatherContainer = document.querySelector("#weather-data")

const errorMessageContainer = document.querySelector("#error-message")
const loader = document.querySelector("#loader")

const suggestionContainer = document.querySelector("#suggestions")
const suggestionButtons = document.querySelectorAll("#suggestions button")


const toggleLoader = () => {
    loader.classList.toggle("hide")
}
//funções
const getWeatherData = async(city) => {
    toggleLoader()

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    const res = await fetch(apiWeatherURL)
    const data = await res.json()

    toggleLoader()

    return data

}

//tratamento de erro
const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide")
}

const hideInformation = () => {
    errorMessageContainer.classList.add("hide")
    weatherContainer.classList.add("hide")

    suggestionContainer.classList.add("hide")
}


const showWeatherData = async (city) => {
    hideInformation()

    const data = await getWeatherData(city)
    
    if (data.cod === "404"){
        showErrorMessage()
        return
    }

    cityElement.innerText = data.name
    tempElement.innerText = parseInt(data.main.temp)
    descElement.innerText = data.weather[0].description
    weatherIconElement.setAttribute("src",
    `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    countryElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/64.png`)
    humidityElement.innerText = `${data.main.humidity}`
    windElement.innerText = `${data.wind.speed} KM/H`

    document.body.style.backgroundImage = `url("${apiUnsplash + city}")`

    weatherContainer.classList.remove("hide")

}
//eventos
searchBtn.addEventListener('click', (e)=>{
    e.preventDefault()
   const city = cityInput.value
   showWeatherData(city)
})

const sugButtons = document.querySelectorAll("#suggestions button")
sugButtons.forEach((btn) => {
    btn.addEventListener("click", () =>{
        const city = btn.getAttribute("id")
        showWeatherData(city)
        console.log(city)
    })
})

//ao clicar enter
cityInput.addEventListener("keyup", (e) => {
    if (e.code === 'Enter'){
        const city = e.target.value
        showWeatherData(city)
    }
})
