package net.project.budget.controller;

import lombok.AllArgsConstructor;
import net.project.budget.dto.ExpenseDto;
import net.project.budget.service.ExpenseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import net.project.budget.projection.ExpenseSummary;
import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/summary")
public class SummaryController {
    private ExpenseService expenseService;

    //Get Expense Summaries By Category
    @GetMapping
    public ResponseEntity< List<ExpenseSummary> > getExpenseSummaries(){
         List<ExpenseSummary> expenseSummaries =  expenseService.getAllExpenseSummaries();
        return ResponseEntity.ok(expenseSummaries);
    }

    //Get top 3 most recent expenses
    @GetMapping("/recent")
    public ResponseEntity< List<ExpenseDto> > getRecentExpenses(){
        List<ExpenseDto> recentExpenses =  expenseService.getRecentExpenses();
        return ResponseEntity.ok(recentExpenses);
    }


    //Search For Expense
    @GetMapping("/search")
    public ResponseEntity< List<ExpenseDto> > searchForExpenses(@RequestParam("summary") String summary){
        List<ExpenseDto> foundExpenses =  expenseService.searchExpensesBySummary( summary );
        return ResponseEntity.ok(foundExpenses);
    }
}
