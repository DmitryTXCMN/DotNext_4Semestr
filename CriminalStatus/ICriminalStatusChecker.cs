namespace CriminalStatus;

public interface ICriminalStatusChecker
{
    public Task<bool> IsCriminalStatusCorrect(int passportNumber, bool isCriminalRecord);
}
