import React, {useState} from "react";
import './loanForm.css'
import axios from '../Services/axios'
import ResultElement from "../components/resultElement";
import Result from '../interfaces/Result'

function LoanForm() {
    const [fio, setFio] = useState<string>();
    const [passportSeries, setPassportSeries] = useState<number>();
    const [passportNumber, setPassportNumber] = useState<number>();
    const [passportGiven, setPassportGiven] = useState<string>();
    const [passportGivenDate, setPassportGivenDate] = useState<Date>();
    const [passportRegistration, setPassportRegistration] = useState<string>();
    const [age, setAge] = useState<number>();
    const [criminalRecord, setCriminalRecord] = useState<boolean>(false);
    const [sum, setSum] = useState<number>();
    const [goal, setGoal] = useState<number>(1);
    const [employment, setEmployment] = useState<number>(1);
    const [otherLoans, setOtherLoans] = useState<boolean>(false);
    const [pledge, setPledge] = useState<number>(1);
    const [autoAge, setAutoAge] = useState<number>();
    
    const [result, setResult] = useState<Result>({
        score: null,
        result: null,
        message: null,
        LoanRate: null
    });

    async function handleForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = {
            fio,
            passportSeries,
            passportNumber,
            passportGiven,
            passportGivenDate,
            passportRegistration,
            age,
            criminalRecord,
            sum,
            goal,
            employment,
            otherLoans,
            pledge,
            autoAge
        };
        console.log(data);
        fetch('/LoanDealing/GetLoan',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => {
                console.log(setResult(res))
            });
    }

    return <div>
        <h1>????????????</h1>
        <form onSubmit={handleForm} id="form">
            <div>
                <p>??????:</p>
                <input id='FIO' placeholder='??????' required pattern="^([??-??][??-??]{2,}\s[??-??][??-??]{2,}\s[??-??][??-??]{2,}+)|([A-Z][a-z]{2,}\s[A-Z][a-z]{2,}\s[A-z][a-z]{2,})$"
                   onChange={e => setFio(e.target.value)}/>
            <p>??????????????</p>
            <div id="passport">
                <input id='passS' type='number' placeholder='??????????' required min={1000} max={9999}
                       onChange={e => setPassportSeries(Number.parseInt(e.target.value))}/>
                <input id='passN' type='number' placeholder='??????????' required min={100000} max={999999}
                       onChange={e => setPassportNumber(Number.parseInt(e.target.value))}/>
                <input id='passO' placeholder='?????? ??????????' required minLength={10} maxLength={40}
                       onChange={e => setPassportGiven(e.target.value)}/>
                <input id='passD' placeholder='???????? ????????????' type='date' required min='1900-01-01' max='2022-01-01'
                       onChange={e => setPassportGivenDate(new Date(e.target.value))}/>
                <input id='passP' placeholder='????????????????' required minLength={5} maxLength={40}
                       onChange={e => setPassportRegistration(e.target.value)}/>
            </div>
            <p>??????????????:</p>
            <input id='age' type='number' placeholder='??????????????' required min={18} max={100}
                   onChange={e => setAge(Number.parseInt(e.target.value))}/>
            <p>??????????????????:</p>
                <input type='checkbox' onChange={e => setCriminalRecord(e.target.checked)}/>
            </div>
            <div>
                <p>?????????? ??????????????:</p>
                <input type='number' step='0.01' placeholder='?????????? ??????????????' required min={10000} max={100000000}
                       onChange={e => setSum(Number.parseInt(e.target.value))}/>
                <p>????????:</p>
                <select required onChange={e => setGoal(Number.parseInt(e.target.value))}>
                    <option value='1'>?????????????????????????????? ????????????</option>
                    <option value='2'>????????????????????????</option>
                    <option value='3'>????????????????????????????????</option>
                </select>
                <p>??????????????????????????????:</p>
                <select required onChange={e => setEmployment(Number.parseInt(e.target.value))}>
                    <option value='1'>??????????????????????</option>
                    <option value='2'>????</option>
                    <option value='3'>?????????????? ???? ????</option>
                    <option value='4'>?????? ????????????????</option>
                    <option value='5'>??????????????????</option>
                </select>
                <p>???????????? ??????????????:</p>
                <input type='checkbox' onChange={e => setOtherLoans(e.target.value == 'on')}/>
                <p>??????????:</p>
                <select required onChange={e => {
                    setPledge(Number.parseInt(e.target.value));
                    if (e.target.value == '2')
                    { // @ts-ignore
                        document.getElementById('carAge').style.display = 'inherit';
                    }
                    else
                    { // @ts-ignore
                        document.getElementById('carAge').style.display = 'none';
                    }
                }
                }>
                    <option value='1'>????????????????????????</option>
                    <option value='2'>????????????????????</option>
                    <option value='3'>????????????????????????????</option>
                    <option value='4'>?????? ????????????</option>
                </select>
                <div id="carAge">
                    <p>?????????????? ???????? ?? ??????????, ???????? ?????????? - ????????:</p>
                    <input type='number' onChange={e => setAutoAge(Number.parseInt(e.target.value))}/>
                </div>
            </div>
            <input type='submit' value='???????????????? ????????????'/>
        </form>
        <br/>
        <ResultElement score={result.score} result={result.result} message={result.message} LoanRate={result.LoanRate}/>
    </div>
}

export default LoanForm