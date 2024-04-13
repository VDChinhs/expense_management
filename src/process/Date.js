const thisweek = (date) =>{
    if (date.getDay() != 0) {
        start = date.getTime() + (1 - date.getDay()) * (1000 * 60 * 60 * 24)
        end = start + 6 * (1000 * 60 * 60 * 24)
    } else {
        end = date.getTime()
        start = date.getTime() -6 * (1000 * 60 * 60 * 24)
    }
    return [new Date(start),new Date(end)]
    console.log("Tuần-----------------");
    console.log(new Date(start));
    console.log(new Date(end));
}
const thismonth = (date) =>{
    return [new Date(date.getFullYear(),(date.getMonth()), 1), new Date(date.getFullYear(),(date.getMonth()+1), 0)]
    console.log("Tháng-----------------");
    console.log(new Date(date.getFullYear(),(date.getMonth()), 2));
    console.log(new Date(date.getFullYear(),(date.getMonth()+1), 1));

}
const thisquy = (date) =>{
    start = date.getFullYear() + '-'+ (((Math.floor(((date.getMonth() + 1) - 1) / 3) + 1) - 1) * 3 + 1) + '-' + 1
    end = date.getFullYear() + '-' + ((((Math.floor(((date.getMonth() + 1) - 1) / 3) + 1) - 1) * 3 + 3)) + '-' + 30
    return [new Date(start),new Date(date.getFullYear(), (((((Math.floor(((date.getMonth() + 1) - 1) / 3) + 1) - 1) * 3 + 3)) ), 0)]

    console.log("Quý-----------------");
    console.log(new Date(start));
    console.log(new Date(end));
}
const thisyear = (date) =>{
    start = date.getFullYear() + '-'+ 1 +'-' + 1
    end = date.getFullYear() + '-' + 12 + '-' + 31
    return [new Date(start),new Date(end)]

    console.log("Năm-----------------");
    console.log(new Date(start));
    console.log(new Date(end));
}

function getDate(time){
    if ((new Date(time)).getDate() <= 9) {
        return(0+''+(new Date(time)).getDate())    
    }
    return((new Date(time)).getDate())
}
function getDay(time){
    if ((new Date(time)).getDay() == 0) {
        return "Chủ nhật"   
    }
    return "Thứ " + ((new Date(time)).getDay() + 1)
}
function getWeekMonth(time, mode){
    if (mode == 'sort') {
        return+((new Date(time)).getMonth() + 1) + "/" + ((new Date(time)).getFullYear())
    }
    return "Tháng " + ((new Date(time)).getMonth() + 1) + " " + ((new Date(time)).getFullYear())
}

function getRangeDate(start, end) {
    return (((end - start) / (1000*60*60*24)) + 1).toFixed()
}

function getFullDate(time) {
    var date = new Date(time).getDate();
    var month = new Date(time).getMonth() + 1;
    var year = new Date(time).getFullYear();
    return date + '/' + month + '/' + year
}

function convertFirstDay(time) {
    return time.toISOString().split('T')[0] + 'T00:00:00.000Z'
}

export {thisweek ,thismonth, thisquy, thisyear, getDate, getDay, getWeekMonth, getRangeDate, getFullDate, convertFirstDay}