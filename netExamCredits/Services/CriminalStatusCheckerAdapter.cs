using CriminalStatus;
using Loans.Models;

namespace Loans.Services;

public class CriminalStatusCheckerAdapter
{
    private readonly ICriminalStatusChecker _criminalStatusChecker;

    public CriminalStatusCheckerAdapter(ICriminalStatusChecker criminalStatusChecker) =>
        _criminalStatusChecker = criminalStatusChecker;

    public async Task<bool> IsCriminalStatusCorrect(LoanForm loanForm) =>
        await _criminalStatusChecker.IsCriminalStatusCorrect(
            loanForm.PassportNumber!.Value,
            loanForm.CriminalRecord!.Value);
}
