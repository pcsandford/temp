var RiseVision = RiseVision || {};
RiseVision.RehabCounsellingDirectory = {};

RiseVision.RehabCounsellingDirectory = (function() {
  "use strict";


  var rehabCounsellingNames = [];
  var counter = 0;
  var $mainContainer = $("#main-container");
  var $rehabCounsellingList = $(".rehabCounselling-directory");
  var $rehabCounsellingCards = $(".cards-rehabCounselling");

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
  function getRehabCounsellingNames(index, numCols, cells) {
    var rehabCounselling = {};

    rehabCounselling.firstName = getCell(index, cells);
    rehabCounselling.lastName = getCell(++index, cells);
    rehabCounselling.phone = getCell(++index, cells);
    rehabCounselling.room = getCell(++index, cells);
    rehabCounselling.dept = getCell(++index, cells);
    rehabCounselling.position = getCell(++index, cells);
    rehabCounselling.image = getCell(++index, cells);

    return rehabCounselling;
  }

  /* Add each event to the events array. */
  function addRehabCounsellingNames(cells) {
    counter = 0;
    rehabCounsellingNames = [];
    var numCols = getNumColumns(cells),
      len = cells.length,
      rehabCounselling;

    // Skip header and start at first cell of data.
    for (var i = numCols; i < len; i += numCols) {
      rehabCounselling = getRehabCounsellingNames(i, numCols, cells);
      rehabCounsellingNames.push(rehabCounselling);
    }
  }

  /* Display the events. */
  function displayRehabCounsellingNames() {



    var rehabCounsellingEntry = null,
      departmentName = null,
      departmentLink = null,
      rehabCounsellingCard = null,
     rehabCounsellingDept = null,
      numRehabCounselling = rehabCounsellingNames.length;

        $rehabCounsellingList.empty();
        $rehabCounsellingCards.empty();

      for (var i = 0; i < numRehabCounselling; i++) {

        rehabCounsellingEntry = document.createElement("li");
        rehabCounsellingEntry.className = "rehabCounselling-name";

        rehabCounsellingEntry.textContent = rehabCounsellingNames[i].firstName + " " + rehabCounsellingNames[i].lastName ;

        $rehabCounsellingList.append(rehabCounsellingEntry);

        rehabCounsellingCard = document.createElement("div");
        rehabCounsellingCard.className = "card";
        rehabCounsellingCard.setAttribute("data-name", rehabCounsellingEntry.textContent);
        rehabCounsellingCard.setAttribute("data-dept", rehabCounsellingNames[i].dept);
        rehabCounsellingCard.setAttribute("data-position", rehabCounsellingNames[i].position);
        rehabCounsellingCard.setAttribute("data-phone", rehabCounsellingNames[i].phone);
        rehabCounsellingCard.setAttribute("data-room", rehabCounsellingNames[i].room);

        var rehabCounsellingImage = rehabCounsellingNames[i].image;
        rehabCounsellingCard.setAttribute("data-image", rehabCounsellingImage);

        rehabCounsellingCard.innerHTML = "<img src='"+ rehabCounsellingImage +"'><h2>"+rehabCounsellingEntry.textContent+"</h2>";

        $rehabCounsellingCards.append(rehabCounsellingCard);
      }
    }

  /*
   *  Public Methods
   */
  function init() {
    var googleSheet = document.getElementById("googleSheetRehabCounsellingList");
    googleSheet.addEventListener("rise-google-sheet-response", function(e) {
      addRehabCounsellingNames(e.detail.cells);
      displayRehabCounsellingNames();
    });
    googleSheet.go();
  }

  return {
    "init": init
  };
})();