/// <reference types='cypress'/>
import * as uihelper from "../../../lib/admin_panel/uihelper";

describe("Project - Admin Panel - ( forgot password )", function () {
   it("1. Verify that entering an invalid email address and clicking on the submit button make sure that password reset link is not sent", function () {
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      uihelper.clickLink("Forgot Password?");
      uihelper.setTextInputText("Email", "Sumit#gmail.com");
      uihelper.clickButton("Send email");
      uihelper.verifyToastMsgExists("email must be an email");
   });

   it("2. Verify that entering an inactive email and clicking on the submit button make sure that the password reset link is not sent to the inactive account", function () {
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      uihelper.clickLink("Forgot Password?");
      uihelper.setTextInputText("Email", "sumit@webcluesinfotech.com");
      uihelper.clickButton("Send email");
      uihelper.verifyToastMsgExists("Requested user does not exist.");
   });

   it.skip("3. Verify that entering a valid email address and clicking on the submit button make sure that the password reset link is not sent multiple time", function () {
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      uihelper.clickLink("Forgot Password?");
      uihelper.setTextInputText("Email", "sumit@webcluesinfotech.com");
      uihelper.clickButton("Send email");
      uihelper.verifyToastMsgExists("Forgot Password Mail has been sent to your email account successfully");
   });

   it("4. Verify that password reset link contain a field to email address", function () {
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      uihelper.clickLink("Forgot Password?");
      uihelper.checkElementEnabledWithXpath("//input[@type='email']");
      uihelper.checkElementEnabledWithCssSelector("input[name=email]");
   });
});
