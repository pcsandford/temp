var RiseVision = RiseVision || {};
RiseVision.StaffDirectory = {};

RiseVision.StaffDirectory = (function() {
  "use strict";


  var staff = [];
  var counter = 0;
  var $mainContainer = $("#main-container");
  var $staffList = $(".staff-directory");
  var $staffCards = $(".cards-staff");

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
  function getStaff(index, numCols, cells) {
    var individualStaff = {};

    individualStaff.firstName = getCell(index, cells);
    individualStaff.lastName = getCell(++index, cells);
    individualStaff.phone = getCell(++index, cells);
    individualStaff.room = getCell(++index, cells);
    individualStaff.dept = getCell(++index, cells);
    individualStaff.image = getCell(++index, cells);

    return individualStaff;
  }

  /* Add each event to the events array. */
  function addStaff(cells) {
    counter = 0;
    staff = [];
    var numCols = getNumColumns(cells),
      len = cells.length,
      individualStaff;

    // Skip header and start at first cell of data.
    for (var i = numCols; i < len; i += numCols) {
      individualStaff = getStaff(i, numCols, cells);
      staff.push(individualStaff);
    }
  }

  /* Display the events. */
  function displayStaff() {



    var staffEntry = null,
      staffFirstName = null,
      staffSecondName = null,
      staffCard = null,
      departmentLink = null,
      numStaff = staff.length;

        $staffList.empty();

      for (var i = 0; i < numStaff; i++) {

        staffEntry = document.createElement("li");
        staffEntry.className = "staff-name";
        staffFirstName = staff[i].firstName;
        staffSecondName = staff[i].lastName;
        staffEntry.textContent = staffFirstName + " " + staffSecondName;

        staffEntry.InnerHTML = staffEntry.textContent;

        $staffList.append(staffEntry);

        staffCard = document.createElement("div");
        staffCard.className = "card";
        staffCard.setAttribute("data-name", staffEntry.textContent);
        staffCard.setAttribute("data-dept", staff[i].dept);
        staffCard.setAttribute("data-phone", staff[i].phone);
        staffCard.setAttribute("data-room", staff[i].room);

        var staffImage = staff[i].image;
        staffCard.setAttribute("data-image", staffImage);

        staffCard.innerHTML = "<img src='"+ staffImage +"'><h2>"+staffEntry.textContent+"</h2>";

        $staffCards.append(staffCard);
      }
    }

  /*
   *  Public Methods
   */
  function init() {
    var googleSheet = document.getElementById("googleSheetStaffList");
    googleSheet.addEventListener("rise-google-sheet-response", function(e) {
      addStaff(e.detail.cells);
      displayStaff();
    });
    googleSheet.go();
  }

  return {
    "init": init
  };
})();