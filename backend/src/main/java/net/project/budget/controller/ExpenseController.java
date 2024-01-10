package net.project.budget.controller;

import lombok.AllArgsConstructor;
import net.project.budget.dto.ExpenseDto;
import net.project.budget.service.ExpenseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private ExpenseService expenseService;

    //Create New Expense
    @PostMapping
    public ResponseEntity<ExpenseDto> createNewExpense(@RequestBody ExpenseDto expenseDto){
        ExpenseDto savedExpense =  expenseService.createExpense( expenseDto );
        return new ResponseEntity<>(savedExpense, HttpStatus.CREATED);
    }

    //Get All Expenses
    @GetMapping
    public ResponseEntity<List<ExpenseDto>> getAllExpenses(){
        List<ExpenseDto> foundExpenses = expenseService.getAllExpensesOrderByDate();
        return ResponseEntity.ok(foundExpenses);
    }


    //Get Expense By id
    @GetMapping("/{id}")
    public ResponseEntity<ExpenseDto> getExpenseById(@PathVariable("id") Long id){
        ExpenseDto foundExpense = expenseService.getExpenseById( id );
        return ResponseEntity.ok(foundExpense);
    }


    //Update Expense By Id
    @PutMapping("/{id}")
    public ResponseEntity<ExpenseDto> updateExpenseByid(@RequestBody ExpenseDto updatedExpense,
                                                        @PathVariable("id") Long id){

        ExpenseDto savedExpense = expenseService.updateExpenseById( updatedExpense, id);
        return ResponseEntity.ok( savedExpense );
    }


    //Delete Expense By Id
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteExpenseById(@PathVariable("id") Long id){
        expenseService.deleteExpenseById( id );
        return ResponseEntity.ok("Expense with following id deleted: "+id);
    }
}
