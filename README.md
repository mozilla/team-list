# team-list

A simple txt file with a list of team names that can be used in other tools.

### Who is using this?

This list is used in the following apps:

* [Adhoctribution](https://github.com/mozilla/adhoctribution/)
* [Mozbadging](https://github.com/mozilla/mozbadging/)

### Who is this for?

The primary use is to maintain one list of the teams who want to issue badges and count contributors in an easy to edit location.

### How do I add a team?

1. You will need a github account
2. Sign-in go github
3. [Look at this page to see how the names are formatted](http://mozilla.github.io/team-list/teams.txt)
    * The convention is:
        * A short code prefixed with moco of mofo and the team name
            * E.g. moco-teamname
        * Then a comma, and the full team name as it will be displayed to the user
4. [Click here to edit **teams.txt** using github](https://github.com/mozilla/team-list/edit/gh-pages/teams.txt)
5. "Commit Changes"
6. "Submit a Pull Request"

TODO: Check if this automatically creates a Fork for people who are not authorized to edit the repo directly.

#### Important notes

* Please ask before *changing* an existing name (as this may impact on reporting elsewhere)
* Team names are in alphabetical order

### How to consume this

The published list is at:

* http://mozilla.github.io/team-list/teams.txt


#### In a node app

`npm install mocofoteamlist`

* https://github.com/mozilla/team-list/tree/gh-pages/node

