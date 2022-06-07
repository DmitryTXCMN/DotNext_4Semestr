namespace Loans.Services;

public class LoanRateCalculatorService
{
    public decimal CalculateLoanRate(int score) =>
        score switch
        {
            >= 100 => 12.5m,
            >= 96 => 15,
            >= 92 => 19,
            >= 88 => 22,
            >= 84 => 26,
            >= 80 => 30,
            //:)
            _ => 10000
        };
}
