function propagateIds() {


  var elements = document.getElementsByTagName('tr');

  var length = elements.length;
  console.log(length);

  
  for (var i = 1; i < length; i++) {
    elements[i].id = i+" place";
    console.log(elements[i]);
    document.body.insertAdjacentHTML( 'afterbegin', '<td id="' + i + ' place">' + i + '</td>' );
  }
}

function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x))
    x = x.replace(pattern, "$1,$2");
return x;
}

function processHandle(handle) {
	var re = /((^@)(.*))/;
	var newstr = handle.replace(re, "<a href='http://twitter.com/$3'>$1</a>");
	return newstr;
}