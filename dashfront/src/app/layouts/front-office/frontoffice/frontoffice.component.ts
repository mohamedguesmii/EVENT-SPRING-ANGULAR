import { Component, OnInit } from '@angular/core';
import { ActualiteService } from 'app/services/actualiteService/actualite.service';

@Component({
  selector: 'app-frontoffice',
  templateUrl: './frontoffice.component.html',
  styleUrls: ['./frontoffice.component.css']
})
export class FrontofficeComponent implements OnInit {
  actualites
    commentaire
    like=false
    dislike=false
  constructor(private actualiteService:ActualiteService) { }

  ngOnInit(): void {
    this.actualiteService.getall().subscribe(
        (result)=>{
        this.actualites=result
          console.log(result);

        },
        (error)=>{
          console.log(error)
        }


    )
  }
    Like(id:any){

        this.actualiteService.updateStatus(true,id).subscribe(
            (result)=>{
this.like=true;
            },
            (error)=>{
                console.log(error)
            }
        )

    }

    DisLike(id:any){
        this.actualiteService.updateStatus(false,id).subscribe(
            (result)=>{
                this.dislike=true;


            },
            (error)=>{
                console.log(error)
            }
        )

    }


    addComment(idact: any){
        console.log("dsddss",idact)
        console.log("bbbbb",this.commentaire)
this.actualiteService.addComment(idact,this.commentaire).subscribe((result)=>{

    this.actualiteService.getall().subscribe(
        (result)=>{
            this.actualites=result
            console.log(result);

        },
        (error)=>{
            console.log(error)
        }


    )

    console.log(result);
    console.log()

},(error)=>{
    console.log(error)
});
    }

    updateStatus(status,id){



    }

    shareData: ShareData = {
        url: 'https://github.com/mohamedguesmii',
        description: 'dev',
        tags: 'hussein_AbdElaziz',
      };
    
      shareLinks: ShareLinks[] = [
        {
          title: 'fb',
          link: `https://www.facebook.com/sharer.php?u=${this.shareData?.url}`,
        },


      ];

}
 type ShareData = { url: string; description: string; tags: string };
 type ShareLinks = { title: string; link: string };
