/* global RiseVision */
(function () {
  "use strict";

  window.addEventListener("WebComponentsReady", function() {
    RiseVision.MainDirectory.init();
    RiseVision.DepartmentsDirectory.init();
    RiseVision.FacultyDirectory.init();
    RiseVision.StaffDirectory.init();
    RiseVision.ClassroomsDirectory.init();
    RiseVision.ConferenceRoomsDirectory.init();
    RiseVision.AdvisementDirectory.init();
    RiseVision.GraduateProgramsDirectory.init();
    RiseVision.DeansOfficeDirectory.init();
    RiseVision.ManagementDirectory.init();
    RiseVision.FinanceDirectory.init();
    RiseVision.MarketingDirectory.init();
  });
})();