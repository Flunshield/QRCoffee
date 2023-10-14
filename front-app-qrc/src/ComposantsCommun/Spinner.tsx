import spinnerPrimary from '../Images/spinnerPrimary.svg';
import spinnerTertiary from '../Images/spinnerTertiary.svg';
import '../StyleCss/Spinner.css';

export const SpinnerPrimary = () => {
    return (
        <div className="spinner">
            <img src={spinnerPrimary} alt="logo"/>
        </div>
    )
}

export const SpinnerTertiary = () => {
    return (
        <div className="spinner">
            <img src={spinnerTertiary} alt="logo"/>
        </div>
    )
}
