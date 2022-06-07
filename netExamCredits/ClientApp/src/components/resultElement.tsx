import Result from "../interfaces/Result";
import {Alert} from 'reactstrap';

function resultElement(props: Result) {
    return <div>
        {props.result != null
            ? <Alert color={props.result ? 'info' : 'danger'}>
                <p>{props.score != null ? 'Набрано очков: ' + props.score : ''}</p>
                <p>{props.result ? 'Кредит одобрен' : 'В кредите отклонено'}</p>
                <p>{props.message}</p>
                {props.LoanRate != null
                    ? <p>Ставка: {props.LoanRate}</p>
                    : ''}
            </Alert>
            : ''}
    </div>
}

export default resultElement;