var RiseVision = RiseVision || {};
RiseVision.TechDirectory = {};

RiseVision.TechDirectory = (function() {
  "use strict";


  var techNames = [];
  var counter = 0;
  var $mainContainer = $("#main-container");
  var $techList = $(".tech-directory");
  var $techCards = $(".cards-technology");

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
  function getTechNames(index, numCols, cells) {
    var tech = {};

    tech.firstName = getCell(index, cells);
    tech.lastName = getCell(++index, cells);
    tech.phone = getCell(++index, cells);
    tech.room = getCell(++index, cells);
    tech.dept = getCell(++index, cells);
    tech.position = getCell(++index, cells);
    tech.image = getCell(++index, cells);


    return tech;
  }

  /* Add each event to the events array. */
  function addTechNames(cells) {
    counter = 0;
    techNames = [];
    var numCols = getNumColumns(cells),
      len = cells.length,
      tech;

    // Skip header and start at first cell of data.
    for (var i = numCols; i < len; i += numCols) {
      tech = getTechNames(i, numCols, cells);
      techNames.push(tech);
    }
  }

  /* Display the events. */
  function displayTechNames() {



    var techEntry = null,
      departmentName = null,
      departmentLink = null,
      techCard = null,
      techDept = null,
      numTech = techNames.length;

        $techList.empty();
        $techCards.empty();

      for (var i = 0; i < numTech; i++) {

        techEntry = document.createElement("li");
        techEntry.className = "tech-name";
        techEntry.textContent = techNames[i].firstName + " " +techNames[i].lastName ;

        $techList.append(techEntry);

        techCard = document.createElement("div");
        techCard.className = "card";
        techCard.setAttribute("data-name", techEntry.textContent);
        techCard.setAttribute("data-dept", techNames[i].dept);
        techCard.setAttribute("data-position", techNames[i].position);
        techCard.setAttribute("data-phone", techNames[i].phone);
        techCard.setAttribute("data-room", techNames[i].room);

        var techImage = techNames[i].image;
        techCard.setAttribute("data-image", techImage);

        techCard.innerHTML = "<img src='"+ techImage +"'><h2>"+techEntry.textContent+"</h2>";

        $techCards.append(techCard);
      }
    }

  /*
   *  Public Methods
   */
  function init() {
    var googleSheet = document.getElementById("googleSheetTechList");
    googleSheet.addEventListener("rise-google-sheet-response", function(e) {
      addTechNames(e.detail.cells);
      displayTechNames();
    });
    googleSheet.go();
  }

  return {
    "init": init
  };
})();