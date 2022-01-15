import { useSelector } from "react-redux"
import RemindItem from "./RemindItem";

import './index.scss'

export default function Reminder() {
    const messages = useSelector(state => state.messages);

    return (
        <div className='reminder'>
            {
                messages.length > 0 ?
                messages.map((el, index) => {
                    return (
                        <RemindItem key={index} value={{...el, index}} />
                    )
                }) : ''
            }
        </div>
    )
}
