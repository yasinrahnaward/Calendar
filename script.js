// "use strict";
// document.querySelector(".switch-mode").onclick = () => {
//   document.querySelector("body").classList.toggle("dark");
//   document.querySelector("body").classList.toggle("light");
// };


isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};
// console.log(isLeapYear(2014));

getFebDays = (year) => {
  
  return isLeapYear(year) ? 29 : 28;
};

let calendar = document.querySelector(".calendar");
const month_names = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month_picker = document.querySelector("#month-picker");
const dayTextFormate=document.querySelector('.day-text-formate');
const timeFormate=document.querySelector('.time-formate');
const dateFormate=document.querySelector('.date-formate');

// console.log(dateTimeFormate);

month_picker.onclick=()=>{

  
  month_list.classList.remove('hideonce');
  month_list.classList.remove('hide');
  month_list.classList.add('show');

  dayTextFormate.classList.remove('showtime');
  dayTextFormate.classList.add('hidetime');
  timeFormate.classList.remove('showtime');
  timeFormate.classList.add('hideTime');
  dateFormate.classList.remove('showtime');
  dateFormate.classList.add('hideTime');


  
}

generateCalendar = (month,year) => {
  let calendar_days = document.querySelector(".calendar-days");
  calendar_days.innerHTML = "";
  let calendar_header_year = document.querySelector("#year");
  let days_of_month = [
    31,
    getFebDays(year),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  let currentDate = new Date();
  
  month_picker.innerHTML = month_names[month];

  
  calendar_header_year.innerHTML = year;
  
  let first_day = new Date(month, year,1);

  
  
  for (let i = 0; i <= days_of_month[month] + first_day.getDay() -1; i++) {
    let day = document.createElement("div");
    if (i >= first_day.getDay()) {
      day.innerHTML = i- first_day.getDay() +1;
      
      // curent date display
      if (
        i - first_day.getDay() + 1 === currentDate.getDate() &&
        year === currentDate.getFullYear() &&
        month === currentDate.getMonth()
      ) {
        day.classList.add("current-date");
      }
    }
    calendar_days.appendChild(day);
  }
};

let month_list = calendar.querySelector(".month-list");
month_names.forEach((e, index) => {
  let month = document.createElement("div");
  month.innerHTML = `<div>${e}</div>`;

  
  month_list.append(month);
  month.onclick=()=>{

    currentMonth.value=index;
    generateCalendar(currentMonth.value,currentYear.value);
    month_list.classList.replace('show','hide');
     dayTextFormate.classList.remove('hideTime');
    dayTextFormate.classList.add('showtime');
    timeFormate.classList.remove('hideTime');
    timeFormate.classList.add('showtime');
    dateFormate.classList.remove('hideTime');
    dateFormate.classList.add('showtime');
  }
});
(function(){
  month_list.classList.add("hideonce");
  
})()
document.querySelector('#pre-year').onclick=()=>{
  --currentYear.value;
  generateCalendar(currentMonth.value,currentYear.value)
}
document.querySelector('#next-year').onclick=()=>{
  ++currentYear.value;
  generateCalendar(currentMonth.value,currentYear.value)
}

let currentDate = new Date();
let currentMonth = { value: currentDate.getMonth()};
let currentYear = { value: currentDate.getFullYear() };
generateCalendar(currentMonth.value, currentYear.value);


// timer
const todayShowTime = document.querySelector('.time-formate');
const todayShowDate = document.querySelector('.date-formate');
const currshowDate=new Date();
todayShowDate.textContent=currentDate.getFullYear()+'-'+(month_names[currentDate.getMonth()])+'-'+ currentDate.getDate();
function showTime()
{
  const dateTime =new Date();
  let time=dateTime.getHours() +':'+ dateTime.getMinutes()+':'+ dateTime.getSeconds();
  todayShowTime.textContent=time;
}
window.setInterval(showTime,1000);
