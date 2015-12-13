var RiseVision = RiseVision || {};
RiseVision.DepartmentsDirectory = {};

RiseVision.DepartmentsDirectory = (function() {
  "use strict";


  var departments = [];
  var counter = 0;
  var $mainContainer = $("#main-container");
  var $mainList = $(".departments-directory");
  var $departmentCards = $(".cards-departments");

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
    var individualDept = {};

    individualDept.name = getCell(index, cells);
    individualDept.link = getCell(++index, cells);
    individualDept.room = getCell(++index, cells);
    individualDept.image = getCell(++index, cells);


    return individualDept;
  }

  /* Add each event to the events array. */
  function addDepts(cells) {
    counter = 0;
    departments = [];
    var numCols = getNumColumns(cells),
      len = cells.length,
      individualDept;

    // Skip header and start at first cell of data.
    for (var i = numCols; i < len; i += numCols) {
      individualDept = getDepartment(i, numCols, cells);
      departments.push(individualDept);
    }
  }

  /* Display the events. */
  function displayDepts() {



    var departmentEntry = null,
      departmentName = null,
      departmentLink = null,
      departmentCard = null,
      numDepartments = departments.length;

        $mainList.empty();
        $departmentCards.empty();

      for (var i = 0; i < numDepartments; i++) {

        departmentEntry = document.createElement("li");
        departmentEntry.className = "department-name";
        departmentEntry.textContent = departments[i].name;
        departmentLink = departments[i].link;

        departmentEntry.InnerHTML = departmentEntry.textContent;
        departmentEntry.className = departmentLink + "-directoryName";
        departmentEntry.setAttribute("data-link",departmentLink+"-link");
        departmentEntry.setAttribute("data-breadcrumbs",departmentEntry.textContent);
        departmentEntry.setAttribute("data-test",departmentLink);

        $mainList.append(departmentEntry);

        departmentCard = document.createElement("div");
        departmentCard.className = "card department-only";
        departmentCard.setAttribute("data-name", departmentEntry.textContent);
        departmentCard.setAttribute("data-room", departments[i].room);

        var cardImage = departments[i].image
        departmentCard.setAttribute("data-image", cardImage);

        departmentCard.innerHTML = "<img src='"+cardImage+"'><h2>"+departmentEntry.textContent+"</h2>";

        $departmentCards.append(departmentCard);
      }
    }

  /*
   *  Public Methods
   */
  function init() {
    var googleSheet = document.getElementById("googleSheetDepartmentList");
    googleSheet.addEventListener("rise-google-sheet-response", function(e) {
      addDepts(e.detail.cells);
      displayDepts();
    });
    googleSheet.go();
  }

  return {
    "init": init
  };
})();