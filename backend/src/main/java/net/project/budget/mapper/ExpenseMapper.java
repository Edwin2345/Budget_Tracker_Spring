package net.project.budget.mapper;

import net.project.budget.dto.ExpenseDto;
import net.project.budget.entity.Expense;

public class ExpenseMapper {

    public static ExpenseDto mapToExpenseDto(Expense expense){
        return new ExpenseDto(
                expense.getId(),
                expense.getSummary(),
                expense.getAmount(),
                expense.getDate(),
                expense.getCategory().getId()
        );
    }

    public static Expense mapToExpense(ExpenseDto expenseDto){
         Expense newExpense =  new Expense();

         //Set all properties except joined category
         newExpense.setSummary( expenseDto.getSummary() );
         newExpense.setAmount( expenseDto.getAmount() );
         newExpense.setDate( expenseDto.getDate() );

         return newExpense;
    }
}
