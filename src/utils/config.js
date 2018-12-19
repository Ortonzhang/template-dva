export const prefix = `${process.env.PROJECT_NAME}`

export const filterParams = (obj) => {
  let _newPar = {};
  for (let key in obj) {
      if (obj[key] && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
          _newPar[key] = obj[key];
      }
  }
  return _newPar;
}

export const date_format = (date) => {
  if(!date){
    return '----'
  }else{
    var d = new Date(date);
    var year = d.getFullYear();
    var month = ('0' + (d.getMonth() + 1)).slice(-2);
    var day = ('0' + (d.getDate())).slice(-2);
    var hour = ('0' + (d.getHours())).slice(-2);
    var minutes = ('0' + (d.getMinutes())).slice(-2);
    var seconds = ('0' + (d.getSeconds())).slice(-2);
    return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
  }
}


export const downloadUrl = url => {
  let iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  document.body.appendChild(iframe)
  setTimeout(() => {
    // document.body.removeChild(iframe)
  }, 1000)
}
export const pickObj = (obj, arr) => arr.reduce((acc, curr)=> (curr in obj && (acc[curr] = obj[curr]), acc), {})