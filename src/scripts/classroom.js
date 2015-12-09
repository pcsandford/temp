var RiseVision = RiseVision || {};
RiseVision.ClassroomsDirectory = {};

RiseVision.ClassroomsDirectory = (function() {
  "use strict";


  var classrooms = [];
  var counter = 0;
  var $mainContainer = $("#main-container");
  var $mainList = $(".classroom-directory");
  var $cardsClassroom = $(".cards-classrooms");
  // var $departmentCards = $(".cards-departments");

  /*
   *  Private Methods
   */

  /* Return total number of columns in data. */
  function getNumColumns(cells) {
    var len = cells.length,
      currentRow = 0,
      previousRow = 0,
      totalCols = 0;

    for (var i = 0; i <= len; i++) {
      currentRow = parseInt(cells[i].gs$cell.row, 10);

      if (i === 0) {
        previousRow = currentRow;
      }

      if (currentRow === previousRow) {
        totalCols++;
      }
      else {
        break;
      }
    }

    return totalCols;
  }

  /* Return a single cell of data. */
  function getCell(index, cells) {
    return cells[index] ? cells[index].gs$cell.$t : "";
  }

  /* Return an individual event as an object. */
  function getClassrooms(index, numCols, cells) {
    var individualClassroom = {};

    individualClassroom.name = getCell(index, cells);
    individualClassroom.room = getCell(++index, cells);


    return individualClassroom;
  }

  /* Add each event to the events array. */
  function addClassrooms(cells) {
    counter = 0;
    classrooms = [];
    var numCols = getNumColumns(cells),
      len = cells.length,
      individualClassroom;

    // Skip header and start at first cell of data.
    for (var i = numCols; i < len; i += numCols) {
      individualClassroom = getClassrooms(i, numCols, cells);
      classrooms.push(individualClassroom);
    }
  }

  /* Display the events. */
  function displayClassrooms() {



    var classroomEntry = null,
      classroomName = null,
      departmentLink = null,
      classroomCard = null,
      numClassrooms = classrooms.length;

        $mainList.empty();
        $cardsClassroom.empty();

      for (var i = 0; i < numClassrooms; i++) {

        classroomEntry = document.createElement("li");
        classroomEntry.className = "classroom-name";
        classroomEntry.textContent = classrooms[i].name;

        classroomEntry.InnerHTML = classroomEntry.textContent;

        $mainList.append(classroomEntry);

        classroomCard = document.createElement("div");
        classroomCard.className = "card department-only";
        classroomCard.setAttribute("data-name", classroomEntry.textContent);
        classroomCard.setAttribute("data-room", classrooms[i].room);

        classroomCard.innerHTML = "<h2>"+classroomEntry.textContent+"</h2>";

        $cardsClassroom.append(classroomCard);

      }
    }

  /*
   *  Public Methods
   */
  function init() {
    var googleSheet = document.getElementById("googleSheetClassroomList");
    googleSheet.addEventListener("rise-google-sheet-response", function(e) {
      addClassrooms(e.detail.cells);
      displayClassrooms();
    });
    googleSheet.go();
  }

  return {
    "init": init
  };
})();