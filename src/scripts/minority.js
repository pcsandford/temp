var RiseVision = RiseVision || {};
RiseVision.MinorityDirectory = {};

RiseVision.MinorityDirectory = (function() {
  "use strict";


  var minorityNames = [];
  var counter = 0;
  var $mainContainer = $("#main-container");
  var $minorityList = $(".minority-directory");
  var $minorityCards = $(".cards-minority");

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
  function getMinorityNames(index, numCols, cells) {
    var minority = {};

    minority.firstName = getCell(index, cells);
    minority.lastName = getCell(++index, cells);
    minority.phone = getCell(++index, cells);
    minority.room = getCell(++index, cells);
    minority.dept = getCell(++index, cells);
    minority.position = getCell(++index, cells);


    return minority;
  }

  /* Add each event to the events array. */
  function addMinorityNames(cells) {
    counter = 0;
    minorityNames = [];
    var numCols = getNumColumns(cells),
      len = cells.length,
      minority;

    // Skip header and start at first cell of data.
    for (var i = numCols; i < len; i += numCols) {
      minority = getMinorityNames(i, numCols, cells);
      minorityNames.push(minority);
    }
  }

  /* Display the events. */
  function displayMinorityNames() {



    var minorityEntry = null,
      departmentName = null,
      departmentLink = null,
      minorityCard = null,
      minorityDept = null,
      numMinority = minorityNames.length;

        $minorityList.empty();
        $minorityCards.empty();

      for (var i = 0; i < numMinority; i++) {

        minorityEntry = document.createElement("li");
        minorityEntry.className = "minority-name";
        // departmentName = document.getElementsByClassName("department-name");
        // departmentLink = $("#department-name-id").attr("data-link");
        // suiteName = document.getElementsByClassName("suite-name");
        // doctorName = document.getElementsByClassName("doctor-name");
        minorityEntry.textContent = minorityNames[i].firstName + " " +minorityNames[i].lastName ;
        // departmentLink = advisementNames[i].link;


        // advisementEntry.InnerHTML = departmentEntry.textContent;
        // advisementEntry.className = departmentLink + "-directoryName";
        // advisementEntry.setAttribute("data-link",departmentLink+"-link");
        // advisementEntry.setAttribute("data-breadcrumbs",departmentEntry.textContent);
        // advisementEntry.setAttribute("data-test",departmentLink);

        $minorityList.append(minorityEntry);

        minorityCard = document.createElement("div");
        minorityCard.className = "card";
        minorityCard.setAttribute("data-name", minorityEntry.textContent);
        minorityCard.setAttribute("data-dept", minorityNames[i].dept);
        minorityCard.setAttribute("data-position", minorityNames[i].position);
        minorityCard.setAttribute("data-phone", minorityNames[i].phone);
        minorityCard.setAttribute("data-room", minorityNames[i].room);





        minorityCard.innerHTML = "<h2>"+minorityEntry.textContent+"</h2>";

        $minorityCards.append(minorityCard);
      }
    }

  /*
   *  Public Methods
   */
  function init() {
    var googleSheet = document.getElementById("googleSheetMinorityList");
    googleSheet.addEventListener("rise-google-sheet-response", function(e) {
      addMinorityNames(e.detail.cells);
      displayMinorityNames();
    });
    googleSheet.go();
  }

  return {
    "init": init
  };
})();