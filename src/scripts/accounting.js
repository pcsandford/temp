var RiseVision = RiseVision || {};
RiseVision.AccountingDirectory = {};

RiseVision.AccountingDirectory = (function() {
  "use strict";


  var accountingNames = [];
  var counter = 0;
  var $mainContainer = $("#main-container");
  var $accountingList = $(".accounting-directory");
  var $accountingCards = $(".cards-accounting");

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
  function getAccountingNames(index, numCols, cells) {
    var accounting = {};

    accounting.firstName = getCell(index, cells);
    accounting.lastName = getCell(++index, cells);
    accounting.phone = getCell(++index, cells);
    accounting.room = getCell(++index, cells);
    accounting.dept = getCell(++index, cells);
    accounting.position = getCell(++index, cells);


    return accounting;
  }

  /* Add each event to the events array. */
  function addAccountingNames(cells) {
    counter = 0;
    accountingNames = [];
    var numCols = getNumColumns(cells),
      len = cells.length,
      accounting;

    // Skip header and start at first cell of data.
    for (var i = numCols; i < len; i += numCols) {
      accounting = getAccountingNames(i, numCols, cells);
      accountingNames.push(accounting);
    }
  }

  /* Display the events. */
  function displayAccountingNames() {



    var accountingEntry = null,
      departmentName = null,
      departmentLink = null,
      accountingCard = null,
      accountingDept = null,
      numAccounting = accountingNames.length;

        $accountingList.empty();
        $accountingCards.empty();

      for (var i = 0; i < numAccounting; i++) {

        accountingEntry = document.createElement("li");
        accountingEntry.className = "management-name";
        // departmentName = document.getElementsByClassName("department-name");
        // departmentLink = $("#department-name-id").attr("data-link");
        // suiteName = document.getElementsByClassName("suite-name");
        // doctorName = document.getElementsByClassName("doctor-name");
        accountingEntry.textContent = accountingNames[i].firstName + " " +accountingNames[i].lastName ;
        // departmentLink = advisementNames[i].link;


        // advisementEntry.InnerHTML = departmentEntry.textContent;
        // advisementEntry.className = departmentLink + "-directoryName";
        // advisementEntry.setAttribute("data-link",departmentLink+"-link");
        // advisementEntry.setAttribute("data-breadcrumbs",departmentEntry.textContent);
        // advisementEntry.setAttribute("data-test",departmentLink);

        $accountingList.append(accountingEntry);

        accountingCard = document.createElement("div");
        accountingCard.className = "card";
        accountingCard.setAttribute("data-name", accountingEntry.textContent);
        accountingCard.setAttribute("data-dept", accountingNames[i].dept);
        accountingCard.setAttribute("data-position", accountingNames[i].position);
        accountingCard.setAttribute("data-phone", accountingNames[i].phone);
        accountingCard.setAttribute("data-room", accountingNames[i].room);





        accountingCard.innerHTML = "<h2>"+accountingEntry.textContent+"</h2>";

        $accountingCards.append(accountingCard);

      }
    }

  /*
   *  Public Methods
   */
  function init() {
    var googleSheet = document.getElementById("googleSheetAccountingList");
    googleSheet.addEventListener("rise-google-sheet-response", function(e) {
      addAccountingNames(e.detail.cells);
      displayAccountingNames();
    });
    googleSheet.go();
  }

  return {
    "init": init
  };
})();