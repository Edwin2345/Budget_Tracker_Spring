package net.project.budget.projection;

import java.math.BigDecimal;

public interface ExpenseSummary {
    Long getid();

    String getcategory();

    BigDecimal gettotal_amount();

    BigDecimal getaverage_expense();
}
