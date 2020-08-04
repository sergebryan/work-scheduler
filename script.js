var $curDay = $("#currentDay");
var $time = $(".time-block");
var $setInArea = $(".schedule");
var workingList = [];
var cDate = moment().format("dddd, MMMM Do");
var runningHour = moment().format("H");

function initializeSchedule() {
  $time.each(function() {
    var $thisBlock = $(this);
    var myHrBlock = parseInt($thisBlock.attr("data-hour"));
    var todoObj = 	{
					hour: myHrBlock,
					text: "",
					} 
    workingList.push(todoObj);
  });
  localStorage.setItem("todos", JSON.stringify(workingList));
 }
function setUpTimeBlocks() {
    $time.each(function() {
      var $thisBlock = $(this);
      var myHrBlock = parseInt($thisBlock.attr("data-hour"));

      if (myHrBlock == runningHour) {
        $thisBlock.addClass("present").removeClass("past future");
      }

      if (myHrBlock < runningHour) {
        $thisBlock.addClass("past").removeClass("present future");
      }

      if (myHrBlock > runningHour) {
        $thisBlock.addClass("future").removeClass("past present");
      }
    });
}

function renderSchedule() {
  workingList = localStorage.getItem("todos");
  workingList = JSON.parse(workingList);

  for (var i = 0; i < workingList.length; i++) {
    var itemHour = workingList[i].hour;
    var itemText = workingList[i].text; 
    $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
  }
  console.log(workingList);
}

function saveHandler() {
  var $thisBlock = $(this).parent();
  var hourToUpdate = $(this).parent().attr("data-hour");
  var itemToAdd = (($(this).parent()).children("textarea")).val();
  
  for (var j = 0; j < workingList.length; j++) {
    if (workingList[j].hour == hourToUpdate) {
        workingList[j].text = itemToAdd;
    }
  }
  localStorage.setItem("todos", JSON.stringify(workingList));
  renderSchedule();
}

$(document).ready(function() {
  setUpTimeBlocks();
  if(localStorage.getItem("todos")) {
      initializeSchedule();
  }
   $curDay.text(cDate);
  renderSchedule();
  $setInArea.on("click", "button", saveHandler);
  
});
