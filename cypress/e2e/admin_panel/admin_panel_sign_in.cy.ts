/// <reference types='cypress'/>
import * as uihelper from "../../../lib/admin_panel/uihelper";

describe("Project - Admin Panel - ( sign in )", function () {
   it("1. Verify that the user can successfully sign in with valid email and password", function () {
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      uihelper.login("temp.sagar@webcluesinfotech.com", "temp_sagar@admin");
      uihelper.logout();
   });

   it("2. Verify that the validation message is displayed when email field is left blank", function () {
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      uihelper.setTextInputText("Password", "admin@123456");
      uihelper.clickButton("Sign In");
      uihelper.verifyReadOnlyText("Please enter your email");
   });

   it.skip("3. Verify that a validation message displaying when enter an invalid password and valid email on Submit", function () {
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      uihelper.setTextInputText("Email", "admin@admin.com");
      uihelper.setTextInputText("Password", "admin >< 123456");
      uihelper.clickButton("Sign In");
      uihelper.verifyReadOnlyText("Please enter valid Password");
   });

   it.skip("4. Verify that validation message is display when entering invalid email", function () {
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      uihelper.setTextInputText("Email", "sumit&*(@webcluesinfotech.com");
      uihelper.setTextInputText("Password", "admin@123456");
      uihelper.clickButton("Sign In");
      uihelper.verifyReadOnlyText("Please enter valid email");
   });

   it("5. Verify that a validation message displaying when email and password field are left blank", function () {
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      uihelper.clickButton("Sign In");
      uihelper.verifyReadOnlyText("Please enter your email");
      uihelper.verifyReadOnlyText("Please enter your Password");
   });

   it.skip("6. Verify that the email address and password is remembered after sign in with remember button is checked", function () {});

   it("7. Verify that eye button is clickable in password field", function () {
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      uihelper.setTextInputText("Email", "admin@admin.com");
      uihelper.setTextInputText("Password", "admin@123456");
      uihelper.clickElementWithCssSelector("svg");
   });

   it.skip("8. Verify that a validation message appears when the user tries to sign in with an inactive account", function () {
      uihelper.launch_url("https://czft.qa.webcluesstaging.com/admin");
      uihelper.setTextInputText("Email", "sumit&*(@webcluesinfotech.com");
      uihelper.setTextInputText("Password", "Sumit@123");
      uihelper.clickButton("Sign In");
      uihelper.verifyReadOnlyText("User inacive");
   });
});
