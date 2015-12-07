var RiseVision = RiseVision || {};
RiseVision.MarketingDirectory = {};

RiseVision.MarketingDirectory = (function() {
  "use strict";


  var marketingNames = [];
  var counter = 0;
  var $mainContainer = $("#main-container");
  var $marketingList = $(".marketing-directory");
  var $marketingCards = $(".cards-marketing");

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
  function getMarketingNames(index, numCols, cells) {
    var marketing = {};

    marketing.firstName = getCell(index, cells);
    marketing.lastName = getCell(++index, cells);
    marketing.phone = getCell(++index, cells);
    marketing.room = getCell(++index, cells);
    marketing.dept = getCell(++index, cells);
    marketing.position = getCell(++index, cells);


    return marketing;
  }

  /* Add each event to the events array. */
  function addMarketingNames(cells) {
    counter = 0;
    marketingNames = [];
    var numCols = getNumColumns(cells),
      len = cells.length,
      marketing;

    // Skip header and start at first cell of data.
    for (var i = numCols; i < len; i += numCols) {
      marketing = getMarketingNames(i, numCols, cells);
      marketingNames.push(marketing);
    }
  }

  /* Display the events. */
  function displayMarketingNames() {



    var marketingEntry = null,
      departmentName = null,
      departmentLink = null,
      marketingCard = null,
      marketingDept = null,
      numMarketing = marketingNames.length;

        $marketingList.empty();
        $marketingCards.empty();

      for (var i = 0; i < numMarketing; i++) {

        marketingEntry = document.createElement("li");
        marketingEntry.className = "marketing-name";
        // departmentName = document.getElementsByClassName("department-name");
        // departmentLink = $("#department-name-id").attr("data-link");
        // suiteName = document.getElementsByClassName("suite-name");
        // doctorName = document.getElementsByClassName("doctor-name");
        marketingEntry.textContent = marketingNames[i].firstName + " " +marketingNames[i].lastName ;
        // departmentLink = advisementNames[i].link;


        // advisementEntry.InnerHTML = departmentEntry.textContent;
        // advisementEntry.className = departmentLink + "-directoryName";
        // advisementEntry.setAttribute("data-link",departmentLink+"-link");
        // advisementEntry.setAttribute("data-breadcrumbs",departmentEntry.textContent);
        // advisementEntry.setAttribute("data-test",departmentLink);

        $marketingList.append(marketingEntry);

        marketingCard = document.createElement("div");
        marketingCard.className = "card";
        marketingCard.setAttribute("data-name", marketingEntry.textContent);
        marketingCard.setAttribute("data-dept", marketingNames[i].dept);
        marketingCard.setAttribute("data-position", marketingNames[i].position);
        marketingCard.setAttribute("data-phone", marketingNames[i].phone);
        marketingCard.setAttribute("data-room", marketingNames[i].room);





        marketingCard.innerHTML = "<h2>"+marketingEntry.textContent+"</h2>";

        $marketingCards.append(marketingCard);

      }
    }

  /*
   *  Public Methods
   */
  function init() {
    var googleSheet = document.getElementById("googleSheetMarketingList");
    googleSheet.addEventListener("rise-google-sheet-response", function(e) {
      addMarketingNames(e.detail.cells);
      displayMarketingNames();
    });
    googleSheet.go();
  }

  return {
    "init": init
  };
})();