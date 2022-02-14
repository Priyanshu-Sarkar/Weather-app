const day = document.getElementById('date');
const temp_status = document.getElementById('temp_status');
const temp = document.getElementById('temp');
let tempStatus = "";
const currentTime = new Date();
const getCurrentDate = ()=>{
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep','Oct', 'Nov', 'Dec']
    let date = currentTime.getDate();
    let month = months[currentTime.getMonth()];
    let fdate = `${date}-${month}`;
    return fdate;
};
const getCurrentTime = ()=>{
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let period = 'AM';
    if(hours>12){
        period = 'PM';
        hours-=12;
    }else{
        period = 'AM';
    }
    if(minutes<10){
        minutes = '0'+minutes;
    }
    let ftime = `${hours}:${minutes} ${period}`
    return ftime;
};
const getCurrentDay = ()=>{
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let day = days[currentTime.getDay()];
    return day;
}
day.innerText = getCurrentTime() + ' | ' + getCurrentDay() + ' | ' + getCurrentDate();









const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');

submitBtn.addEventListener('click', async(e)=>{
    e.preventDefault();
    let cityVal = cityName.value;
    console.log(cityVal);
    if(cityVal == ""){
        city_name.innerText = 'Please write the cityname before you search';
    }else{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=646d6e4c0db73b5e9c56a54d899ff577`
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            const arrData = [data];
            console.log(arrData);
            if(!arrData[0].sys.country){
                city_name.innerText = `${arrData[0].name}`;
            }else{
                city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            }
            temp.innerHTML = `${(arrData[0].main.temp - 273.15).toFixed(2)}&deg;C`;
            console.log(temp_status);
            tempStatus = arrData[0].weather[0].main
            if(tempStatus == "Sunny"){
                temp_status.innerHTML = `<i class="fas fa-sun text-large" style="color: yellow; font-size: 3em; margin-bottom: .5em;" id="icon"></i>`
            }else if(tempStatus == "Clouds"){
                temp_status.innerHTML = `<i class="fas fa-cloud text-large" style="color: #dfe4ea; font-size: 3em; margin-bottom: .5em;" id="icon"></i>`
            }else if(tempStatus == "Rainy"){
                temp_status.innerHTML = `<i class="fas fa-cloud-showers-heavy text-large" style="color: skyblue; font-size: 3em; margin-bottom: .5em;" id="icon"></i>`
            }else if(tempStatus == "Clear"){
                temp_status.innerHTML = `<i class="fas fa-cloud-sun  text-large"></i>`
            }
        }catch{
            city_name.innerText = 'Please enter the city name properly or check your internet connection';
            temp.innerHTML = '';
        }
    }
});