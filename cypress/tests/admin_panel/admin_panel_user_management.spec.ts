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

   it("User Management - Role Creation Error Msg Verification.", function () {
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      admin_panel_uihelper.login("temp.sagar@webcluesinfotech.com", "temp_sagar@admin");
      admin_panel_uihelper.clickMenuItem("User Management > Roles");
      admin_panel_uihelper.clickButton("Add Role");
      admin_panel_uihelper.clickButton("Save");
      admin_panel_uihelper.verifyReadOnlyText("Please enter role name");
      admin_panel_uihelper.verifyReadOnlyText("Please enter role status");
      admin_panel_uihelper.clickButton("Cancel");
      admin_panel_uihelper.logout();
   });

   it("User Management - User Creation Error Msg Verification.", function () {
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      admin_panel_uihelper.login("temp.sagar@webcluesinfotech.com", "temp_sagar@admin");
      admin_panel_uihelper.clickMenuItem("User Management > Users");
      admin_panel_uihelper.clickButton("Add User");
      admin_panel_uihelper.clickButton("Save");
      admin_panel_uihelper.verifyReadOnlyText("Please enter first name");
      admin_panel_uihelper.verifyReadOnlyText("Enter Valid email");
      admin_panel_uihelper.verifyReadOnlyText("Mobile number is not valid");
      admin_panel_uihelper.verifyReadOnlyText("Password is too short - should be 8 chars minimum.");
      admin_panel_uihelper.verifyReadOnlyText("Please select role");
      admin_panel_uihelper.verifyReadOnlyText("Please select status");
      admin_panel_uihelper.clickButton("Cancel");
      admin_panel_uihelper.logout();
   });

   it("User Management - Role Creation.", function () {
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      admin_panel_uihelper.login("temp.sagar@webcluesinfotech.com", "temp_sagar@admin");
      admin_panel_uihelper.clickMenuItem("User Management > Roles");
      admin_panel_uihelper.clickButton("Add Role");
      admin_panel_uihelper.setTextInputText("Name", "TEMP_QA_" + XS);
      admin_panel_uihelper.selectOneChoice("Status", "Active");
      admin_panel_uihelper.clickCheckBoxInTable("users > Create;Update;Read;Delete");
      admin_panel_uihelper.clickCheckBoxInTable("settings > Read");
      admin_panel_uihelper.clickButton("Save");
      admin_panel_uihelper.logout();
   });

   it("User Management - Verify Created Role.", function () {
      if (testState != "passed") {
         this.skip();
      }
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      admin_panel_uihelper.login("temp.sagar@webcluesinfotech.com", "temp_sagar@admin");
      admin_panel_uihelper.clickMenuItem("User Management > Roles");
      admin_panel_uihelper.verifyRowValueExistsInTable("TEMP_QA_" + XS, true, "TEMP_QA_" + XS);
      admin_panel_uihelper.logout();
   });

   it("User Management - Add User Wih Newly Created Role.", function () {
      if (testState != "passed") {
         this.skip();
      }
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      admin_panel_uihelper.login("temp.sagar@webcluesinfotech.com", "temp_sagar@admin");
      admin_panel_uihelper.clickMenuItem("User Management > Users");
      admin_panel_uihelper.clickButton("Add User");
      admin_panel_uihelper.setTextInputText("First name", "TEMP_" + XS + "_TEMP");
      admin_panel_uihelper.setTextInputText("Email", "temp." + XS + "@webcluesinfotech.com");
      admin_panel_uihelper.setTextInputText("Mobile Number", "992439" + XS);
      admin_panel_uihelper.setTextInputText("Password", "temp_" + XS + "@admin");
      admin_panel_uihelper.selectOneChoice("Role", "TEMP_QA_" + XS);
      admin_panel_uihelper.selectOneChoice("Status", "Active");
      admin_panel_uihelper.clickButton("Save");
      // admin_panel_uihelper.verifyToastMsgExists("User Added sussessfully");
      admin_panel_uihelper.logout();
   });

   it("User Management - Role Edit.", function () {
      if (testState != "passed") {
         this.skip();
      }
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      admin_panel_uihelper.login("temp.sagar@webcluesinfotech.com", "temp_sagar@admin");
      admin_panel_uihelper.clickMenuItem("User Management > Roles");
      admin_panel_uihelper.verifyRowValueExistsInTable("TEMP_QA_" + XS, true, "TEMP_QA_" + XS);
      admin_panel_uihelper.performActionInTable("TEMP_QA_" + XS, true, "edit");
      admin_panel_uihelper.waitForLoaderToGo();
      admin_panel_uihelper.clickCheckBoxInTable("settings > Read;Update");
      admin_panel_uihelper.clickButton("Save");
      admin_panel_uihelper.logout();
   });

   it("User Management - Login With Above Created User.", function () {
      if (testState != "passed") {
         this.skip();
      }
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      admin_panel_uihelper.login("temp." + XS + "@webcluesinfotech.com", "temp_" + XS + "@admin");
      admin_panel_uihelper.logout();
   });

   it("User Management - Verify User & Then Delete.", function () {
      if (testState != "passed") {
         this.skip();
      }
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      admin_panel_uihelper.login("temp.sagar@webcluesinfotech.com", "temp_sagar@admin");
      admin_panel_uihelper.clickMenuItem("User Management > Users");
      admin_panel_uihelper.verifyRowValueExistsInTable("TEMP_" + XS + "_TEMP;temp." + XS + "@webcluesinfotech.com", true, "TEMP_" + XS + "_TEMP");
      admin_panel_uihelper.performActionInTable("temp." + XS + "@webcluesinfotech.com", true, "delete");
      admin_panel_uihelper.waitForLoaderToGo();
      admin_panel_uihelper.clickButton("Confirm");
      admin_panel_uihelper.logout();
   });

   it("User Management - Role Delete.", function () {
      if (testState != "passed") {
         this.skip();
      }
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      admin_panel_uihelper.login("temp.sagar@webcluesinfotech.com", "temp_sagar@admin");
      admin_panel_uihelper.clickMenuItem("User Management > Roles");
      admin_panel_uihelper.setTextInputText("", "TEMP_QA_" + XS, "Search");
      admin_panel_uihelper.performActionInTable("TEMP_QA_" + XS, true, "delete");
      admin_panel_uihelper.waitForLoaderToGo();
      admin_panel_uihelper.clickButton("Confirm");
      admin_panel_uihelper.verifyToastMsgExists("role deleted successfully");
      admin_panel_uihelper.logout();
   });
});
