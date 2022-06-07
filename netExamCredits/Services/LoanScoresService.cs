using Loans.Models;

namespace Loans.Services;

public class LoanScoresService
{
    public int CountScore(LoanForm loanForm)
    {
        var score = 0;

        score += loanForm.Age switch
        {
            >= 21 and <= 28 => loanForm.Sum switch
            {
                < 1000000 => 12,
                < 3000000 => 9,
                _ => 0
            },
            >= 29 and <= 59 => 14,
            >= 60 and <= 72 => loanForm.Pledge is not Pledge.NonPledge ? 8 : 0,
            _ => 0
        };

        score += loanForm.CriminalRecord!.Value ? 0 : 15;

        score += loanForm.Employment switch
        {
            Employment.Unemployed => 0,
            Employment.Ip => 12,
            Employment.Tk => 14,
            Employment.NonTk => 8,
            Employment.Pensioner => loanForm.Age < 70 ? 5 : 0,
            _ => 0
        };

        score += loanForm.Goal switch
        {
            Goal.Consumer => 14,
            Goal.RealEstate => 8,
            Goal.OnLending => 12,
            _ => 0
        };

        score += loanForm.Pledge switch
        {
            Pledge.RealEstate => 14,
            Pledge.Auto => loanForm.AutoAge < 3 ? 8 : 3,
            Pledge.Guarantee => 12,
            Pledge.NonPledge => 0,
            _ => 0
        };

        score += loanForm.OtherLoans!.Value
            ? 0
            : loanForm.Goal is Goal.OnLending
                ? 0
                : 15;

        score += loanForm.Sum switch
        {
            <= 1000000 => 12,
            <= 5000000 => 14,
            <= 10000000 => 8,
            _ => 0
        };

        return score;
    }
}
