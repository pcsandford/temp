var RiseVision = RiseVision || {};
RiseVision.CommunicationDirectory = {};

RiseVision.CommunicationDirectory = (function() {
  "use strict";


  var communicationNames = [];
  var counter = 0;
  var $mainContainer = $("#main-container");
  var $communicationList = $(".communication-directory");
  var $communicationCards = $(".cards-communication");

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
  function getCommunicationNames(index, numCols, cells) {
    var communication = {};

    communication.firstName = getCell(index, cells);
    communication.lastName = getCell(++index, cells);
    communication.phone = getCell(++index, cells);
    communication.room = getCell(++index, cells);
    communication.dept = getCell(++index, cells);
    communication.position = getCell(++index, cells);
    communication.image = getCell(++index, cells);


    return communication;
  }

  /* Add each event to the events array. */
  function addCommunicationNames(cells) {
    counter = 0;
    communicationNames = [];
    var numCols = getNumColumns(cells),
      len = cells.length,
      communication;

    // Skip header and start at first cell of data.
    for (var i = numCols; i < len; i += numCols) {
      communication = getCommunicationNames(i, numCols, cells);
      communicationNames.push(communication);
    }
  }

  /* Display the events. */
  function displayCommunicationNames() {



    var communicationEntry = null,
      departmentName = null,
      departmentLink = null,
      communicationCard = null,
      communicationDept = null,
      numCommunication = communicationNames.length;

        $communicationList.empty();
        $communicationCards.empty();

      for (var i = 0; i < numCommunication; i++) {

        communicationEntry = document.createElement("li");
        communicationEntry.className = "communication-name";

        communicationEntry.textContent = communicationNames[i].firstName + " " +communicationNames[i].lastName ;

        $communicationList.append(communicationEntry);

        communicationCard = document.createElement("div");
        communicationCard.className = "card";
        communicationCard.setAttribute("data-name", communicationEntry.textContent);
        communicationCard.setAttribute("data-dept", communicationNames[i].dept);
        communicationCard.setAttribute("data-position", communicationNames[i].position);
        communicationCard.setAttribute("data-phone", communicationNames[i].phone);
        communicationCard.setAttribute("data-room", communicationNames[i].room);

        var communicationImage = communicationNames[i].image;
        communicationCard.setAttribute("data-image", communicationImage);

        communicationCard.innerHTML = "<img src='"+ communicationImage +"'><h2>"+communicationEntry.textContent+"</h2>";

        $communicationCards.append(communicationCard);
      }
    }

  /*
   *  Public Methods
   */
  function init() {
    var googleSheet = document.getElementById("googleSheetCommunicationList");
    googleSheet.addEventListener("rise-google-sheet-response", function(e) {
      addCommunicationNames(e.detail.cells);
      displayCommunicationNames();
    });
    googleSheet.go();
  }

  return {
    "init": init
  };
})();