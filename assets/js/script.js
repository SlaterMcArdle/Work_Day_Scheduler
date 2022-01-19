// #region GLOBAL VARIABLES
// A bootstrap save icon to put in our button
const saveIcon = '<i class="bi bi-save"></i>';
/* A possible future feature icon stored here 
const savedIcon = '<i class="bi bi-save-fill"></i>'; */
// Globally save the current date to keep between functions
const currentDate = moment().format('LL');
// Keep the task list for localstorage global
let taskList;
// #endregion
// Get the current date and populate it in the jumbotron. This doesn't need to be a function, but it cleans up my code visually for me.
function populateCurrentDate() {
    $('#currentDay').text(currentDate);
}
function generateDay() {
    const localHour = 12/* moment().hour(); */
    for (let i = 9; i < 18; i++) {
        let hour = moment().set('hour', i).set('minute', 0).format('LT')
        let taskColor;
        if (i < localHour) {
            taskColor = 'past';
        } else if (i == localHour) {
            taskColor = 'present';   
        } else {
            taskColor = 'future';
        }
        generateTimeBlock(i, taskColor, hour);
    }
}
// Generate the hour timeslot.
// Take in the id incrementor to systematically individualize the element IDs
//  Take in the time color using conditional logic from generateDay().
//  Have the hour passed in since there's already a for loop to iterate through them in generateDay()
function generateTimeBlock (id_incrementor, timeColor, hour) {
    // Define the bootstrap classes that will style different prts of the time block
    const timeDivClassList = "col-1 hour text-nowrap";
    const taskDivClassList = "col-10  " + timeColor;
    const buttonDivClassList = "col-1 saveBtn btn button-icon d-flex justify-content-center align-items-center";
    // Create the time block elements using jQuery
    let blockDiv = $("<div></div>").addClass("row col-12 time-block").attr('id', id_incrementor);
    let timeIndicator = $("<div></div>").addClass(timeDivClassList).attr('id', "time-" + id_incrementor).text(hour);
    let taskDiv = $("<textarea></textarea>").addClass(taskDivClassList).attr('id', "input-" + id_incrementor);
    let lockTab = $("<div></div>").addClass(buttonDivClassList).attr({'id': "button-" + id_incrementor, 'data-value': id_incrementor}).append(saveIcon);
    // Add the time
    // Add the components into a single div
    blockDiv.append(timeIndicator, taskDiv, lockTab);
    // Add the time block to the page
    $("#timeBlockContainer").append(blockDiv);
}
// Reach into local storage and check if there's any stored tasks for the current date. If so, populate them in their time slots.
function loadStoredTasks() {
    taskList = JSON.parse(localStorage.getItem(currentDate));
    if (taskList != null) {
        for (let i = 0; i < taskList.length; i++) {
            $('#input-'+ taskList[i]['time']).text(taskList[i]['content']);
        }
    }
}

// Load the current date
populateCurrentDate();
// Create the slots
generateDay();
// Fill the slots with any stored data
loadStoredTasks();
console.log(taskList);

// Create an event listener to check for save button clicks
$('#timeBlockContainer').on('click', '.bi', function(e) {
    // Capture the id incrementor value stored in the save div
    let existingHour = e.target.parentElement.dataset.value;
    // Use it to get the correct text input value
    let newContent = $('#input-' + existingHour).val();
    // Declare the index variable ar function scope
    let existingIndex;
    // If there's data stored in local storage, check it to see if there's an existing object that matches the timeslot we're trying to save to.
    // If there is, get the index
    // The following sets of if statemente could use some streamlining.
    if (taskList != null) {
        existingIndex = taskList.findIndex(x => x.time == existingHour);
    } else {
        existingIndex = -1;
    }
    console.log(existingIndex);
    // If there's a valid index, reassign the object. If not, add the object to the array.
    if (existingIndex != -1) {
        taskList[existingIndex] = {'time': existingHour, 'content': newContent};
    } else if (newContent != '') {
        taskList.push({'time': existingHour, 'content': $('#input-' + existingHour).val()});
    }
    // Store the updated task list in local storage for the current date
    localStorage.setItem(currentDate, JSON.stringify(taskList));
});