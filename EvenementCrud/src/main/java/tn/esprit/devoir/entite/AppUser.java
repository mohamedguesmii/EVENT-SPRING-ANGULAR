package tn.esprit.devoir.entite;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import java.io.Serializable;
import java.util.Date;


@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@Table(name = "User")
public class AppUser implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_user;

    private String name ;
    private String lastname ;
    private String password ;
    private String email ;
    @Temporal(TemporalType.DATE)
    private Date birthday ;
    private int phoneNumber ;
    private float wallet ;
    private String picture ;





}
