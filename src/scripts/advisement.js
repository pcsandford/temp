var RiseVision = RiseVision || {};
RiseVision.AdvisementDirectory = {};

RiseVision.AdvisementDirectory = (function() {
  "use strict";


  var advisementNames = [];
  var counter = 0;
  var $mainContainer = $("#main-container");
  var $advisementList = $(".undergraduateAdvisement-directory");
  var $advisementCards = $(".cards-undergraduateAdvisement");

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
  function getAdvisementNames(index, numCols, cells) {
    var advisementDept = {};

    advisementDept.firstName = getCell(index, cells);
    advisementDept.lastName = getCell(++index, cells);
    advisementDept.phone = getCell(++index, cells);
    advisementDept.room = getCell(++index, cells);
    advisementDept.dept = getCell(++index, cells);
    advisementDept.position = getCell(++index, cells);


    return advisementDept;
  }

  /* Add each event to the events array. */
  function addAdvismentNames(cells) {
    counter = 0;
    advisementNames = [];
    var numCols = getNumColumns(cells),
      len = cells.length,
      advisementDept;

    // Skip header and start at first cell of data.
    for (var i = numCols; i < len; i += numCols) {
      advisementDept = getAdvisementNames(i, numCols, cells);
      advisementNames.push(advisementDept);
    }
  }

  /* Display the events. */
  function displayAdvisementNames() {



    var advisementEntry = null,
      departmentName = null,
      departmentLink = null,
      advisementCard = null,
      advisementDept = null,
      numDepartments = advisementNames.length;

        $advisementList.empty();
        $advisementCards.empty();

      for (var i = 0; i < numDepartments; i++) {

        advisementEntry = document.createElement("li");
        advisementEntry.className = "department-name";
        // departmentName = document.getElementsByClassName("department-name");
        // departmentLink = $("#department-name-id").attr("data-link");
        // suiteName = document.getElementsByClassName("suite-name");
        // doctorName = document.getElementsByClassName("doctor-name");
        advisementEntry.textContent = advisementNames[i].firstName + " " +advisementNames[i].lastName ;
        // departmentLink = advisementNames[i].link;


        // advisementEntry.InnerHTML = departmentEntry.textContent;
        // advisementEntry.className = departmentLink + "-directoryName";
        // advisementEntry.setAttribute("data-link",departmentLink+"-link");
        // advisementEntry.setAttribute("data-breadcrumbs",departmentEntry.textContent);
        // advisementEntry.setAttribute("data-test",departmentLink);

        $advisementList.append(advisementEntry);

        advisementCard = document.createElement("div");
        advisementCard.className = "card";
        advisementCard.setAttribute("data-name", advisementEntry.textContent);
        advisementCard.setAttribute("data-dept", advisementNames[i].dept);
        advisementCard.setAttribute("data-position", advisementNames[i].position);
        advisementCard.setAttribute("data-phone", advisementNames[i].phone);
        advisementCard.setAttribute("data-room", advisementNames[i].room);





        advisementCard.innerHTML = "<h2>"+advisementEntry.textContent+"</h2>";

        $advisementCards.append(advisementCard);

      }
    }

  /*
   *  Public Methods
   */
  function init() {
    var googleSheet = document.getElementById("googleSheetAdvisementList");
    googleSheet.addEventListener("rise-google-sheet-response", function(e) {
      addAdvismentNames(e.detail.cells);
      displayAdvisementNames();
    });
    googleSheet.go();
  }

  return {
    "init": init
  };
})();