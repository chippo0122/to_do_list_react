import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'
import { pushTask } from '../../redux/todosSlice'
import { pushMsg } from '../../redux/messageSlice'
import './index.scss'

export default function Input() {
    //redux dispatch
    const dispatch = useDispatch()
    //ref
    const insertInput = useRef();

    const setInput = () => {
        const { value } = insertInput.current;

        //prevent push empty data
        if(value === '') {
            dispatch(pushMsg({title: '輸入值不得為空', success: false}));
            return
        }
        //get random id & set create time
        const id = nanoid();
        const createTime = Date.now();
        const data = {
            title: value,
            id: id,
            createAt: createTime,
            finishAt: null,
            isFinish: false
        }
        //add task into local storage
        const local = JSON.parse(localStorage.getItem('todos')) || [];
        local.unshift(data);
        localStorage.setItem('todos', JSON.stringify(local));
        //add task into todos list
        dispatch(pushTask(data));
        //spread message to reminder component
        dispatch(pushMsg({title: '已加入待辦清單', success: true}));
        //clear input
        insertInput.current.value = ''
    }

    return (
        <div className='insert-section'>
            <input ref={insertInput} className='insert-input text-light' type="text" placeholder='請輸入待辦事項' />
            <button onClick={setInput} className='insert-btn bg-primary text-light'>加入</button>
        </div>
    )
}
