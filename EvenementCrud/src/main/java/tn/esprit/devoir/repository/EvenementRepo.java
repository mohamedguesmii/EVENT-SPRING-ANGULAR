package tn.esprit.devoir.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.devoir.entite.Evenement;
public interface EvenementRepo  extends  JpaRepository<Evenement,Long>{
}
