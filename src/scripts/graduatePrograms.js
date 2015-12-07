var RiseVision = RiseVision || {};
RiseVision.GraduateProgramsDirectory = {};

RiseVision.GraduateProgramsDirectory = (function() {
  "use strict";


  var graduateProgramsNames = [];
  var counter = 0;
  var $mainContainer = $("#main-container");
  var $graduateProgramsList = $(".graduatePrograms-directory");
  var $graduateProgramsCards = $(".cards-graduatePrograms");

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
  function getGraduateProgramsNames(index, numCols, cells) {
    var graduatePrograms = {};

    graduatePrograms.firstName = getCell(index, cells);
    graduatePrograms.lastName = getCell(++index, cells);
    graduatePrograms.phone = getCell(++index, cells);
    graduatePrograms.room = getCell(++index, cells);
    graduatePrograms.dept = getCell(++index, cells);
    graduatePrograms.position = getCell(++index, cells);


    return graduatePrograms;
  }

  /* Add each event to the events array. */
  function addGraduateProgramsNames(cells) {
    counter = 0;
    graduateProgramsNames = [];
    var numCols = getNumColumns(cells),
      len = cells.length,
      graduatePrograms;

    // Skip header and start at first cell of data.
    for (var i = numCols; i < len; i += numCols) {
      graduatePrograms = getGraduateProgramsNames(i, numCols, cells);
      graduateProgramsNames.push(graduatePrograms);
    }
  }

  /* Display the events. */
  function displayGraduateProgramsNames() {



    var graduateProgramsEntry = null,
      departmentName = null,
      departmentLink = null,
      graduateProgramsCard = null,
      graduateProgramsDept = null,
      numGraduatePrograms = graduateProgramsNames.length;

        $graduateProgramsList.empty();
        $graduateProgramsCards.empty();

      for (var i = 0; i < numGraduatePrograms; i++) {

        graduateProgramsEntry = document.createElement("li");
        graduateProgramsEntry.className = "graduateProgram-name";
        // departmentName = document.getElementsByClassName("department-name");
        // departmentLink = $("#department-name-id").attr("data-link");
        // suiteName = document.getElementsByClassName("suite-name");
        // doctorName = document.getElementsByClassName("doctor-name");
        graduateProgramsEntry.textContent = graduateProgramsNames[i].firstName + " " +graduateProgramsNames[i].lastName ;
        // departmentLink = advisementNames[i].link;


        // advisementEntry.InnerHTML = departmentEntry.textContent;
        // advisementEntry.className = departmentLink + "-directoryName";
        // advisementEntry.setAttribute("data-link",departmentLink+"-link");
        // advisementEntry.setAttribute("data-breadcrumbs",departmentEntry.textContent);
        // advisementEntry.setAttribute("data-test",departmentLink);

        $graduateProgramsList.append(graduateProgramsEntry);

        graduateProgramsCard = document.createElement("div");
        graduateProgramsCard.className = "card";
        graduateProgramsCard.setAttribute("data-name", graduateProgramsEntry.textContent);
        graduateProgramsCard.setAttribute("data-dept", graduateProgramsNames[i].dept);
        graduateProgramsCard.setAttribute("data-position", graduateProgramsNames[i].position);
        graduateProgramsCard.setAttribute("data-phone", graduateProgramsNames[i].phone);
        graduateProgramsCard.setAttribute("data-room", graduateProgramsNames[i].room);





        graduateProgramsCard.innerHTML = "<h2>"+graduateProgramsEntry.textContent+"</h2>";

        $graduateProgramsCards.append(graduateProgramsCard);

      }
    }

  /*
   *  Public Methods
   */
  function init() {
    var googleSheet = document.getElementById("googleSheetGraduateProgramsList");
    googleSheet.addEventListener("rise-google-sheet-response", function(e) {
      addGraduateProgramsNames(e.detail.cells);
      displayGraduateProgramsNames();
    });
    googleSheet.go();
  }

  return {
    "init": init
  };
})();