class Path { 
  title = "Mastercam";
  width = 400;
  ratio = 16/9;
  
  data = {
    partNumber: 5,
    currentPath: "p/a/t/h"
  };
  
  html() {
    return String.raw`
      <h3>{{ partNumber }}</h3>
      <p>{{ currentPath }}</p>`;
  }
  
  onkeyup = `alert(e)`;
}

module.exports = Path;