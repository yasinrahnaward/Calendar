"use strict";


 const isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};


const getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
};

let calendar = document.querySelector('.calendar');
const month_names = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
let month_picker = document.querySelector('#month-picker');
const dayTextFormate = document.querySelector('.day-text-formate');
const timeFormate = document.querySelector('.time-formate');
const dateFormate = document.querySelector('.date-formate');

// console.log(dateTimeFormate);

month_picker.onclick = () => {
  month_list.classList.remove('hideonce');
  month_list.classList.remove('hide');
  month_list.classList.add('show');
  dayTextFormate.classList.remove('showtime');
  dayTextFormate.classList.add('hidetime');
  timeFormate.classList.remove('showtime');
  timeFormate.classList.add('hideTime');
  dateFormate.classList.remove('showtime');
  dateFormate.classList.add('hideTime');
};

const generateCalendar = (month, year) => {
  let calendar_days = document.querySelector('.calendar-days');
  calendar_days.innerHTML = '';
  let calendar_header_year = document.querySelector('#year');
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
  
  let first_day = new Date(year, month);


for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {

    let day = document.createElement('div');

    if (i >= first_day.getDay()) {
      day.innerHTML = i - first_day.getDay() + 1;

      // curent date display
      if (i - first_day.getDay() + 1 === currentDate.getDate() &&
        year === currentDate.getFullYear() &&
        month === currentDate.getMonth()
      ) {
        day.classList.add('current-date');
      }
    }
    calendar_days.appendChild(day);
  }
};

let month_list = calendar.querySelector('.month-list');
month_names.forEach((e, index) => {
  let month = document.createElement('div');
  month.innerHTML = `<div>${e}</div>`;

  month_list.append(month);
  month.onclick = () => {
    currentMonth.value = index;
    generateCalendar(currentMonth.value, currentYear.value);
    month_list.classList.replace('show', 'hide');
    dayTextFormate.classList.remove('hideTime');
    dayTextFormate.classList.add('showtime');
    timeFormate.classList.remove('hideTime');
    timeFormate.classList.add('showtime');
    dateFormate.classList.remove('hideTime');
    dateFormate.classList.add('showtime');
  };
});
(function () {
  month_list.classList.add('hideonce');
})();
document.querySelector('#pre-year').onclick = () => {
  --currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};
document.querySelector('#next-year').onclick = () => {
  ++currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};

let currentDate = new Date();
let currentMonth = { value: currentDate.getMonth() };
let currentYear = { value: currentDate.getFullYear() };
generateCalendar(currentMonth.value, currentYear.value);

// timer
const todayShowTime = document.querySelector('.time-formate');
const todayShowDate = document.querySelector('.date-formate');

// formating the current date of today
const currshowDate = new Date();
const showCurrentDateOption = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
};
const currentDateFormate = new Intl.DateTimeFormat(
  'en-US',
  showCurrentDateOption
).format(currshowDate);
todayShowDate.textContent = currentDateFormate;

//  digital clock
setInterval(() => {
  const timer = new Date();
  const option = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  // formating time
  // #1 first sulotion
  const formateTimer = new Intl.DateTimeFormat('en-us', option).format(timer);
  // #2 second sulotion
  let time = `${`${timer.getHours()}`.padStart(
    2,
    '0'
  )}:${`${timer.getMinutes()}`.padStart(
    2,
    '0'
  )}: ${`${timer.getSeconds()}`.padStart(2, '0')}`;
  todayShowTime.textContent = formateTimer;
}, 1000);

// new event creation
const newEventForm = document.querySelector('.new-event');
// buttons
const btnNewEvent = document.querySelector('.add-new-event-btn');
const btnCancelNewEvent = document.querySelector('#new-event-cancel');
const btnCloseNewevent = document.querySelector('.close-btn');
const btnSaveNewEvent = document.querySelector('#new-event-save');
const btnResetNewEvent = document.querySelector('#new-event-reset');
// let btnDeleteEventHTMLCollection=document.getElementsByClassName('event-item-delete');
// const btnDeleteEventNodeList=document.querySelectorAll('.event-item-delete');
const btnEditEvetn=document.querySelector('.event-item-edit')
// input elements
const NewEventTitle = document.querySelector('#new-event-title-value');
const NewEventDescription = document.querySelector('#new-event-description');
const NewEventStartDate = document.querySelector('#new-event-start-date');
const NewEventStartTime = document.querySelector('#new-event-start-time');
const NewEventEndDate = document.querySelector('#end-event-start-date');
const NewEventEndTime = document.querySelector('#new-event-end-time');
const NewEventRemindMe = document.querySelector('#remind-me-options');
const EventItemContainer = document.querySelector('.event-itme-container');



const labelNewEventTitle = document.querySelector('#new-event-title');

// new event creation init function
const initNewEvent = (e) => {
  NewEventTitle.value = '';
  NewEventDescription.value = '';
  NewEventStartDate.value = '';
  NewEventStartTime.value = '';
  NewEventEndDate.value = '';
  NewEventEndTime.value = '';
  NewEventRemindMe.value = 'Never';
};
initNewEvent();
// create new evetn botton
btnNewEvent.addEventListener('click', (e) => {
  initNewEvent();
  newEventForm.classList.remove('hideNewEventForm');
  newEventForm.classList.add('showNewEventForm');
});

