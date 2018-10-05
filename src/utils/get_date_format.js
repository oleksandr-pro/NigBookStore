export default function getDateFormat(ddd) {
    const dArray = ddd.split(",");
    let dday = dArray[1];
    let dyear = dArray[2];
    dday = dday.split[" "];
    let ddate = dday[1];
    let dmonth = getMonth(dday[0]);
    return new Date(dyear, dmonth, ddate);
  }

function getMonth(dmonth="January"){
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];
    return monthNames.indexOf(dmonth);
}