import { InputHTMLAttributes , FC} from "react";
import "./form-input.styles.scss";

type FormInputProp = {label : string} & InputHTMLAttributes<HTMLInputElement>

const FormInput : FC<FormInputProp> = ({label,...otherProps}) => {

    return(
        <div className="group">
            <input className="form-input"{...otherProps}/>
            {label &&(<label className = {`${Boolean(otherProps.value && typeof otherProps.value === "string" && otherProps.value.length) ? 'shrink' : null} form-input-label`}>{label}</label>)}
        </div>
    )

}

export default FormInput;