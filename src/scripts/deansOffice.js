var RiseVision = RiseVision || {};
RiseVision.DeansOfficeDirectory = {};

RiseVision.DeansOfficeDirectory = (function() {
  "use strict";


  var deansOfficeNames = [];
  var counter = 0;
  var $mainContainer = $("#main-container");
  var $deansOfficeList = $(".deansOffice-directory");
  var $deansOfficeCards = $(".cards-deansOffice");

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
  function getDeansOfficeNames(index, numCols, cells) {
    var deansOffice = {};

    deansOffice.firstName = getCell(index, cells);
    deansOffice.lastName = getCell(++index, cells);
    deansOffice.phone = getCell(++index, cells);
    deansOffice.room = getCell(++index, cells);
    deansOffice.dept = getCell(++index, cells);
    deansOffice.position = getCell(++index, cells);
    deansOffice.image = getCell(++index, cells);


    return deansOffice;
  }

  /* Add each event to the events array. */
  function addDeansOfficeNames(cells) {
    counter = 0;
    deansOfficeNames = [];
    var numCols = getNumColumns(cells),
      len = cells.length,
      deansOffice;

    // Skip header and start at first cell of data.
    for (var i = numCols; i < len; i += numCols) {
      deansOffice = getDeansOfficeNames(i, numCols, cells);
      deansOfficeNames.push(deansOffice);
    }
  }

  /* Display the events. */
  function displayDeansOfficeNames() {



    var deansOfficeEntry = null,
      departmentName = null,
      departmentLink = null,
      deansOfficeCard = null,
      deansOfficeDept = null,
      numDeansOffice = deansOfficeNames.length;

        $deansOfficeList.empty();
        $deansOfficeCards.empty();

      for (var i = 0; i < numDeansOffice; i++) {

        deansOfficeEntry = document.createElement("li");
        deansOfficeEntry.className = "deansOffice-name";
        deansOfficeEntry.textContent = deansOfficeNames[i].firstName + " " +deansOfficeNames[i].lastName ;

        $deansOfficeList.append(deansOfficeEntry);

        deansOfficeCard = document.createElement("div");
        deansOfficeCard.className = "card";
        deansOfficeCard.setAttribute("data-name", deansOfficeEntry.textContent);
        deansOfficeCard.setAttribute("data-dept", deansOfficeNames[i].dept);
        deansOfficeCard.setAttribute("data-position", deansOfficeNames[i].position);
        deansOfficeCard.setAttribute("data-phone", deansOfficeNames[i].phone);
        deansOfficeCard.setAttribute("data-room", deansOfficeNames[i].room);

        var deansOfficeImage = deansOfficeNames[i].image;
        deansOfficeCard.setAttribute("data-image", deansOfficeImage);

        deansOfficeCard.innerHTML = "<img src='"+ deansOfficeImage +"'><h2>"+deansOfficeEntry.textContent+"</h2>";

        $deansOfficeCards.append(deansOfficeCard);

      }
    }

  /*
   *  Public Methods
   */
  function init() {
    var googleSheet = document.getElementById("googleSheetDeansOfficeList");
    googleSheet.addEventListener("rise-google-sheet-response", function(e) {
      addDeansOfficeNames(e.detail.cells);
      displayDeansOfficeNames();
    });
    googleSheet.go();
  }

  return {
    "init": init
  };
})();