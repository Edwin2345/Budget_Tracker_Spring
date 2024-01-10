package net.project.budget.service;

import net.project.budget.dto.ExpenseDto;
import net.project.budget.projection.ExpenseSummary;

import java.util.List;

public interface ExpenseService {
    public ExpenseDto createExpense(ExpenseDto expenseDto);

    public List<ExpenseDto> getAllExpensesOrderByDate();

    public ExpenseDto getExpenseById(Long id);

    public List<ExpenseSummary> getAllExpenseSummaries();

    public List<ExpenseDto> getRecentExpenses();

    public List<ExpenseDto> searchExpensesBySummary( String rawReqSummary );

    public ExpenseDto updateExpenseById(ExpenseDto updatedExpense, Long id);

    public void deleteExpenseById(Long id);


}
