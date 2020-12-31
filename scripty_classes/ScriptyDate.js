class ScriptyDate {
  datestamp() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; 
    
    if (dd < 10) { dd = `0${dd}`; } 
    if (mm < 10) { mm = `0${mm}`; } 
    
    return `${mm}/${dd}/${today.getFullYear()}`;
  }
}

module.exports = ScriptyDate;
