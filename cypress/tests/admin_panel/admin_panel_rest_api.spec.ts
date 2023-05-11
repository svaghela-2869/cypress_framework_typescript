import * as admin_resthelper from "../../../lib/admin_panel/admin_panel_resthelper";
import * as utilsCommon from "../../../lib/common/utilsCommon";

let testState: string | undefined = "passed";

const XS: string = utilsCommon.getRandomNumber(1000, 9999).toString();

describe("Project - Admin Panel - ( REST APIs )", function () {
   afterEach("Checking for test failure", function () {
      testState = this.currentTest?.state;
   });

   it("REST APIs - Create Roles.", function () {
      admin_resthelper.storeLoginToken("temp.sagar@webcluesinfotech.com", "temp_sagar@admin", "login_token_1");
      cy.get("@login_token_1").then(function (token) {
         let roleCreateBody = {
            name: "TEMP_QA_" + XS,
            permissions: ["string"],
            status: "active",
         };
         admin_resthelper.postWithAuth("https://czbe.qa.webcluesstaging.com/api/v1/roles", `Bearer ${token}`, roleCreateBody, "create_roles_response_body_1");
      });
   });

   it("REST APIs - Verify & Delete Created Roles.", function () {
      if (testState != "passed") {
         this.skip();
      }
      admin_resthelper.storeLoginToken("temp.sagar@webcluesinfotech.com", "temp_sagar@admin", "login_token_2");
      cy.get("@login_token_2").then(function (token) {
         admin_resthelper.getWithAuth("https://czbe.qa.webcluesstaging.com/api/v1/roles", `Bearer ${token}`, "get_roles_response_body_1", 200);
      });
      admin_resthelper.verifyValueInJsonUsingJsonPath("get_roles_response_body_1", "$..results[?(@.name == '" + "TEMP_QA_" + XS + "')].name", "TEMP_QA_" + XS);
      admin_resthelper.storeValueFromJson("get_roles_response_body_1", "$..results[?(@.name == '" + "TEMP_QA_" + XS + "')]._id", "created_role_id");
      cy.get("@created_role_id").then(function (id) {
         cy.get("@login_token_2").then(function (token) {
            admin_resthelper.deleteWithAuth(`https://czbe.qa.webcluesstaging.com/api/v1/roles/${id}`, `Bearer ${token}`, "delete_roles_response_body_1", 200);
         });
      });
   });

   it("REST APIs - Get All Roles.", function () {
      if (testState != "passed") {
         this.skip();
      }
      admin_resthelper.storeLoginToken("temp.sagar@webcluesinfotech.com", "temp_sagar@admin", "login_token_3");
      cy.get("@login_token_3").then(function (token) {
         admin_resthelper.getWithAuth("https://czbe.qa.webcluesstaging.com/api/v1/roles", `Bearer ${token}`, "get_roles_response_body_2", 200);
      });
   });

   it("REST APIs - Get All Users", function () {
      if (testState != "passed") {
         this.skip();
      }
      admin_resthelper.storeLoginToken("temp.sagar@webcluesinfotech.com", "temp_sagar@admin", "login_token_4");
      cy.get("@login_token_4").then(function (token) {
         admin_resthelper.getWithAuth("https://czbe.qa.webcluesstaging.com/api/v1/auth/getAllUser", `Bearer ${token}`, "get_all_user_response_body_1", 200);
      });
   });
});
