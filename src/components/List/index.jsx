import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { initialByLocal } from '../../redux/todosSlice'
import ListItem from './ListItem'
import './index.scss'

export default function List() {
    //redux
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos);
    //ref
    const list = useRef();

    useEffect(() => {
        //initialize todos data from local storage
        const data = JSON.parse(localStorage.getItem('todos')) || [];
        dispatch(initialByLocal(data));
        //customize list section's height in every single advice
        const {offsetTop} = list.current;
        list.current.style.height = `calc(100vh - ${offsetTop}px)`;
    }, [])

    return (
        <div ref={list} className='list'>
            {
                todos.length > 0 ? 
                todos.map(el => {
                    const {id} = el;
                    return (
                        <ListItem key={id} task={el} />
                    )
                }) 
                : <p className='list-notask text-brown'>尚無事項</p>
            }
        </div>
    )
}
