var RiseVision = RiseVision || {};
RiseVision.BehaviourDirectory = {};

RiseVision.BehaviourDirectory = (function() {
  "use strict";


  var behaviourNames = [];
  var counter = 0;
  var $mainContainer = $("#main-container");
  var $behaviourList = $(".behaviour-directory");
  var $behaviourCards = $(".cards-behaviour");

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
  function getBehaviourNames(index, numCols, cells) {
    var behaviour = {};

    behaviour.firstName = getCell(index, cells);
    behaviour.lastName = getCell(++index, cells);
    behaviour.phone = getCell(++index, cells);
    behaviour.room = getCell(++index, cells);
    behaviour.dept = getCell(++index, cells);
    behaviour.position = getCell(++index, cells);
    behaviour.image = getCell(++index, cells);


    return behaviour;
  }

  /* Add each event to the events array. */
  function addBehaviourNames(cells) {
    counter = 0;
    behaviourNames = [];
    var numCols = getNumColumns(cells),
      len = cells.length,
      behaviour;

    // Skip header and start at first cell of data.
    for (var i = numCols; i < len; i += numCols) {
      behaviour = getBehaviourNames(i, numCols, cells);
      behaviourNames.push(behaviour);
    }
  }

  /* Display the events. */
  function displayBehaviourNames() {



    var behaviourEntry = null,
      departmentName = null,
      departmentLink = null,
      behaviourCard = null,
      behaviourDept = null,
      numBehaviour = behaviourNames.length;

        $behaviourList.empty();
        $behaviourCards.empty();

      for (var i = 0; i < numBehaviour; i++) {

        behaviourEntry = document.createElement("li");
        behaviourEntry.className = "behaviour-name";

        behaviourEntry.textContent = behaviourNames[i].firstName + " " +behaviourNames[i].lastName ;

        $behaviourList.append(behaviourEntry);

        behaviourCard = document.createElement("div");
        behaviourCard.className = "card";
        behaviourCard.setAttribute("data-name", behaviourEntry.textContent);
        behaviourCard.setAttribute("data-dept", behaviourNames[i].dept);
        behaviourCard.setAttribute("data-position", behaviourNames[i].position);
        behaviourCard.setAttribute("data-phone", behaviourNames[i].phone);
        behaviourCard.setAttribute("data-room", behaviourNames[i].room);

        var behaviourImage = behaviourNames[i].image;
        behaviourCard.setAttribute("data-image", behaviourImage);

        behaviourCard.innerHTML = "<img src='"+ behaviourImage +"'><h2>"+behaviourEntry.textContent+"</h2>";

        $behaviourCards.append(behaviourCard);
      }
    }

  /*
   *  Public Methods
   */
  function init() {
    var googleSheet = document.getElementById("googleSheetBehaviourList");
    googleSheet.addEventListener("rise-google-sheet-response", function(e) {
      addBehaviourNames(e.detail.cells);
      displayBehaviourNames();
    });
    googleSheet.go();
  }

  return {
    "init": init
  };
})();