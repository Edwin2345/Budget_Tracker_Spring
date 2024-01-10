package net.project.budget.entity;

import jakarta.persistence.*;
import lombok.*;


import java.math.BigDecimal;
import java.time.LocalDate;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="expenses")
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="summary", length = 30, nullable = false)
    private String summary;

    @Column(name="amount", precision = 7, scale = 2, nullable = false)
    private BigDecimal amount;

    @Temporal(TemporalType.DATE)
    @Column(name="date", nullable = false)
    private LocalDate date;

    @ManyToOne()
    @JoinColumn(name = "category_id")
    private Category category;

}
