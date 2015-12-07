var RiseVision = RiseVision || {};
RiseVision.ManagementDirectory = {};

RiseVision.ManagementDirectory = (function() {
  "use strict";


  var managementNames = [];
  var counter = 0;
  var $mainContainer = $("#main-container");
  var $managementList = $(".management-directory");
  var $managementCards = $(".cards-management");

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
  function getManagementNames(index, numCols, cells) {
    var management = {};

    management.firstName = getCell(index, cells);
    management.lastName = getCell(++index, cells);
    management.phone = getCell(++index, cells);
    management.room = getCell(++index, cells);
    management.dept = getCell(++index, cells);
    management.position = getCell(++index, cells);


    return management;
  }

  /* Add each event to the events array. */
  function addManagementNames(cells) {
    counter = 0;
    managementNames = [];
    var numCols = getNumColumns(cells),
      len = cells.length,
      management;

    // Skip header and start at first cell of data.
    for (var i = numCols; i < len; i += numCols) {
      management = getManagementNames(i, numCols, cells);
      managementNames.push(management);
    }
  }

  /* Display the events. */
  function displayManagementNames() {



    var managementEntry = null,
      departmentName = null,
      departmentLink = null,
      managementCard = null,
      managementDept = null,
      numManagement = managementNames.length;

        $managementList.empty();
        $managementCards.empty();

      for (var i = 0; i < numManagement; i++) {

        managementEntry = document.createElement("li");
        managementEntry.className = "management-name";
        // departmentName = document.getElementsByClassName("department-name");
        // departmentLink = $("#department-name-id").attr("data-link");
        // suiteName = document.getElementsByClassName("suite-name");
        // doctorName = document.getElementsByClassName("doctor-name");
        managementEntry.textContent = managementNames[i].firstName + " " +managementNames[i].lastName ;
        // departmentLink = advisementNames[i].link;


        // advisementEntry.InnerHTML = departmentEntry.textContent;
        // advisementEntry.className = departmentLink + "-directoryName";
        // advisementEntry.setAttribute("data-link",departmentLink+"-link");
        // advisementEntry.setAttribute("data-breadcrumbs",departmentEntry.textContent);
        // advisementEntry.setAttribute("data-test",departmentLink);

        $managementList.append(managementEntry);

        managementCard = document.createElement("div");
        managementCard.className = "card";
        managementCard.setAttribute("data-name", managementEntry.textContent);
        managementCard.setAttribute("data-dept", managementNames[i].dept);
        managementCard.setAttribute("data-position", managementNames[i].position);
        managementCard.setAttribute("data-phone", managementNames[i].phone);
        managementCard.setAttribute("data-room", managementNames[i].room);





        managementCard.innerHTML = "<h2>"+managementEntry.textContent+"</h2>";

        $managementCards.append(managementCard);

      }
    }

  /*
   *  Public Methods
   */
  function init() {
    var googleSheet = document.getElementById("googleSheetManagementList");
    googleSheet.addEventListener("rise-google-sheet-response", function(e) {
      addManagementNames(e.detail.cells);
      displayManagementNames();
    });
    googleSheet.go();
  }

  return {
    "init": init
  };
})();