var mocofoteamlist = require("./mocofoteamlist");

mocofoteamlist.getTeamSelectOptions(function gotTeamSelectOptions (err, res) {
  if (err) {
    console.log(err);
  }
  console.log(res);
});

// test caching effect on timing

setTimeout(function() {
  mocofoteamlist.getTeamSelectOptions(function gotTeamSelectOptions (err, res) {
    if (err) {
      console.log(err);
    }
    console.log(res);
  });
}, 1000);

setTimeout(function() {
  mocofoteamlist.getTeamSelectOptions(function gotTeamSelectOptions (err, res) {
    if (err) {
      console.log(err);
    }
    console.log(res);
  });
}, 2000);




