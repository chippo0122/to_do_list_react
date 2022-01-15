import { useDispatch } from 'react-redux'
import { deleteTask, setStatus } from '../../../redux/todosSlice'
import { pushMsg } from '../../../redux/messageSlice';
import './index.scss'

export default function ListItem(props) {
    //redux
    const dispatch = useDispatch();
    //get props
    const { id, title, createAt, finishAt, isFinish } = props.task;
    //methods
    const deleteTarget = (id) => {
        return () => {
            const local = JSON.parse(localStorage.getItem('todos')) || [];
            const newLocal = local.filter(el => el.id !== id);
            localStorage.setItem('todos', JSON.stringify(newLocal));
            //update to redux
            dispatch(deleteTask(id));
            //spread message to reminder
            dispatch(pushMsg({ title: '已刪除待辦事項', success: false }));
        }
    }

    const setFinish = (id) => {
        return () => {
            const time = Date.now();
            //update status to local storage
            const local = JSON.parse(localStorage.getItem('todos')) || [];
            const newLocal = local.map(el => {
                if (el.id === id) {
                    if (el.isFinish) {
                        el.isFinish = false;
                        el.finishAt = null;
                    } else {
                        el.isFinish = true;
                        el.finishAt = time;
                    }
                }
                return el
            });
            localStorage.setItem('todos', JSON.stringify(newLocal));
            //update status to redux store
            dispatch(setStatus({ id, time }));
            //spread message to reminder
            dispatch(pushMsg({ title: '已更新狀態', success: true }));
        }
    }

    const timeTransor = (timestamp) => {
        const time = new Date(timestamp);
        const month = time.getMonth() + 1;
        const date = time.getDate();
        const hour = time.getHours();
        const mins = time.getMinutes();
        const fixer = (num) => {
            return num < 10 ? `0${num}` : num;
        }

        return `${fixer(month)}/${fixer(date)} ${fixer(hour)}:${fixer(mins)}`;
    }

    return (
        <div className="list-item bg-brown text-light">
            <label className='item-check'>
                <input checked={isFinish} onChange={setFinish(id)} type="checkbox" />
                <span className="checkmark"></span>
            </label>
            <div className="info-sec">
                <p style={{ textDecoration: isFinish ? 'line-through' : 'unset' }} className='title'>{title}</p>
                <div className='timeinfo-sec'>
                    <p className='set-time'>{`創建於 : ${timeTransor(createAt)}`}</p>
                    {
                        isFinish ?
                            <p className='set-time'>{` 完成於 : ${timeTransor(finishAt)}`}</p>
                            : ''
                    }
                </div>
            </div>
            <button onClick={deleteTarget(id)} className="del-btn">
            </button>
        </div>
    )
}
