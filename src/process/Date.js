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

export {thisweek ,thismonth, thisquy, thisyear}