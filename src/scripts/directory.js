var RiseVision = RiseVision || {};
RiseVision.MainDirectory = {};

RiseVision.MainDirectory = (function() {
  "use strict";


  var mainDepartments = [];
  var counter = 0;
  var $mainContainer = $("#main-container");
  var $mainList = $(".main-directory");
  var $mainCards = $(".cards-mainList");

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
  function getDepartment(index, numCols, cells) {
    var individualMainDepartment = {};

    individualMainDepartment.name = getCell(index, cells);
    individualMainDepartment.link = getCell(++index, cells);


    return individualMainDepartment;
  }

  /* Add each event to the events array. */
  function addDepartments(cells) {
    counter = 0;
    mainDepartments = [];
    var numCols = getNumColumns(cells),
      len = cells.length,
      individualMainDepartment;

    // Skip header and start at first cell of data.
    for (var i = numCols; i < len; i += numCols) {
      individualMainDepartment = getDepartment(i, numCols, cells);
      mainDepartments.push(individualMainDepartment);
    }
  }

  /* Display the events. */
  function displayDepartments() {



    var departmentEntry = null,
      departmentName = null,
      departmentLink = null,
      mainDepartmentCard = null,
      numDepartments = mainDepartments.length;

        $mainList.empty();
        $mainCards.empty();

      for (var i = 0; i < numDepartments; i++) {
        // create the list
        departmentEntry = document.createElement("li");
        departmentEntry.className = "department-name";
        // departmentName = document.getElementsByClassName("department-name");
        // departmentLink = $("#department-name-id").attr("data-link");
        // suiteName = document.getElementsByClassName("suite-name");
        // doctorName = document.getElementsByClassName("doctor-name");
        departmentEntry.textContent = mainDepartments[i].name;
        departmentLink = mainDepartments[i].link
        // departmentLink.textContent = departments[i].link;





        departmentEntry.InnerHTML = departmentEntry.textContent;
        departmentEntry.className = "main-directory-"+departmentLink;
        departmentEntry.setAttribute("data-link",departmentLink+"-link");
        departmentEntry.setAttribute("data-breadcrumbs",departmentEntry.textContent);
        departmentEntry.setAttribute("data-test",departmentLink);

        $mainList.append(departmentEntry);
      }
    }

  /*
   *  Public Methods
   */
  function init() {
    var googleSheet = document.getElementById("googleSheetMainList");
    googleSheet.addEventListener("rise-google-sheet-response", function(e) {
      addDepartments(e.detail.cells);
      displayDepartments();
    });
    googleSheet.go();
  }

  return {
    "init": init
  };
})();