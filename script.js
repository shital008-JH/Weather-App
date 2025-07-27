const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

const stateSelect = document.getElementById('stateSelect');
const citySelect = document.getElementById('citySelect');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const weatherDetails = document.getElementById('weatherDetails');
const weatherIcon = document.getElementById('weatherIcon');
const cityInput = document.getElementById('cityInput');
const searchCityBtn = document.getElementById('searchCityBtn');
const container = document.querySelector('.container');

// Example city data for a few states (expand as needed)
const citiesByState = {
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur", "Amravati"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Vellore"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner", "Alwar"],
    "Delhi": ["New Delhi", "Dwarka", "Rohini", "Karol Bagh", "Saket"],
    "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Darjeeling"],
    "Karnataka": ["Bengaluru", "Mysuru", "Mangalore", "Hubli", "Belgaum", "Davanagere"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Meerut", "Prayagraj", "Ghaziabad"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia"],
    "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
    "Haryana": ["Faridabad", "Gurgaon", "Panipat", "Ambala", "Hisar"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam", "Thrissur"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur", "Puri"],
    "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Nainital"],
    "Himachal Pradesh": ["Shimla", "Dharamshala", "Mandi", "Solan", "Kullu"],
    "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa"],
    "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan"],
    "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongpoh"],
    "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Serchhip"],
    "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailashahar"],
    "Manipur": ["Imphal", "Thoubal", "Bishnupur", "Churachandpur"],
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang"],
    "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Tawang", "Pasighat"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar"],
    "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg"],
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool"]
};

stateSelect.addEventListener('change', function() {
    const state = stateSelect.value;
    citySelect.innerHTML = '<option value="">Select City</option>';
    if (citiesByState[state]) {
        citiesByState[state].forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    }
});

getWeatherBtn.addEventListener('click', function() {
    const city = citySelect.value;
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please select a city.');
    }
});

searchCityBtn.addEventListener('click', function() {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});

// Remove or comment out this line:
// const locateBtn = document.getElementById('locateBtn');

// Remove or comment out this block:
// if (locateBtn) {
//     locateBtn.addEventListener('click', function() {
//         // ...location code...
//     });
// }

function fetchWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`)
        .then(res => {
            if (!res.ok) throw new Error('City not found');
            return res.json();
        })
        .then(data => displayWeather(data))
        .catch(() => alert('Could not fetch weather for this city.'));
}

function displayWeather(data) {
    if (!data || !data.weather) {
        weatherDetails.textContent = 'Weather data unavailable.';
        weatherIcon.style.display = 'none';
        return;
    }
    const iconCode = data.weather[0].icon;
    const description = data.weather[0].description;
    const temp = data.main.temp;
    const feelsLike = data.main.feels_like;
    const tempMin = data.main.temp_min;
    const tempMax = data.main.temp_max;
    const humidity = data.main.humidity;
    const pressure = data.main.pressure;
    const visibility = data.visibility ? (data.visibility / 1000) + " km" : "N/A";
    const clouds = data.clouds ? data.clouds.all + "%" : "N/A";
    const windSpeed = data.wind.speed;
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
    const city = data.name;
    const country = data.sys.country;

    weatherDetails.innerHTML = `
        <div class="weather-city">${city}, ${country}</div>
        <table style="margin: 18px auto; text-align:left; font-size:1.1rem;">
            <tr><td><b>Temperature:</b></td><td>${temp} °C</td></tr>
            <tr><td><b>Feels Like:</b></td><td>${feelsLike} °C</td></tr>
            <tr><td><b>Min Temp:</b></td><td>${tempMin} °C</td></tr>
            <tr><td><b>Max Temp:</b></td><td>${tempMax} °C</td></tr>
            <tr><td><b>Condition:</b></td><td>${description}</td></tr>
            <tr><td><b>Humidity:</b></td><td>${humidity}%</td></tr>
            <tr><td><b>Pressure:</b></td><td>${pressure} hPa</td></tr>
            <tr><td><b>Visibility:</b></td><td>${visibility}</td></tr>
            <tr><td><b>Cloudiness:</b></td><td>${clouds}</td></tr>
            <tr><td><b>Wind Speed:</b></td><td>${windSpeed} m/s</td></tr>
            <tr><td><b>Sunrise:</b></td><td>${sunrise}</td></tr>
            <tr><td><b>Sunset:</b></td><td>${sunset}</td></tr>
        </table>
    `;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = description;
    weatherIcon.style.display = 'block';
}
