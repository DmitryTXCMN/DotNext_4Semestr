using System.ComponentModel.DataAnnotations;

namespace Loans.Models;

public record LoanForm(
    string Fio,
    int? PassportSeries,
    int? PassportNumber,
    string PassportGiven,
    DateTime? PassportGivenDate,
    string PassportRegistration,
    int? Age,
    bool? CriminalRecord,
    decimal? Sum,
    Goal? Goal,
    Employment? Employment,
    bool? OtherLoans,
    Pledge? Pledge,
    int? AutoAge
);

public enum Goal
{
    Consumer = 1,
    RealEstate = 2,
    OnLending = 3
}

public enum Employment
{
    Unemployed = 1,
    Ip = 2,
    Tk = 3,
    NonTk = 4,
    Pensioner = 5
}

public enum Pledge
{
    RealEstate = 1,
    Auto = 2,
    Guarantee = 3,
    NonPledge = 4
}
