package net.project.budget.service.impl;

import lombok.AllArgsConstructor;
import net.project.budget.dto.ExpenseDto;
import net.project.budget.entity.Category;
import net.project.budget.entity.Expense;
import net.project.budget.exception.ResourceNotFoundException;
import net.project.budget.mapper.ExpenseMapper;
import net.project.budget.projection.ExpenseSummary;
import net.project.budget.repository.CategoryRepository;
import net.project.budget.repository.ExpenseRepository;
import net.project.budget.service.ExpenseService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ExpenseServiceImpl implements ExpenseService {

    private ExpenseRepository expenseRepository;
    private CategoryRepository categoryRepository;

    @Override
    public ExpenseDto createExpense(ExpenseDto expenseDto) {
        Expense newExpense = ExpenseMapper.mapToExpense( expenseDto );

        Category foundCategory = categoryRepository.findById( expenseDto.getCategoryId() )
                .orElseThrow(() -> new ResourceNotFoundException("category with following id not found: "+expenseDto.getCategoryId()));

        newExpense.setCategory( foundCategory );

        Expense savedExpense = expenseRepository.save( newExpense );
        return ExpenseMapper.mapToExpenseDto( savedExpense );
    }

    @Override
    public List<ExpenseDto> getAllExpensesOrderByDate() {
        List<Expense> foundExpenses = expenseRepository.getAllExpensesOrderByDate();
        return  foundExpenses.stream().map( (expense) -> ExpenseMapper.mapToExpenseDto(expense))
                .collect(Collectors.toList());
    }


    @Override
    public ExpenseDto getExpenseById(Long id) {
       Expense foundExpense = expenseRepository.findById( id )
                .orElseThrow(() -> new ResourceNotFoundException("category with following id not found: "+id));
        return ExpenseMapper.mapToExpenseDto(foundExpense);
    }


    @Override
    public List<ExpenseSummary> getAllExpenseSummaries() {
        return expenseRepository.getExpenseSummariesByCategory();
    }

    @Override
    public List<ExpenseDto> getRecentExpenses() {
        List<Expense> recentExpenses =  expenseRepository.getRecentExpenses();

       return  recentExpenses.stream().map( (expense) -> ExpenseMapper.mapToExpenseDto(expense))
                .collect(Collectors.toList());
    }

    @Override
    public List<ExpenseDto> searchExpensesBySummary(String rawReqSummary) {

        String reqSummary = "%"+rawReqSummary+"%";

        List<Expense> foundExpenses = expenseRepository.searchExpenses( reqSummary );

        return foundExpenses.stream().map( (expense) -> ExpenseMapper.mapToExpenseDto(expense))
                .collect(Collectors.toList());
    }


    @Override
    public ExpenseDto updateExpenseById(ExpenseDto updatedDto, Long id) {
        Expense foundExpense = expenseRepository.findById( id )
                .orElseThrow(() -> new ResourceNotFoundException("category with following id not found: "+id));

        Category foundCategory = categoryRepository.findById( updatedDto.getCategoryId() )
                .orElseThrow(() -> new ResourceNotFoundException("category with following id not found: "+updatedDto.getCategoryId()));


        foundExpense.setCategory( foundCategory);
        foundExpense.setSummary( updatedDto.getSummary() );
        foundExpense.setAmount( updatedDto.getAmount() );
        foundExpense.setDate( updatedDto.getDate() );

        Expense savedExpense = expenseRepository.save( foundExpense );
        return ExpenseMapper.mapToExpenseDto( savedExpense );
    }

    @Override
    public void deleteExpenseById(Long id) {
        expenseRepository.findById( id )
                .orElseThrow(() -> new ResourceNotFoundException("category with following id not found: "+id));

        expenseRepository.deleteById( id );
    }


}
