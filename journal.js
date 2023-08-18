const table = document.getElementById("table");
const headTr = document.querySelector(".headTr");
const trs = document.querySelectorAll(".newColumn");
const addElement = document.getElementById("addDay");
const removeElement = document.getElementById("removeDay");
const studentAverages = document.querySelectorAll(".average");
const totalAverageElement = document.getElementById("totalAverage");
const grades = document.querySelectorAll(".grades");
let numColumnsAded = 0;
const totalDays = document.getElementById("totalDays");
let missedDays = 0;
const missedDaysElement = document.getElementById("missedDays");

// თარიღის შექმნა
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let currentDate = new Date(2022, 11, 5);
let days = [1, 3, 5];
let currentIndex = 0;
function generateNewDate() {
  let dateStr = "";
  while (currentDate.getDay() !== days[currentIndex]) {
    currentDate.setDate(currentDate.getDate() + 1);
  }
  let dayOfWeek = daysOfWeek[days[currentIndex]];
  let dayOfMonth = currentDate.getDate();
  let month = currentDate.toLocaleString("default", { month: "short" });
  dateStr += `${dayOfMonth}${month}${dayOfWeek}\n`;
  currentDate.setDate(currentDate.getDate() + 1);
  currentIndex = (currentIndex + 1) % days.length;
  return dateStr;
}
// თითოეული დღისთვის ქულების სვეტის დამატება
function createNewColumn() {
  const th = document.createElement("th");
  th.innerHTML = generateNewDate();
  headTr.appendChild(th);
  trs.forEach((tr) => {
    const td = document.createElement("td");
    td.classList.add("grades");
    td.innerHTML = "0.00";
    td.style.backgroundColor = "rgb(204, 126, 126)";
    tr.appendChild(td);
  });
  numColumnsAded++;
  totalDays.textContent = `Total Days: ${numColumnsAded}`;
  updateAndRenderAverages();
  // getMissedDays();
}

addElement.addEventListener("click", createNewColumn);

// ქულების შეყვანა
function getTheGrade() {
  table.addEventListener("click", (event) => {
    if (event.target.classList.contains("grades")) {
      let grade = prompt("insert the grade");
      if (grade >= 1 && grade <= 5) {
        event.target.innerHTML = grade;
        event.target.style.backgroundColor = "rgb(127, 198, 127)";
        // getMissedDays();
        updateAndRenderAverages();
      } else {
        alert("Please insert a grade between 1 and 5.");
      }
    }
  });
}
getTheGrade();

// შეუვსებელი უჯრები

// function getMissedDays() {
//   let missedDays = 0;
//   grades.forEach((grade) => {
//     if (grade.style.backgroundColor === "rgb(204, 126, 126)") {
//       missedDays++;
//     }
//   });
//   missedDaysElement.innerHTML = `Missed Days: ${missedDays}`;
// }

// თითოეული სტუდენტის საშუალო

function calculateTheAverage(grades) {
  let sum = 0;
  let count = 0;
  for (let grade of grades) {
    const eachGrade = parseFloat(grade.innerHTML);
    sum += eachGrade;
    count++;
  }
  return count === 0 ? 0 : sum / count;
}

function updateAndRenderAverages() {
  trs.forEach((tr) => {
    const grades = tr.querySelectorAll(".grades");
    const average = tr.querySelector(".average");
    const studentAverage = calculateTheAverage(grades);
    average.innerHTML = studentAverage.toFixed(2);
  });
  calculateTotalAverage();
}

// ჯამური საშუალო
function calculateTotalAverage() {
  let sum = 0;
  studentAverages.forEach((average) => {
    const grade = parseFloat(average.innerHTML);
    sum += grade / studentAverages.length;
  });
  totalAverageElement.innerHTML = `Total Average: ${sum.toFixed(2)}`;
}

removeElement.addEventListener("click", () => {
  if (numColumnsAded > 0) {
    headTr.removeChild(headTr.lastChild);
    trs.forEach((tr) => {
      tr.removeChild(tr.lastChild);
    });
    numColumnsAded--;
    totalDays.textContent = `Total Days: ${numColumnsAded}`;
    updateAndRenderAverages();
    timeMachine();
  }
});

// დროის უკუსვლა

function timeMachine() {
  let dateStr = "";
  while (currentDate.getDay() !== days[currentIndex]) {
    currentDate.setDate(currentDate.getDate() - 1);
  }
  let dayOfWeek = daysOfWeek[days[currentIndex]];
  let dayOfMonth = currentDate.getDate();
  let month = currentDate.toLocaleString("default", { month: "short" });
  dateStr += `${dayOfMonth}${month}${dayOfWeek}\n`;
  currentDate.setDate(currentDate.getDate() - 1);
  if (currentIndex === 0) {
    currentIndex = days.length - 1;
  } else {
    currentIndex = (currentIndex - 1) % days.length;
  }
  return dateStr;
}
