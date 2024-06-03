import { Image } from "./Image";

export interface Evenement {
  name: any;
  comments: any;
  likes: any;
    

    idevent : number ;
    title : string;
     description : string;
      capacity :number;
      status:string;
     datedebut: Date ;
     datefin: Date;
     adresse: string;
     image: String;
     starRating:number;
     imagecloud?: Image

}
 