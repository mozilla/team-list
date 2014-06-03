# mocofoteamlist

`npm install mocofoteamlist`

### getHTMLSelectOptionsForTeams()

```JavaScript
var mocofoteamlist = require('mocofoteamlist');

mocofoteamlist.getHTMLSelectOptionsForTeams(function gotHTML (err, list) {
  if (err) {
    console.log(err);
  }
  // console.log(list);

  // Do something, for example
  // res.render('home', {
  //  list: list
  // });
});

```

You should render this list within a select tag
```html
<select>
  <option value="default">--Select</option>
  {{{ RENDER THE RETURNED LIST HERE }}}
</select>
```
