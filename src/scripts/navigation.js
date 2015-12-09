$(document).ready(function(){

  var slideLevel = 0;
  var mainDirectory = $(".main-directory");
  var mainDirectoryLink = $(".main-directory li");
  var departmentsDirectory = $(".departments-directory");






  $('.main-directory').on('click','li',function() {
    slideLevel = 1;

   var className = $(this).attr('data-test');

   $(".back-button").css("display","block");

   switch(className){
      case 'departments':

        mainDirectory.css("display","none");
        departmentsDirectory.css("display","block").attr("data-status","levelTwo");

        $(".cards-mainList").css("display", "none");
        $(".cards-departments").css("display","flex").attr("data-status","levelTwo");

        var sectionName = $(this).attr("data-breadcrumbs")
        var linkName = $(this).attr("data-link")
        var newBreadcrumb = "<li class="+linkName+">"+sectionName+"</li>";
        $(".breadcrumbs").append(newBreadcrumb);
        animateLinks($('.departments-directory li'));
      break;

      case 'faculty':

        $(".main-directory").css("display","none");
        $(".faculty-directory").css("display","block").attr("data-status","levelTwo");

        $(".cards-mainList").css("display", "none");
        $(".cards-faculty").css("display","flex").attr("data-status","levelTwo");

        animateLinks($('.faculty-directory li'));

        var sectionName = $(this).attr("data-breadcrumbs")
        var linkName = $(this).attr("data-link")
        var newBreadcrumb = "<li class="+linkName+">"+sectionName+"</li>";
        $(".breadcrumbs").append(newBreadcrumb);
      break;

      case 'staff':

        $(".main-directory").css("display","none");
        $(".staff-directory").css("display","block").attr("data-status","levelTwo");

        $(".cards-mainList").css("display", "none");
        $(".cards-staff").css("display","flex").attr("data-status","levelTwo");

        animateLinks($('.staff-directory li'));

        var sectionName = $(this).attr("data-breadcrumbs")
        var linkName = $(this).attr("data-link")
        var newBreadcrumb = "<li class="+linkName+">"+sectionName+"</li>";
        $(".breadcrumbs").append(newBreadcrumb);
      break;

      case 'classrooms':

        $(".main-directory").css("display","none");
        $(".classroom-directory").css("display","block").attr("data-status","levelTwo");

        $(".cards-mainList").css("display", "none");
        $(".cards-classrooms").css("display","flex").attr("data-status","levelTwo");

        animateLinks($('.classroom-directory li'));

        var sectionName = $(this).attr("data-breadcrumbs")
        var linkName = $(this).attr("data-link")
        var newBreadcrumb = "<li class="+linkName+">"+sectionName+"</li>";
        $(".breadcrumbs").append(newBreadcrumb);
      break;

      case 'conferenceRooms':

        $(".main-directory").css("display","none");
        $(".conferenceRoom-directory").css("display","block").attr("data-status","levelTwo");

        $(".cards-mainList").css("display", "none");
        $(".cards-conferenceRooms").css("display","flex").attr("data-status","levelTwo");

        animateLinks($('.conferenceRoom-directory li'));

        var sectionName = $(this).attr("data-breadcrumbs")
        var linkName = $(this).attr("data-link")
        var newBreadcrumb = "<li class="+linkName+">"+sectionName+"</li>";
        $(".breadcrumbs").append(newBreadcrumb);
      break;
   }
});

// selecting the department from the departments directory

$('.departments-directory').on('click','li',function() {
  slideLevel = 2;
   var className = $(this).attr('class');
   switch(className){
      case "undergraduateAdvisement-directoryName":
        $(".departments-directory").css("display","none");
        $(".undergraduateAdvisement-directory").css("display","block").attr("data-status","levelThree");

        $(".cards-departments").css("display", "none");
        $(".cards-undergraduateAdvisement").css("display","flex").attr("data-status","levelThree");

        animateLinks($('.undergraduateAdvisement-directory li'));

        var sectionName = $(this).attr("data-breadcrumbs")
        var linkName = $(this).attr("data-link")
        var newBreadcrumb = "<li class="+linkName+">"+sectionName+"</li>";
        $(".breadcrumbs").append(newBreadcrumb);
      break;

      case 'graduatePrograms-directoryName':

        $(".departments-directory").css("display","none");
        $(".graduatePrograms-directory").css("display","block").attr("data-status","levelThree");

        $(".cards-departments").css("display", "none");
        $(".cards-graduatePrograms").css("display","flex").attr("data-status","levelThree");

        animateLinks($('.graduatePrograms-directory li'));

        var sectionName = $(this).attr("data-breadcrumbs")
        var linkName = $(this).attr("data-link")
        var newBreadcrumb = "<li class="+linkName+">"+sectionName+"</li>";
        $(".breadcrumbs").append(newBreadcrumb);
      break;

      case 'deansOffice-directoryName':

        $(".departments-directory").css("display","none");
        $(".deansOffice-directory").css("display","block").attr("data-status","levelThree");

        $(".cards-departments").css("display", "none");
        $(".cards-deansOffice").css("display","flex").attr("data-status","levelThree");

        animateLinks($('.deansOffice-directory li'));

        var sectionName = $(this).attr("data-breadcrumbs")
        var linkName = $(this).attr("data-link")
        var newBreadcrumb = "<li class="+linkName+">"+sectionName+"</li>";
        $(".breadcrumbs").append(newBreadcrumb);
      break;

       case 'management-directoryName':

        $(".departments-directory").css("display","none");
        $(".management-directory").css("display","block").attr("data-status","levelThree");

        $(".cards-departments").css("display", "none");
        $(".cards-management").css("display","flex").attr("data-status","levelThree");

        animateLinks($('.management-directory li'));

        var sectionName = $(this).attr("data-breadcrumbs")
        var linkName = $(this).attr("data-link")
        var newBreadcrumb = "<li class="+linkName+">"+sectionName+"</li>";
        $(".breadcrumbs").append(newBreadcrumb);
      break;

      case 'finance-directoryName':

        $(".departments-directory").css("display","none");
        $(".finance-directory").css("display","block").attr("data-status","levelThree");

        $(".cards-departments").css("display", "none");
        $(".cards-finance").css("display","flex").attr("data-status","levelThree");

        animateLinks($('.finance-directory li'));

        var sectionName = $(this).attr("data-breadcrumbs")
        var linkName = $(this).attr("data-link")
        var newBreadcrumb = "<li class="+linkName+">"+sectionName+"</li>";
        $(".breadcrumbs").append(newBreadcrumb);
      break;

      case 'marketing-directoryName':

        $(".departments-directory").css("display","none");
        $(".marketing-directory").css("display","block").attr("data-status","levelThree");

        $(".cards-departments").css("display", "none");
        $(".cards-marketing").css("display","flex").attr("data-status","levelThree");

        animateLinks($('.marketing-directory li'));

        var sectionName = $(this).attr("data-breadcrumbs")
        var linkName = $(this).attr("data-link")
        var newBreadcrumb = "<li class="+linkName+">"+sectionName+"</li>";
        $(".breadcrumbs").append(newBreadcrumb);
      break;

      case 'accounting-directoryName':

        $(".departments-directory").css("display","none");
        $(".accounting-directory").css("display","block").attr("data-status","levelThree");

        $(".cards-departments").css("display", "none");
        $(".cards-accounting").css("display","flex").attr("data-status","levelThree");

        animateLinks($('.accounting-directory li'));

        var sectionName = $(this).attr("data-breadcrumbs")
        var linkName = $(this).attr("data-link")
        var newBreadcrumb = "<li class="+linkName+">"+sectionName+"</li>";
        $(".breadcrumbs").append(newBreadcrumb);
      break;

      case 'tech-directoryName':

        $(".departments-directory").css("display","none");
        $(".tech-directory").css("display","block").attr("data-status","levelThree");

        $(".cards-departments").css("display", "none");
        $(".cards-technology").css("display","flex").attr("data-status","levelThree");

        animateLinks($('.tech-directory li'));

        var sectionName = $(this).attr("data-breadcrumbs")
        var linkName = $(this).attr("data-link")
        var newBreadcrumb = "<li class="+linkName+">"+sectionName+"</li>";
        $(".breadcrumbs").append(newBreadcrumb);
      break;

      case 'minority-directoryName':

        $(".departments-directory").css("display","none");
        $(".minority-directory").css("display","block").attr("data-status","levelThree");

        $(".cards-departments").css("display", "none");
        $(".cards-minority").css("display","flex").attr("data-status","levelThree");

        animateLinks($('.minority-directory li'));

        var sectionName = $(this).attr("data-breadcrumbs")
        var linkName = $(this).attr("data-link")
        var newBreadcrumb = "<li class="+linkName+">"+sectionName+"</li>";
        $(".breadcrumbs").append(newBreadcrumb);
      break;

      case 'rehabInstitute-directoryName':

        $(".departments-directory").css("display","none");
        $(".rehabInstitute-directory").css("display","block").attr("data-status","levelThree");

        $(".cards-departments").css("display", "none");
        $(".cards-rehabInstitute").css("display","flex").attr("data-status","levelThree");

        animateLinks($('.rehabInstitute-directory li'));

        var sectionName = $(this).attr("data-breadcrumbs")
        var linkName = $(this).attr("data-link")
        var newBreadcrumb = "<li class="+linkName+">"+sectionName+"</li>";
        $(".breadcrumbs").append(newBreadcrumb);
      break;

       case 'behaviour-directoryName':

        $(".departments-directory").css("display","none");
        $(".behaviour-directory").css("display","block").attr("data-status","levelThree");

        $(".cards-departments").css("display", "none");
        $(".cards-behaviour").css("display","flex").attr("data-status","levelThree");

        animateLinks($('.behaviour-directory li'));

        var sectionName = $(this).attr("data-breadcrumbs")
        var linkName = $(this).attr("data-link")
        var newBreadcrumb = "<li class="+linkName+">"+sectionName+"</li>";
        $(".breadcrumbs").append(newBreadcrumb);
      break;

      case 'communication-directoryName':

        $(".departments-directory").css("display","none");
        $(".communication-directory").css("display","block").attr("data-status","levelThree");

        $(".cards-departments").css("display", "none");
        $(".cards-communication").css("display","flex").attr("data-status","levelThree");

        animateLinks($('.communication-directory li'));

        var sectionName = $(this).attr("data-breadcrumbs")
        var linkName = $(this).attr("data-link")
        var newBreadcrumb = "<li class="+linkName+">"+sectionName+"</li>";
        $(".breadcrumbs").append(newBreadcrumb);
      break;

      case 'rehabCounselling-directoryName':

        $(".departments-directory").css("display","none");
        $(".rehabCounselling-directory").css("display","block").attr("data-status","levelThree");

        $(".cards-departments").css("display", "none");
        $(".cards-rehabCounselling").css("display","flex").attr("data-status","levelThree");

        animateLinks($('.rehabCounselling-directory li'));

        var sectionName = $(this).attr("data-breadcrumbs")
        var linkName = $(this).attr("data-link")
        var newBreadcrumb = "<li class="+linkName+">"+sectionName+"</li>";
        $(".breadcrumbs").append(newBreadcrumb);
      break;
   }
});

  // Click on the back button to move the currently viewable div back to left:25vw

  $(".back-button").on("click", function() {

    slideLevel = slideLevel -1;
    var slideStatus = $(".list ul:visible").attr('data-status');
    console.log(slideStatus);

    switch(slideStatus){
      case "levelTwo":
        $(".list ul:visible").css("display","none");
        $(".main-directory").css("display","block");
        $(".card-display > div:visible").css("display","none");
        $(".cards-mainList").css("display","flex");
        checkBreadcrumbs();

        $("li:hidden").css('right','-500px');

      break;

      case 'levelThree':
        $(".list ul:visible").css("display","none");
        $(".departments-directory").css("display","block");
        $(".card-display > div:visible").css("display","none");
        $(".cards-departments").css("display","flex");
        checkBreadcrumbs();

        $("li:hidden").css('right','-500px');
      break;
   }
  });


  //animation function for individual links

  function animateLinks(links){
      links.each(function(i) {
           delay =(i)*30;
           setTimeout(function (li) {
                    li.stop(true,true).animate({right:'0px'});
                }, delay, $(this));
        });
  };


//   function cardCheck(){
//   var cardLevel = $('.departments-directory').attr("data-status")
//   console.log(cardLevel);
//   if(cardLevel == "levelTwo"){
//     for(var i = 0; i < departmentDirectoryCardDetails.length; i++){
//       $(".card-display").append("<div class='card'><h2>"+departmentDirectoryCardDetails[i]+"</h2></div>");
//     }
//   }
// }

  // check breadcrumbs list and remove the back button if the user is on 'screen 1'

  function checkBreadcrumbs(){
    var breadcrumbRemoved = $(".breadcrumbs li").length-1;
    $(".breadcrumbs li")[breadcrumbRemoved].remove();
    if($(".breadcrumbs > li").length <= 1){
      $(".back-button").css("display","none");
    }
  }

  $('.card-display').on('click','.card', function() {

    $('.card-close-button').addClass('xRotation1 xRotation2');

    $('.card-modal').css('display', 'block');
    var profileImage = $(this).data('image');
    var profileName = $(this).data('name');
    var profileDepartment = $(this).data('dept');
    var profilePosition = $(this).data('position');
    if (!$(this).hasClass('department-only')){
    var profilePhone = "Phone: " + $(this).data('phone');
    var profileRoom = "Room: " + $(this).data('room');
    } else {
    var profileRoom = "Room" + $(this).data('room');
    }
    $('.card-detail-area img').attr('src',profileImage);
    $('.detail-name').text(profileName);
    $('.detail-position').text(profilePosition);
    $('.detail-department').text(profileDepartment);
    $('.detail-phone').text(profilePhone);
    $('.detail-room').text(profileRoom);
    $( "p:contains('---')" ).css( "visibility", "hidden" );
  });

  $('.card-close-button').on('click', function() {

     $('.card-close-button').removeClass('xRotation1 xRotation2');

    $('.card-modal').css('display', 'none');
    $('.card-detail-area img').attr('src',"");
     $('.detail-name').text("");
    $('.detail-position').text("");
    $('.detail-department').text("");
    $('.detail-phone').text("");
    $('.detail-room').text("");
  })


  //reset to initial lists if no activity after 60 seconds

  var activityTimeout = setTimeout(inActive, 60000);

function resetActive(){
    // $(document.body).attr('class', 'active');
    console.log('active');
    clearTimeout(activityTimeout);
    activityTimeout = setTimeout(inActive, 60000);
}

// No activity do something.
function inActive(){
    $(".list ul:visible").css("display","none");
    $(".main-directory").css("display","block");
    $(".card-display > div:visible").css("display","none");
    $(".cards-mainList").css("display","flex");
    $('.card-modal').css('display', 'none');
    $('.detail-name').text("");
    $('.detail-position').text("");
    $('.detail-department').text("");
    $('.detail-phone').text("");
    $('.detail-room').text("");
    if($(".breadcrumbs > li").length > 1){
      $(".breadcrumbs li:gt(0)").css('display','none');
    }
    $('.back-button').css('display','none');
    console.log('inactive');
}

// Check for mousemove, could add other events here such as checking for key presses ect.
$(document).bind('click', function(){resetActive()});

});