namespace Loans.Models;

public record LoanResultModel(
    int? Score,
    bool Result,
    string Message,
    decimal? LoanRate);
    