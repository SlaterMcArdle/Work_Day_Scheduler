# homework-05
3rd Party API Homework - Work Day Scheduler

The goal of this homework was to use 3rd party APIs including Bootstrap, jQuery and moment.js to create a work day scheduler.

The functioning site can be found here: 
https://windwalker-92.github.io/homework-05/


The functional requirements were as follows:
GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
    - This was acheived through moment.js
WHEN I scroll down
THEN I am presented with timeblocks for standard business hours
    - This was acheived mostly through jQuery
WHEN I view the timeblocks for that day
THEN each timeblock is color coded to indicate whether it is in the past, present, or future
    - This was acheived through moment.js to get the time and jQuery to update the CSS class of the element
WHEN I click into a timeblock
THEN I can enter an event
    - This was acheived using a text input
WHEN I click the save button for that timeblock
THEN the text for that event is saved in local storage
    - This was acheived using event listeners, jQuery and the localStorage API
WHEN I refresh the page
THEN the saved events persist
    - This was acheived using event listeners, jQuery and the localStorage API

Find a screenshot below.
![ScreenShot](./Assets/screenshot_01.png)
