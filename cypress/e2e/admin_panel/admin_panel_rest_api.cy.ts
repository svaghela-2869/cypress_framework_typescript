import * as resthelper from "../../../lib/common/resthelper";

describe("Project - Admin Panel - ( REST APIs )", function () {
   it("REST APIs - Authentication - Login", function () {
      let request_body = {
         email: "temp.sagar@webcluesinfotech.com",
         password: "temp_sagar@admin",
      };
      resthelper.post("https://czbe.qa.webcluesstaging.com/api/v1/auth/login", request_body, true);
      resthelper.post("https://czbe.qa.webcluesstaging.com/api/v1/auth/login", request_body, false);
   });
});
