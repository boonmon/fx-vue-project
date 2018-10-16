/**
 * 时间格式化
 * yyyy-MM-dd HH:mm:ss
 * @param {Date} data
 */
export default (data,format_style) => {
    if(!data){
        return '';
    }
    let now = new Date(parseInt(data))
    let year = padZero(now.getFullYear())
    let month = padZero(now.getMonth() + 1)
    let date = padZero(now.getDate())
    let hour = padZero(now.getHours())
    let minute = padZero(now.getMinutes())
    let second = padZero(now.getSeconds())
    if(!format_style){
      return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
    }else{
      format_style = format_style.replace("yyyy",year); 
      format_style = format_style.replace("MM",month);  
      format_style = format_style.replace("dd",date);  
      format_style = format_style.replace("HH",hour);
      format_style = format_style.replace("mm",minute); 
      format_style = format_style.replace("ss",second); 
      return format_style;
    }
}

export const toDate = data => {
    if(!data){
        return '';
    }
    let _data = data.replace(/-/g,'/').replace(/T/g,' ')
    if(_data.indexOf('.')) {
        _data = _data.split('.')[0]
    }
    console.log('_data',_data)
    let now = new Date(_data)
    let year = padZero(now.getFullYear())
    let month = padZero(now.getMonth() + 1)
    let date = padZero(now.getDate())
    return year + '-' + month + '-' + date
}


const padZero = val => (val < 10 ? '0' + val : val)
