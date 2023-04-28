import * as uihelper from "../../../lib/admin_panel/uihelper";
// import * as utilsCommon from "../../../lib/common/utilsCommon";

let testState: string | undefined = "passed";

const XS: string = String(Math.floor(Math.random() * 9000 + 1000));
// const TS: string = utilsCommon.getTimestamp();

describe("Project - Admin Panel - ( User Management Flow )", function () {
   afterEach("Checking for test failure", function () {
      testState = this.currentTest?.state;
   });

   it("User Management Flow - Role Creation.", function () {
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      uihelper.login("temp.sagar@webcluesinfotech.com", "temp_sagar@admin");
      uihelper.clickMenuItem("User Management > Roles");
      uihelper.clickButton("Add Role");
      uihelper.setTextInputText("Name", "TEMP_QA_" + XS);
      uihelper.selectOneChoice("Status", "Active");
      uihelper.clickCheckBoxInTable("users > Create;Update;Read;Delete");
      uihelper.clickCheckBoxInTable("settings > Read");
      uihelper.clickButton("Save");
      uihelper.logout();
   });

   it("User Management Flow - Verify Created Role.", function () {
      if (testState != "passed") {
         this.skip();
      }
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      uihelper.login("temp.sagar@webcluesinfotech.com", "temp_sagar@admin");
      uihelper.clickMenuItem("User Management > Roles");
      uihelper.verifyRowValueExistsInTable("TEMP_QA_" + XS, true);
      uihelper.logout();
   });

   it("User Management Flow - Add User Wih Newly Created Role.", function () {
      if (testState != "passed") {
         this.skip();
      }
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      uihelper.login("temp.sagar@webcluesinfotech.com", "temp_sagar@admin");
      uihelper.clickMenuItem("User Management > Users");
      uihelper.clickButton("Add User");
      uihelper.setTextInputText("First name", "TEMP_" + XS + "_TEMP");
      uihelper.setTextInputText("Email", "temp." + XS + "@webcluesinfotech.com");
      uihelper.setTextInputText("Mobile Number", "992439" + XS);
      uihelper.setTextInputText("Password", "temp_" + XS + "@admin");
      uihelper.selectOneChoice("Role", "TEMP_QA_" + XS);
      uihelper.selectOneChoice("Status", "Active");
      uihelper.clickButton("Save");
      uihelper.verifyToastMsgExists("User Added sussessfully");
      uihelper.logout();
   });

   it("User Management Flow - Role Edit.", function () {
      if (testState != "passed") {
         this.skip();
      }
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      uihelper.login("temp.sagar@webcluesinfotech.com", "temp_sagar@admin");
      uihelper.clickMenuItem("User Management > Roles");
      uihelper.verifyRowValueExistsInTable("TEMP_QA_" + XS, true);
      uihelper.performActionInRolesTable("TEMP_QA_" + XS + " > edit");
      uihelper.clickCheckBoxInTable("settings > Read;Update");
      uihelper.clickButton("Save");
      uihelper.logout();
   });

   it("User Management Flow - Login With Above Created User.", function () {
      if (testState != "passed") {
         this.skip();
      }
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      uihelper.login("temp." + XS + "@webcluesinfotech.com", "temp_" + XS + "@admin");
      uihelper.logout();
   });

   it("User Management Flow - Verify User & Delete.", function () {
      if (testState != "passed") {
         this.skip();
      }
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      uihelper.login("temp.sagar@webcluesinfotech.com", "temp_sagar@admin");
      uihelper.clickMenuItem("User Management > Users");
      uihelper.verifyRowValueExistsInTable("TEMP_" + XS + "_TEMP;temp." + XS + "@webcluesinfotech.com", true);
      uihelper.performActionInUserTable("temp." + XS + "@webcluesinfotech.com > delete");
      uihelper.clickButton("Confirm");
      uihelper.logout();
   });

   it("User Management Flow - Role Delete.", function () {
      if (testState != "passed") {
         this.skip();
      }
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      uihelper.login("temp.sagar@webcluesinfotech.com", "temp_sagar@admin");
      uihelper.clickMenuItem("User Management > Roles");
      uihelper.performActionInRolesTable("TEMP_QA_" + XS + " > Delete");
      uihelper.clickButton("Confirm");
      uihelper.verifyToastMsgExists("role deleted successfully");
      uihelper.logout();
   });
});