// the cancel the new event creation
btnCancelNewEvent.addEventListener('click', (e) => {
  newEventForm.classList.add('hideNewEventForm');
  newEventForm.classList.remove('showNewEventForm');
});
// close the new event creation
btnCloseNewevent.addEventListener('click', () => {
  newEventForm.classList.add('hideNewEventForm');
  newEventForm.classList.remove('showNewEventForm');
});

// resect the form elements of new event creation
btnResetNewEvent.addEventListener('click', (e) => {
  initNewEvent();
});

// calc start date || convert to mili second to perform mathematical operation

const calcStartDate = (startDateOfEvent) => {
  // console.log(startDateOfEvent);

  const [yearStart, monthStart, daystart] = [...startDateOfEvent.split('-')];
  const startDate = new Date(yearStart, monthStart, daystart);
  return +startDate / (1000 * 60 * 60 * 24);
};

// Function : clac the end date to mili second to perform mathematical operation
const calcEndDate = (EndDateOfEvent) => {
  const [yearEnd, monthEnd, dayEnd] = [...EndDateOfEvent.split('-')];
  const EndDate = new Date(yearEnd, monthEnd, dayEnd);
  return +EndDate / (1000 * 60 * 60 * 24);
};

// function : convet the current date formate
const convertCurrentDateFormate = (currentDate) => {
  const CurrentYear = currentDate.getFullYear();
  const CurrentMonth = currentDate.getMonth() + 1;
  const CurrentDay = currentDate.getDate();
  return calcStartDate(`${CurrentYear}-${CurrentMonth}-${CurrentDay}`);
};



// fucntion : create abbreviation for a date
const calcAbbrevaitionDate= (date)=>{
  if(date<1) return `Today.`;
  if(date<2)  return `Tommorrow`
  if(date<7) return `${date} days later . `;
  if(date<30) return `${Math.trunc(date/7)} weeks later`;
  if(date<360) return  `${Math.trunc(date/30)} Months later`;
  else{
    return `${ Math.trunc(date/360)} years later`;
  } 
};
// creaete a new event to the event list
let eventCreatedStatus = false;
let btnDeleteEvent;
const createNewEvent = () => {
  const startDate = calcStartDate(NewEventStartDate.value);
  const endDate = calcEndDate(NewEventEndDate.value);
  const formatedCurrentDate = convertCurrentDateFormate(currentDate);

  // check that the start date of event must be in the feature

  if (startDate <= endDate) {
    if (formatedCurrentDate > startDate) {
      setTimeout(resettitletext, 6000);
      startDatevalidation();
    } else {
      // creat html element dynamic with js
      const HTMLNewEvent = `
      <div class="event-items">
      <span class="event-item-color"></span>
      <span class="event-item-title">${NewEventTitle.value}</span>
      <span class="event-item-edit">&#9998</span>
      <span class="event-item-delete">&#9587</span>
      <p class="event-item-text">
      ${NewEventDescription.value}
      </p>
      <div class="event-item-date" id="event-date-start">    start : ${calcAbbrevaitionDate(Math.abs(startDate-formatedCurrentDate))}</div>
      <div class="event-item-date" id="event-date-end">        End : ${calcAbbrevaitionDate(Math.abs(endDate-formatedCurrentDate))}</div>
      <div class="event-item-date" id="event-date-remains">Remains : ${NewEventRemindMe.value}</div>
      </div>
      `;
      // console.log(HTMLNewEvent);
       EventItemContainer.insertAdjacentHTML('afterbegin', HTMLNewEvent);
      newEventForm.classList.add('hideNewEventForm');
      newEventForm.classList.remove('showNewEventForm');

     
    }
  } else {
    endDatevalidation();
    setTimeout(resettitletext, 6000);
  }
  // delete events over for of loop
  // btnDeleteEvent=document.getElementsByClassName('event-item-delete');
  // console.log(btnDeleteEvent.parentElement);
  // for (const i of btnDeleteEvent) {

  //   i.addEventListener('click',()=>{
  //       console.log(i);
  //       const t=setTimeout(()=>{
  //         i.parentElement.classList.add('to-top');
  //         i.parentElement.remove();
  //      },100);

  //   });
  //   }
  
};


// event progration && event delegation
// add event listener to a common parent of intersted elements
const delg=document.querySelector('.event-itme-container');
delg.addEventListener('click',(e)=>{
  if(e.target.classList.contains('event-item-delete')){

    console.log(e.target.parentElement.remove());
  }
});



btnSaveNewEvent.addEventListener('click', (e) => {
  createNewEvent()
});


// validation
const endDatevalidation = () => {
  labelNewEventTitle.textContent = `${labelNewEventTitle.textContent}  ! END date  must be more then start date of event. `;
  NewEventEndDate.value = '';
};
const startDatevalidation = () => {
  labelNewEventTitle.textContent = `${labelNewEventTitle.textContent}  ! just the future event is legal. `;
  NewEventStartDate.value = '';
};

const resettitletext = () => {
  labelNewEventTitle.textContent = labelNewEventTitle.textContent.split('!')[0];
};
