using Microsoft.AspNetCore.Mvc;
using Loans.Models;
using Loans.Services;

// ReSharper disable StringLiteralTypo

namespace Loans.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class LoanDealingController : ControllerBase
{
    private readonly CriminalStatusCheckerAdapter _criminalStatusChecker;
    private readonly LoanScoresService _LoanScores;
    private readonly LoanRateCalculatorService _LoanRateCalculator;

    public LoanDealingController(CriminalStatusCheckerAdapter criminalStatusChecker, LoanScoresService LoanScores,
        LoanRateCalculatorService LoanRateCalculator)
    {
        _criminalStatusChecker = criminalStatusChecker;
        _LoanScores = LoanScores;
        _LoanRateCalculator = LoanRateCalculator;
    }

    [HttpPost]
    public async Task<IActionResult> GetLoan([FromBody]LoanForm loanForm)
    {
        var criminalStatusIsCorrect = await _criminalStatusChecker.IsCriminalStatusCorrect(loanForm);
        if (!criminalStatusIsCorrect)
            return new JsonResult(new LoanResultModel(null, false,
                "У вас обнаружена судимость. Подтвердите её.", null));
        
        var score = _LoanScores.CountScore(loanForm);
        
        if (score < 80)
            return new JsonResult(new LoanResultModel(score, false,
                "Вам не одобрено получение кредита", null));
        
        var loanRate = _LoanRateCalculator.CalculateLoanRate(score);
        return new JsonResult(new LoanResultModel(score, true,
            $"Вам могут одобрить кредит под {loanRate}%. Свяжитесь со специалистом для продолжения: +7 (800) 555-35-35", loanRate));
    }
}
