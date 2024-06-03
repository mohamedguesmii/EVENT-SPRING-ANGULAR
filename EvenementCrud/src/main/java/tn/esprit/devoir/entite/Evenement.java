package tn.esprit.devoir.entite;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Evenement implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long idevent;
    private String title;
    private String description;
    private  long capacity;
    private  String status;
    private Date datedebut;
    private Date datefin;
    private String adresse;
    private String image;
    private int starRating;






    @OneToMany(mappedBy = "evenement",cascade  = CascadeType.ALL)
    @JsonIgnore
    private List<Reservation> reservations;
    @OneToMany(mappedBy = "evenement", cascade =   CascadeType.ALL)
    @JsonIgnore
    private List<Ticket> ticket ;

}
