



 function  atualDate(){
    let atualDate = new Date(Date.now());
          let year = atualDate.getFullYear().toString();
          let day = atualDate.getDate().toString();
          let mount = atualDate.getMonth() + 1;
          let d = year + "-" + mount + "-" + day;

          return d


    
   
}

module.exports = {
   atualDate
   
 }