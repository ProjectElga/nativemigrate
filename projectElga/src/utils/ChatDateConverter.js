import moment from "moment";
import STRINGS from "../constants/Strings";

const ChatDateConverter = (date) =>{
    const today = moment().format(moment(new Date()).format("DD-MMM-YYYY"))
    if(moment(today).isSame(date, 'day')){
        console.log("date",date)
        return STRINGS.TODAY;
        
    }
    if(moment(today).diff(date, 'days') === -1){
        return STRINGS.YESTERDAY
    }
    else{
        return moment(date).format(STRINGS.DATE_FORMAT)
    }

}
  export default ChatDateConverter;