var RiseVision = RiseVision || {};
RiseVision.ClassroomsDirectory = {};

RiseVision.ClassroomsDirectory = (function() {
  "use strict";


  var classrooms = [];
  var counter = 0;
  var $mainContainer = $("#main-container");
  var $mainList = $(".classroom-directory");
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
    // individualDept.link = getCell(++index, cells);


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
      departmentCard = null,
      numClassrooms = classrooms.length;

        $mainList.empty();
        // $departmentCards.empty();

      for (var i = 0; i < numClassrooms; i++) {

        classroomEntry = document.createElement("li");
        classroomEntry.className = "classroom-name";
        // departmentName = document.getElementsByClassName("department-name");
        // departmentLink = $("#department-name-id").attr("data-link");
        // suiteName = document.getElementsByClassName("suite-name");
        // doctorName = document.getElementsByClassName("doctor-name");
        classroomEntry.textContent = classrooms[i].name;
        // departmentLink = departments[i].link;
        // departmentLink = mainDepartments[i].link
        // departmentLink.textContent = departments[i].link;

        // <li class="undergraduateAdvisement-directoryName" data-link="departments-detail-link" data-breadcrumbs="Undergraduate Advisement">Undergraduate Advisement</li>


        classroomEntry.InnerHTML = classroomEntry.textContent;
        // departmentEntry.className = departmentLink + "-directoryName";
        // departmentEntry.setAttribute("data-link",departmentLink+"-link");
        // departmentEntry.setAttribute("data-breadcrumbs",departmentEntry.textContent);
        // departmentEntry.setAttribute("data-test",departmentLink);

        $mainList.append(classroomEntry);

        // departmentCard = document.createElement("div");
        // departmentCard.className = "card";
        // departmentCard.setAttribute("data-name", departmentEntry.textContent);
        // departmentCard.innerHTML = "<h2>"+departmentEntry.textContent+"</h2>";

        // $departmentCards.append(departmentCard);

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