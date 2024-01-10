package net.project.budget.repository;

import net.project.budget.entity.Expense;
import net.project.budget.projection.ExpenseSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    @Query(value="SELECT c.id, c.category, SUM(e.amount) AS total_amount, ROUND(AVG(e.amount),2) AS average_expense FROM  expenses AS e INNER JOIN categories AS c ON e.category_id = c.id GROUP BY c.category, c.id ORDER BY c.id",
           nativeQuery = true)
    List<ExpenseSummary> getExpenseSummariesByCategory();


    @Query(value="SELECT * FROM expenses ORDER BY date DESC LIMIT 3",
            nativeQuery = true)
    List<Expense> getRecentExpenses();

    @Query(value="SELECT * FROM expenses WHERE summary LIKE :reqSummary",
            nativeQuery = true
          )
    List<Expense> searchExpenses(@Param("reqSummary") String reqSummary);


    @Query(value="SELECT * FROM expenses ORDER BY date DESC",
            nativeQuery = true
    )
    List<Expense> getAllExpensesOrderByDate();









}
