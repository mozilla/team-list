var request = require('request');
var NodeCache = require( "node-cache" );

var SRC_LIST = 'http://mozilla.github.io/team-list/teams.txt';
var myCache = new NodeCache();

// Utilities

function removeQuotes(s) {
  s = s.replace(/["']/g, "");
  return s;
}

function trimArrayValues(toTrim) {
  var newArray = [];
  for (var i = 0; i < toTrim.length; i++) {
    newArray.push(toTrim[i].trim());
  }
  return newArray;
}

// Process

function parseSrcIntoOptions (src) {

  // an array to build up the items in the list
  var selectBuilder = [];
  // remove quotes to avoid html rendering issues
  src = removeQuotes(src);
  // split each row to process them individually
  var rows = src.split(/[\n\r]/g);

  // helper to make sure we close grouping html tags
  var optroupTagOpen = false;

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i].split(',');

    if (!row[0]) {
      // skip any empty lines or array items introduced by the split
      continue;
    }

    if (row[0].indexOf('#') === 0) {
      // starts with a #, so is a title row

      // if it's a new optgroup, close the previous one
      if (optroupTagOpen) {
        selectBuilder.push('</optgroup>');
      }

      var title = row[0].replace('#', '');
      selectBuilder.push('<optgroup lable="' + title + '">');

      // make sure this optgroup gets closed
      optroupTagOpen = true;

    } else {
      // This is a regular select option row

      // just sanity checking for unlikely weird rows rather than throwing errors
      if (row.length > 1) {
        // make things tidy
        row = trimArrayValues(row);

        var s = '<option value="'+ row[0] +'">'+ row[1] +'</option>';
        selectBuilder.push(s);
      }
    }
  }
  // close if this exists
  if (optroupTagOpen) {
    selectBuilder.push('</optgroup>');
  }

  // merge the array into a string
  var output = selectBuilder.join('\n');
  // cache this so we're not constantly pinging GH
  myCache.set( "teamList", output, 600000 ); // 10 mins

  return output;
}

function getSrcTeamList(callback) {
  // timer to check impact of loading
  console.time('getTeamList');

  // check cache
  var cache = myCache.get( "teamList" );

  // check if anythign is saved in the cache
  if (cache.teamList) {
    // Yes, use the cached list
    console.log('loaded from cache');
    console.timeEnd('getTeamList');

    callback(null, cache.teamList.toString());

  } else {
    // No, get this from gh-pages
    console.log('loading from gh-pages');

    request(SRC_LIST, function (err, res, body) {
      if (err) {
        console.log(err);
      }
      if (res.statusCode !== 200) {
        console.log('statusCode:', res.statusCode);
      }
      if (!err && res.statusCode == 200) {
        // Successfully fetched from gh-pages
        console.timeEnd('getTeamList');

        var output = parseSrcIntoOptions(body);
        callback(null, output);

      } else {
        callback('Error in getSrcTeamList()', null);
      }
    });
  }
}


function getHTMLSelectOptionsForTeams(callback) {
  getSrcTeamList(function gotSrcTeamList (err, res) {
    callback(err, res);
  });
}

module.exports = {
  getHTMLSelectOptionsForTeams: getHTMLSelectOptionsForTeams,
};
