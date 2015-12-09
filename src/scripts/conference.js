var RiseVision = RiseVision || {};
RiseVision.ConferenceRoomsDirectory = {};

RiseVision.ConferenceRoomsDirectory = (function() {
  "use strict";


  var conferenceRooms = [];
  var counter = 0;
  var $mainContainer = $("#main-container");
  var $conferenceRoomList = $(".conferenceRoom-directory");
  var $conferenceCards = $(".cards-conferenceRooms");

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
  function getConferenceRooms(index, numCols, cells) {
    var individualConferenceRoom = {};

    individualConferenceRoom.name = getCell(index, cells);
    individualConferenceRoom.room = getCell(++index, cells);


    return individualConferenceRoom;
  }

  /* Add each event to the events array. */
  function addConferenceRooms(cells) {
    counter = 0;
    conferenceRooms = [];
    var numCols = getNumColumns(cells),
      len = cells.length,
      individualConferenceRoom;

    // Skip header and start at first cell of data.
    for (var i = numCols; i < len; i += numCols) {
      individualConferenceRoom = getConferenceRooms(i, numCols, cells);
      conferenceRooms.push(individualConferenceRoom);
    }
  }

  /* Display the events. */
  function displayConferenceRooms() {



    var conferenceRoomEntry = null,
      conferenceRoomName = null,
      departmentLink = null,
      conferenceRoomCard = null,
      numConferenceRooms = conferenceRooms.length;

        $conferenceRoomList.empty();
        $conferenceCards.empty();

      for (var i = 0; i < numConferenceRooms; i++) {

        conferenceRoomEntry = document.createElement("li");
        conferenceRoomEntry.className = "conferenceRoom-name";
        conferenceRoomEntry.textContent = conferenceRooms[i].name;

        conferenceRoomEntry.InnerHTML = conferenceRoomEntry.textContent;

        $conferenceRoomList.append(conferenceRoomEntry);

        conferenceRoomCard = document.createElement("div");
        conferenceRoomCard.className = "card department-only";
        conferenceRoomCard.setAttribute("data-name", conferenceRoomEntry.textContent);
        conferenceRoomCard.setAttribute("data-room", conferenceRooms[i].room);

        conferenceRoomCard.innerHTML = "<h2>"+conferenceRoomEntry.textContent+"</h2>";

        $conferenceCards.append(conferenceRoomCard);

      }
    }

  /*
   *  Public Methods
   */
  function init() {
    var googleSheet = document.getElementById("googleSheetConferenceRoomList");
    googleSheet.addEventListener("rise-google-sheet-response", function(e) {
      addConferenceRooms(e.detail.cells);
      displayConferenceRooms();
    });
    googleSheet.go();
  }

  return {
    "init": init
  };
})();