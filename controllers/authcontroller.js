var exports = (module.exports = {});

exports.signup = function(req, res) {
  res.render("signup");
};
exports.signin = function(req, res) {
  res.render("signin");
};
exports.dashboard = function(req, res) {
  console.log("NEEEWWW CONSOLE: ", req.user);
  res.render("dashboard", { user: req.user });
};
exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    res.redirect("/");
  });
};
