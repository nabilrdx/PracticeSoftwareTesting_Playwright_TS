import { SearchTerms } from "../../interfaces/Product/SearchTerms";

export const PlpData = {

 search:{
    existing:"Hammer",
    nonExisting:"XYZ123"
 } satisfies SearchTerms,

 filter:{
    category:{
      Hammer: " Hammer ",
      Saw: " Saw "
    }
 },

 sort:{
    lowToHigh:"price,asc",
    highToLow:"price,desc"
 }

};