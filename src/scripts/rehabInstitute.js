var RiseVision = RiseVision || {};
RiseVision.RehabInstituteDirectory = {};

RiseVision.RehabInstituteDirectory = (function() {
  "use strict";


  var rehabInstituteNames = [];
  var counter = 0;
  var $mainContainer = $("#main-container");
  var $rehabInstituteList = $(".rehabInstitute-directory");
  var $rehabInstituteCards = $(".cards-rehabInstitute");

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
  function getRehabInstituteNames(index, numCols, cells) {
    var rehabInstitute = {};

    rehabInstitute.firstName = getCell(index, cells);
    rehabInstitute.lastName = getCell(++index, cells);
    rehabInstitute.phone = getCell(++index, cells);
    rehabInstitute.room = getCell(++index, cells);
    rehabInstitute.dept = getCell(++index, cells);
    rehabInstitute.position = getCell(++index, cells);
    rehabInstitute.image = getCell(++index, cells);


    return rehabInstitute;
  }

  /* Add each event to the events array. */
  function addRehabInstituteNames(cells) {
    counter = 0;
    rehabInstituteNames = [];
    var numCols = getNumColumns(cells),
      len = cells.length,
      rehabInstitute;

    // Skip header and start at first cell of data.
    for (var i = numCols; i < len; i += numCols) {
      rehabInstitute = getRehabInstituteNames(i, numCols, cells);
      rehabInstituteNames.push(rehabInstitute);
    }
  }

  /* Display the events. */
  function displayRehabInstituteNames() {



    var rehabInstituteEntry = null,
      departmentName = null,
      departmentLink = null,
      rehabInstituteCard = null,
     rehabInstituteyDept = null,
      numRehabInstitute = rehabInstituteNames.length;

        $rehabInstituteList.empty();
        $rehabInstituteCards.empty();

      for (var i = 0; i < numRehabInstitute; i++) {

        rehabInstituteEntry = document.createElement("li");
        rehabInstituteEntry.className = "rehabInstitute-name";

        rehabInstituteEntry.textContent = rehabInstituteNames[i].firstName + " " + rehabInstituteNames[i].lastName ;

        $rehabInstituteList.append(rehabInstituteEntry);

        rehabInstituteCard = document.createElement("div");
        rehabInstituteCard.className = "card";
        rehabInstituteCard.setAttribute("data-name", rehabInstituteEntry.textContent);
        rehabInstituteCard.setAttribute("data-dept", rehabInstituteNames[i].dept);
        rehabInstituteCard.setAttribute("data-position", rehabInstituteNames[i].position);
        rehabInstituteCard.setAttribute("data-phone", rehabInstituteNames[i].phone);
        rehabInstituteCard.setAttribute("data-room", rehabInstituteNames[i].room);

        var rehabInstituteImage = rehabInstituteNames[i].image;
        rehabInstituteCard.setAttribute("data-image", rehabInstituteImage);

        rehabInstituteCard.innerHTML = "<img src='"+ rehabInstituteImage +"'><h2>"+rehabInstituteEntry.textContent+"</h2>";

        $rehabInstituteCards.append(rehabInstituteCard);
      }
    }

  /*
   *  Public Methods
   */
  function init() {
    var googleSheet = document.getElementById("googleSheetRehabInstituteList");
    googleSheet.addEventListener("rise-google-sheet-response", function(e) {
      addRehabInstituteNames(e.detail.cells);
      displayRehabInstituteNames();
    });
    googleSheet.go();
  }

  return {
    "init": init
  };
})();