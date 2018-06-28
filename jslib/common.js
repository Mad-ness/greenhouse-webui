//
// Adds the pad method to the number datatype.
// It returns the string representation 
// of the number with the size number of 
// leading zeroes
//
Number.prototype.pad = function(size) {
    var s = String(this);
    while ( s.length < size ) {
        s = "0" + s;
    }
    return s;
}

//
// It converts the "value" seconds 
// to a string representation of 
// time like 00:00:00
//
function int2strtime(value) {
    var hrs = Math.trunc( value/(60*60) );
    var mins = Math.trunc(( value - hrs*60*60 )/60);
    var secs = value - hrs*60*60 - mins*60;
    return hrs.pad(2) + ":" + mins.pad(2) + ":" + secs.pad(2); 
}

