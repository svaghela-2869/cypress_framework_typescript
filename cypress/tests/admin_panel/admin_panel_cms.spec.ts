import * as utilsCommon from "../../../lib/common/utilsCommon";
import * as uihelper from "../../../lib/common/uihelper";

import * as admin_panel_uihelper from "../../../lib/admin_panel/admin_panel_uihelper";

let testState: string | undefined = "passed";

const XS: string = utilsCommon.getRandomNumber(1000, 9999).toString();
// const TS: string = utilsCommon.getTimestamp();

describe(Cypress.spec.name, function () {
   afterEach("Checking for test failure", function () {
      testState = this.currentTest?.state;
   });

   it("CMS - CMS Creation Error Msg Verification.", function () {
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      admin_panel_uihelper.login("temp.sagar@webcluesinfotech.com", "temp_sagar@admin");
      admin_panel_uihelper.clickMenuItem("CMS");
      admin_panel_uihelper.clickButton("Add CMS");
      admin_panel_uihelper.clickButton("Submit");
      admin_panel_uihelper.verifyReadOnlyText("slug is required");
      admin_panel_uihelper.verifyReadOnlyText("name is required");
      admin_panel_uihelper.verifyReadOnlyText("content is required");
      admin_panel_uihelper.verifyReadOnlyText("status is required");
      admin_panel_uihelper.clickButton("Cancel");
      admin_panel_uihelper.logout();
   });

   it("CMS - Add CMS.", function () {
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      admin_panel_uihelper.login("temp.sagar@webcluesinfotech.com", "temp_sagar@admin");
      admin_panel_uihelper.clickMenuItem("CMS");
      admin_panel_uihelper.clickButton("Add CMS");
      admin_panel_uihelper.setTextInputText("Slug", "TEMP_CMS_SLUG_" + XS);
      admin_panel_uihelper.setTextInputText("Name", "TEMP_CMS_NAME_" + XS);
      uihelper.setTextInIFrame("iframe[title='Rich Text Area']", "p", "adding cms.");
      admin_panel_uihelper.selectOneChoice("Status", "Active");
      admin_panel_uihelper.clickButton("Submit");
      admin_panel_uihelper.verifyToastMsgExists("Page Added sussessfully");
      admin_panel_uihelper.logout();
   });

   it("CMS - Verify Added CMS & Edit.", function () {
      if (testState != "passed") {
         this.skip();
      }
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      admin_panel_uihelper.login("temp.sagar@webcluesinfotech.com", "temp_sagar@admin");
      admin_panel_uihelper.clickMenuItem("CMS");
      admin_panel_uihelper.verifyRowValueExistsInTable("TEMP_CMS_SLUG_" + XS + ";" + "TEMP_CMS_NAME_" + XS, true, "TEMP_CMS_NAME_" + XS);
      admin_panel_uihelper.performActionInTable("TEMP_CMS_SLUG_" + XS, true, "edit");
      admin_panel_uihelper.waitForLoaderToGo();
      admin_panel_uihelper.selectOneChoice("Status", "Inactive");
      admin_panel_uihelper.clickButton("Submit");
      admin_panel_uihelper.verifyToastMsgExists("Page Updated successfully");
      admin_panel_uihelper.logout();
   });

   it("CMS - CMS Delete.", function () {
      if (testState != "passed") {
         this.skip();
      }
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      admin_panel_uihelper.login("temp.sagar@webcluesinfotech.com", "temp_sagar@admin");
      admin_panel_uihelper.clickMenuItem("CMS");
      admin_panel_uihelper.verifyRowValueExistsInTable("TEMP_CMS_SLUG_" + XS + ";" + "TEMP_CMS_NAME_" + XS, true, "TEMP_CMS_NAME_" + XS);
      admin_panel_uihelper.performActionInTable("TEMP_CMS_SLUG_" + XS, true, "delete");
      admin_panel_uihelper.waitForLoaderToGo();
      admin_panel_uihelper.clickButton("Confirm");
      admin_panel_uihelper.verifyToastMsgExists("CMSdeletedsuccessfully");
      admin_panel_uihelper.logout();
   });
});
