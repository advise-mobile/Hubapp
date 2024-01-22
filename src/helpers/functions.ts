export const toCamelCase = function(str:string) {
    
     const first = str[0].toUpperCase();
     const strLower = str.toLowerCase();

     return strLower.replace(strLower[0], first);
    
}

export const removeNull = function (data:any){
     
     Object.keys(data).forEach(key => {
          if (data[key] == null) {
               delete data[key];
          }
          });
     return data;
}