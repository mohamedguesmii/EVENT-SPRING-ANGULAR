package tn.esprit.devoir.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.devoir.entite.Evenement;
import tn.esprit.devoir.repository.EvenementRepo;

import java.util.List;
import java.util.Optional;





@Slf4j
@Service
@AllArgsConstructor
public class EvenementServiceImp implements IEvenementService {

    EvenementRepo evenementRepo;
    FileStorageService fileStorageService;





    @Override
    public Evenement ajouterEvenement(Evenement evenement) {
        return evenementRepo.save(evenement);
    }

    @Override
    public Evenement updateEvenement(Evenement evenement) {
        return evenementRepo.save(evenement);
    }


    @Override
    public Evenement getEvenementById(Long id) {
        return evenementRepo.findById(id).orElse(null);
    }


    @Override
    public void deleteEvenement(Long id) {
        evenementRepo.deleteById(id);
    }

    @Override
    public List<Evenement> getAllEvenements() {
        return evenementRepo.findAll();
    }

    @Override
    public Evenement updateRating(Long id, int newRating) {
        Optional<Evenement> optionalEvaluation = evenementRepo.findById(id);

        if (optionalEvaluation.isPresent()) {
            Evenement evaluation = optionalEvaluation.get();
            evaluation.setStarRating(newRating);
            return evenementRepo.save(evaluation);
        }
        return null;

    }


    @Override
    public List<Evenement> getAllEvents() {
        return this.evenementRepo.findAll();
    }


    @Override
    public Evenement handleImageFileUpload(MultipartFile fileImage, long id) {
        if (fileImage.isEmpty()) {
            return null;
        }
        String fileName = fileStorageService.storeFile(fileImage);
        Evenement event = evenementRepo.findById(id).orElse(null);
        event.setImage(fileName);
        return evenementRepo.save(event);
    }

}
