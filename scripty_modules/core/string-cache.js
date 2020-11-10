(function() {
  return {
      set: (key, val) => {
        if (typeof val !== "string") {
          throw Error(`ERROR: Given value is not a string`);
        }
        
        sp.StoreString(key, val);
        
        return sp.GetStoredString(key);
      },
      get: (key) => {
        const data = sp.GetStoredString(key);
        
        if (data) {
          return {
            error: false,
            data
          }; 
        } else {
           return {
            error: true,
            data: `"${key}" returned no value.`
          }; 
        }
      }
    }
  }
})()