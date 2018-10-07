export default function getDateFormat(ddd) {
    const dArray = ddd.split(",");
    let dday = dArray[1].trim();
    let dyear = dArray[2].trim();
    dday = dday.match(/\S+/g)
    console.log('dday', dday);
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