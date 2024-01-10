package net.project.budget.dto;


import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.project.budget.entity.Category;

import java.math.BigDecimal;
import java.time.LocalDate;



@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseDto {
    private Long id;
    private String summary;
    private BigDecimal amount;
    private LocalDate date;
    private Long categoryId;
}
