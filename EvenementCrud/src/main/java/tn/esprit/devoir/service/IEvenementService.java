package tn.esprit.devoir.service;

import org.springframework.web.multipart.MultipartFile;
import tn.esprit.devoir.entite.Evenement;

import java.util.List;

public interface IEvenementService {


     Evenement handleImageFileUpload(MultipartFile fileImage, long id) ;
   // Lesson handleImageFileUpload(MultipartFile fileImage, long id);


    public Evenement ajouterEvenement(Evenement evenement);
    public Evenement updateEvenement(Evenement evenement);
    Evenement getEvenementById(Long id);
    void deleteEvenement(Long id);
    public List<Evenement> getAllEvenements();
    Evenement updateRating(Long id, int newRating);


    List<Evenement> getAllEvents();


}
