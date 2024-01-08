export const toCamelCase = function(str:string) {
    
     const first = str[0].toUpperCase();
     const strLower = str.toLowerCase();

     return strLower.replace(strLower[0], first);
    
}