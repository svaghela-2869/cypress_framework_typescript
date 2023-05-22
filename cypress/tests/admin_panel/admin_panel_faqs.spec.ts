import * as utilsCommon from "../../../lib/common/utilsCommon";
import * as uihelper from "../../../lib/common/uihelper";

import * as admin_panel_uihelper from "../../../lib/admin_panel/admin_panel_uihelper";

let testState: string | undefined = "passed";

const XS: string = utilsCommon.getRandomNumber(1000, 9999).toString();
// const TS: string = utilsCommon.getTimeStamp();

describe(Cypress.spec.name, function () {
   afterEach("Checking for test failure", function () {
      testState = this.currentTest?.state;
   });

   it("FAQs - FAQs Creation Error Msg Verification.", function () {
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      admin_panel_uihelper.login("temp.sagar@webcluesinfotech.com", "temp_sagar@admin");
      admin_panel_uihelper.clickMenuItem("FAQ");
      admin_panel_uihelper.clickButton("Add FAQ");
      admin_panel_uihelper.clickButton("Submit");
      admin_panel_uihelper.verifyReadOnlyText("Please enter category string");
      admin_panel_uihelper.verifyReadOnlyText("Please enter question string");
      admin_panel_uihelper.verifyReadOnlyText("Please enter answer string");
      admin_panel_uihelper.verifyReadOnlyText("Please enter status string");
      admin_panel_uihelper.clickButton("Cancel");
      admin_panel_uihelper.logout();
   });

   it("FAQs - Add FAQs.", function () {
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      admin_panel_uihelper.login("temp.sagar@webcluesinfotech.com", "temp_sagar@admin");
      admin_panel_uihelper.clickMenuItem("FAQ");
      admin_panel_uihelper.clickButton("Add FAQ");
      admin_panel_uihelper.setTextInputText("Category", "TEMP_" + XS + "_Category");
      admin_panel_uihelper.setTextInputText("Question", "Why we are adding this faq ?");
      admin_panel_uihelper.setTextInputText("Answer", "For tesing, obviously.");
      admin_panel_uihelper.selectOneChoice("Status", "Active");
      admin_panel_uihelper.clickButton("Submit");
      admin_panel_uihelper.verifyToastMsgExists("Faq Added sussessfully");
      admin_panel_uihelper.logout();
   });

   it("FAQs - Verify Added FAQs & Delete.", function () {
      if (testState != "passed") {
         this.skip();
      }
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      admin_panel_uihelper.login("temp.sagar@webcluesinfotech.com", "temp_sagar@admin");
      admin_panel_uihelper.clickMenuItem("FAQ");
      admin_panel_uihelper.verifyRowValueExistsInTable("TEMP_" + XS + "_Category;Why we are adding this faq ?;For tesing, obviously.", true, "TEMP_" + XS + "_Category");
      admin_panel_uihelper.performActionInTable("Why we are adding this faq ?", true, "delete");
      admin_panel_uihelper.clickButton("Confirm");
      admin_panel_uihelper.verifyToastMsgExists("FAQdeletedsuccessfully");
      admin_panel_uihelper.logout();
   });
});
