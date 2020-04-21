 function DateFormat(date) {
    const today=new Date(date);
    let day = today.getDate();
    let month = today.getMonth()+1; 
    let yyyy = today.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    const  dateFormat ={};
    dateFormat.yyyy_mm_dd=yyyy+'-'+month+'-'+day;
    dateFormat.dd_mm_yyyy=day+'-'+month+'-'+yyyy;
    return dateFormat;
}
export default DateFormat;