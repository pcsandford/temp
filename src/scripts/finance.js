var RiseVision = RiseVision || {};
RiseVision.FinanceDirectory = {};

RiseVision.FinanceDirectory = (function() {
  "use strict";


  var financeNames = [];
  var counter = 0;
  var $mainContainer = $("#main-container");
  var $financeList = $(".finance-directory");
  var $financeCards = $(".cards-finance");

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
  function getFinanceNames(index, numCols, cells) {
    var finance = {};

    finance.firstName = getCell(index, cells);
    finance.lastName = getCell(++index, cells);
    finance.phone = getCell(++index, cells);
    finance.room = getCell(++index, cells);
    finance.dept = getCell(++index, cells);
    finance.position = getCell(++index, cells);
    finance.image = getCell(++index, cells);


    return finance;
  }

  /* Add each event to the events array. */
  function addFinanceNames(cells) {
    counter = 0;
    financeNames = [];
    var numCols = getNumColumns(cells),
      len = cells.length,
      finance;

    // Skip header and start at first cell of data.
    for (var i = numCols; i < len; i += numCols) {
      finance = getFinanceNames(i, numCols, cells);
      financeNames.push(finance);
    }
  }

  /* Display the events. */
  function displayFinanceNames() {



    var financeEntry = null,
      departmentName = null,
      departmentLink = null,
      financeCard = null,
      financeDept = null,
      numFinance = financeNames.length;

        $financeList.empty();
        $financeCards.empty();

      for (var i = 0; i < numFinance; i++) {

        financeEntry = document.createElement("li");
        financeEntry.className = "finance-name";
        financeEntry.textContent = financeNames[i].firstName + " " +financeNames[i].lastName ;

        $financeList.append(financeEntry);

        financeCard = document.createElement("div");
        financeCard.className = "card";
        financeCard.setAttribute("data-name", financeEntry.textContent);
        financeCard.setAttribute("data-dept", financeNames[i].dept);
        financeCard.setAttribute("data-position", financeNames[i].position);
        financeCard.setAttribute("data-phone", financeNames[i].phone);
        financeCard.setAttribute("data-room", financeNames[i].room);

        var financeImage = financeNames[i].image;
        financeCard.setAttribute("data-image", financeImage);

        financeCard.innerHTML = "<img src='"+ financeImage +"'><h2>"+financeEntry.textContent+"</h2>";

        $financeCards.append(financeCard);

      }
    }

  /*
   *  Public Methods
   */
  function init() {
    var googleSheet = document.getElementById("googleSheetFinanceList");
    googleSheet.addEventListener("rise-google-sheet-response", function(e) {
      addFinanceNames(e.detail.cells);
      displayFinanceNames();
    });
    googleSheet.go();
  }

  return {
    "init": init
  };
})();