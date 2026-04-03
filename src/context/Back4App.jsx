import Parse from "parse/dist/parse.min.js";

Parse.initialize(
  "YOUR_APPLICATION_ID",
  "YOUR_JAVASCRIPT_KEY"
);

Parse.serverURL = "https://parseapi.back4app.com";

export default Parse;