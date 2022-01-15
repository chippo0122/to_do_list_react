import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { deleteMsg } from '../../../redux/messageSlice'

import './index.scss'

export default function RemindItem(props) {
    //redux
    const dispatch = useDispatch();

    //props
    const { title, success, index } = props.value

    //customize class depends on props status
    const itemClass = success ? 'remind-item success' : 'remind-item danger';

    //methods
    const deleteTarget = (index) => {
        return () => {
            dispatch(deleteMsg(index))
        }
    };

    useEffect(() => {
        //item will be umnount in 3 secs later automatically
        const timer = setTimeout(() => {
            dispatch(deleteMsg(index));
        }, 3000);

        return () => {
            clearTimeout(timer)
        }
    }, [])

    return (
        <div className={itemClass}>
            <p>{title}</p>
            <button onClick={deleteTarget(index)} className="close-btn"></button>
        </div>
    )
}
