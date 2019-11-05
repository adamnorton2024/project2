var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.User.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/stats", function(req, res) {
    res.render("stats");
  });

  app.get("/details", function(req, res) {
    res.render("details");
  });

  // Load example page and pass in an example by id
  app.get("/:username", function(req, res) {
    var requestID = req.params.username;
    db.User.findAll({
      where: { username: requestID },
      include: [db.activities]
    }).then(function(data) {
      console.log(data);
      res.render("stats", {
        Users: data
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
