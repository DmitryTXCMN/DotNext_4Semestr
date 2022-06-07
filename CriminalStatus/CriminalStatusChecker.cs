namespace CriminalStatus;

public class CriminalStatusChecker : ICriminalStatusChecker
{
    public async Task<bool> IsCriminalStatusCorrect(int passportNumber, bool isCriminalRecord)
        => CriminalStatusServiceEmulator.LoadCriminalRecords().Contains(passportNumber) == isCriminalRecord;
}
