// updates time on the index page header
function updateTime() {

  let today = dayjs().format('dddd, MMMM D YYYY, h:mm:ss A');
  $("#currentDay").html(today);

  // Evaluate if the time is in correct past, present, or future time block, and assign a specified color style
  let now = dayjs().format('HH');
  for (let i = 0; i < scheduleElArray.length; i++) {
      scheduleElArray[i].removeClass("future past present");
      // Use HTML custom data-* attributes to allocate each textarea with an unique time ID
      if (now > scheduleElArray[i].data("hour")) {
        console.log
          scheduleElArray[i].addClass("past");

      } else if (now === scheduleElArray[i].attr("data-hour")) {
          scheduleElArray[i].addClass("present");

      } else {

          scheduleElArray[i].addClass("future");
      }
  }
}

// select different textarea elements
let saveBttn = $(".saveBtn");
let schedule9am = $("#9AM");
let schedule10am = $("#10AM");
let schedule11am = $("#11AM");
let schedule12pm = $("#12PM");
let schedule1pm = $("#1PM");
let schedule2pm = $("#2PM");
let schedule3pm = $("#3PM");
let schedule4pm = $("#4PM");
let schedule5pm = $("#5PM");
//Create a testarea array for further loop
let scheduleElArray = [
  schedule9am,
  schedule10am,
  schedule11am,
  schedule12pm,
  schedule1pm,
  schedule2pm,
  schedule3pm,
  schedule4pm,
  schedule5pm,
];

renderSavedSchedule();
updateTime();
setInterval(updateTime, 1000); 

//Render schedule saved in local storage
function renderSavedSchedule() {
  for (let el of scheduleElArray) {
      el.val(localStorage.getItem("time block " + el.data("hour")));

  }
}


//Function for handling clicks
function saveToLocalStorage(event) {
  event.preventDefault();

  let btnClicked = $(event.currentTarget);

  let targetText = btnClicked.siblings("textarea");

  let targetTimeBlock = targetText.data("hour");
  console.log("Save Button Clicked, the time block is:  " + targetTimeBlock);

  localStorage.setItem("time block " +  targetTimeBlock, targetText.val());
}

saveBttn.on("click", saveToLocalStorage);
