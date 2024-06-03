package tn.esprit.devoir.controllers;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.devoir.entite.Evenement;
import tn.esprit.devoir.service.IEvenementService;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@AllArgsConstructor
@Slf4j
@FieldDefaults(level= AccessLevel.PRIVATE)
@RequestMapping("/api/evenements")
public class EventController {
    @Autowired
    IEvenementService iEvenementService;




    @GetMapping("/AllEvenements")
    public List<Evenement> gettingallEvenements(){
       return iEvenementService.getAllEvenements();}


   @GetMapping("/EvenementById/{idevent}")
    public Evenement gettingEvenement(@RequestParam("idevent") Long idevent){
        return iEvenementService.getEvenementById(idevent);
    }

    @GetMapping("/events/front")
    List<Evenement> getAllEvent(){
        return iEvenementService.getAllEvents();
    }




    @PostMapping("/add-evenement")
    public void addEvenement(@RequestBody Evenement e) {

        iEvenementService.ajouterEvenement(e);
    }



    @PutMapping("/updateEvenement")
    @ResponseBody
    public Evenement updateEvenement(@RequestBody Evenement e){
        return iEvenementService.updateEvenement(e);
    }




    @DeleteMapping("/deleteEvenement/{id}")
    public void deleteEvenement(@PathVariable("id") Long id){iEvenementService.deleteEvenement(id);
    }





    //rating
    @PutMapping("/rating/{id}")
    public ResponseEntity<Evenement> updateRating(@PathVariable Long id, @RequestBody Evenement updatedEvaluation) {
        Evenement evaluation = iEvenementService.updateRating(id, updatedEvaluation.getStarRating());

        if (evaluation != null) {
            return new ResponseEntity<>(evaluation, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    //image

    @CrossOrigin(origins = "*", allowedHeaders = "Requestor-Type", exposedHeaders = "X-Get-Header")
    @PostMapping("/dashboard/clubs/events/uploadImage/{id}")
    public Evenement handleImageFileUpload(@RequestParam("fileImage") MultipartFile fileImage, @PathVariable long id) {
        return iEvenementService.handleImageFileUpload(fileImage,id);
    }






}
