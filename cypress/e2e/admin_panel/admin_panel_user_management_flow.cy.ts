import * as utilsCommon from "../../../lib/common/utilsCommon";
import * as uihelper from "../../../lib/common/uihelper";

import * as admin_panel_uihelper from "../../../lib/admin_panel/admin_panel_uihelper";

let testState: string | undefined = "passed";

const XS: string = utilsCommon.getRandomNumber(1000, 9999).toString();
// const TS: string = utilsCommon.getTimestamp();

describe("Project - Admin Panel - ( User Management Flow )", function () {
   afterEach("Checking for test failure", function () {
      testState = this.currentTest?.state;
   });

   it("User Management Flow - Role Creation.", function () {
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

   it("User Management Flow - Verify Created Role.", function () {
      if (testState != "passed") {
         this.skip();
      }
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      admin_panel_uihelper.login("temp.sagar@webcluesinfotech.com", "temp_sagar@admin");
      admin_panel_uihelper.clickMenuItem("User Management > Roles");
      admin_panel_uihelper.verifyRowValueExistsInTable("TEMP_QA_" + XS, true);
      admin_panel_uihelper.logout();
   });

   it("User Management Flow - Add User Wih Newly Created Role.", function () {
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
      admin_panel_uihelper.verifyToastMsgExists("User Added sussessfully");
      admin_panel_uihelper.logout();
   });

   it("User Management Flow - Role Edit.", function () {
      if (testState != "passed") {
         this.skip();
      }
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      admin_panel_uihelper.login("temp.sagar@webcluesinfotech.com", "temp_sagar@admin");
      admin_panel_uihelper.clickMenuItem("User Management > Roles");
      admin_panel_uihelper.verifyRowValueExistsInTable("TEMP_QA_" + XS, true);
      admin_panel_uihelper.performActionInRolesTable("TEMP_QA_" + XS + " > edit");
      admin_panel_uihelper.clickCheckBoxInTable("settings > Read;Update");
      admin_panel_uihelper.clickButton("Save");
      admin_panel_uihelper.logout();
   });

   it("User Management Flow - Login With Above Created User.", function () {
      if (testState != "passed") {
         this.skip();
      }
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      admin_panel_uihelper.login("temp." + XS + "@webcluesinfotech.com", "temp_" + XS + "@admin");
      admin_panel_uihelper.logout();
   });

   it("User Management Flow - Verify User & Delete.", function () {
      if (testState != "passed") {
         this.skip();
      }
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      admin_panel_uihelper.login("temp.sagar@webcluesinfotech.com", "temp_sagar@admin");
      admin_panel_uihelper.clickMenuItem("User Management > Users");
      admin_panel_uihelper.verifyRowValueExistsInTable("TEMP_" + XS + "_TEMP;temp." + XS + "@webcluesinfotech.com", true);
      admin_panel_uihelper.performActionInUserTable("temp." + XS + "@webcluesinfotech.com > delete");
      admin_panel_uihelper.clickButton("Confirm");
      admin_panel_uihelper.logout();
   });

   it("User Management Flow - Role Delete.", function () {
      if (testState != "passed") {
         this.skip();
      }
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      admin_panel_uihelper.login("temp.sagar@webcluesinfotech.com", "temp_sagar@admin");
      admin_panel_uihelper.clickMenuItem("User Management > Roles");
      admin_panel_uihelper.performActionInRolesTable("TEMP_QA_" + XS + " > Delete");
      admin_panel_uihelper.clickButton("Confirm");
      admin_panel_uihelper.verifyToastMsgExists("role deleted successfully");
      admin_panel_uihelper.logout();
   });
});
