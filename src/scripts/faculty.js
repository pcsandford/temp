var RiseVision = RiseVision || {};
RiseVision.FacultyDirectory = {};

RiseVision.FacultyDirectory = (function() {
  "use strict";


  var faculty = [];
  var counter = 0;
  var $mainContainer = $("#main-container")
  var $mainList = $(".faculty-directory")

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
  function getFaculty(index, numCols, cells) {
    var individualFaculty = {};

    individualFaculty.firstName = getCell(index, cells);
    individualFaculty.lastName = getCell(++index, cells);
    // individualDepartment.link = getCell(++index, cells);


    return individualFaculty;
  }

  /* Add each event to the events array. */
  function addFaculty(cells) {
    counter = 0;
    faculty = [];
    var numCols = getNumColumns(cells),
      len = cells.length,
      individualFaculty;

    // Skip header and start at first cell of data.
    for (var i = numCols; i < len; i += numCols) {
      individualFaculty = getFaculty(i, numCols, cells);
      faculty.push(individualFaculty);
    }
  }

  /* Display the events. */
  function displayFaculty() {



    var facultyEntry = null,
      facultyFirstName = null,
      facultySecondName = null,
      departmentLink = null,
      numFaculty = faculty.length;

        $mainList.empty();

      for (var i = 0; i < numFaculty; i++) {

        facultyEntry = document.createElement("li");
        facultyEntry.className = "faculty-name";
        // departmentName = document.getElementsByClassName("department-name");
        // departmentLink = $("#department-name-id").attr("data-link");
        // suiteName = document.getElementsByClassName("suite-name");
        // doctorName = document.getElementsByClassName("doctor-name");
        facultyFirstName = faculty[i].firstName;
        facultySecondName = faculty[i].lastName;
        facultyEntry.textContent = facultyFirstName + " " + facultySecondName;
        // departmentLink = mainDepartments[i].link
        // departmentLink.textContent = departments[i].link;




        facultyEntry.InnerHTML = facultyEntry.textContent;
        // departmentEntry.className = "main-directory-"+departmentLink;
        // departmentEntry.setAttribute("data-link",departmentLink+"-link");
        // departmentEntry.setAttribute("data-breadcrumbs",departmentEntry.textContent);
        // departmentEntry.setAttribute("data-test",departmentLink);

        $mainList.append(facultyEntry);
      }
    }

  /*
   *  Public Methods
   */
  function init() {
    var googleSheet = document.getElementById("googleSheetFacultyList");
    googleSheet.addEventListener("rise-google-sheet-response", function(e) {
      addFaculty(e.detail.cells);
      displayFaculty();
    });
    googleSheet.go();
  }

  return {
    "init": init
  };
})();