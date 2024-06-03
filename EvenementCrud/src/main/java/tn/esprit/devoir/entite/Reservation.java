package tn.esprit.devoir.entite;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Reservation implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idreserv;
    private  String nomreserv;
    private long nbrplace;
    private String type;
    private String description;
    private Date datereserv;
    @ManyToOne
    private Evenement evenement;
    @ManyToOne
    @JsonIgnore
    private  AppUser appuser;


}
