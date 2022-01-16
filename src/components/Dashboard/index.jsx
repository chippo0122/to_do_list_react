import { useSelector, useDispatch } from "react-redux"
import { clearTask } from "../../redux/todosSlice"
import { pushMsg } from "../../redux/messageSlice"
import Progress from './Progress'
import './index.scss'

export default function Dashboard() {
    //redux
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos);
    //total tasks, and has finished tasks
    const total = todos.length;
    const hasDone = todos.filter(el => el.isFinish).length;

    const clearAllTask = () => {
        //clear redux
        dispatch(clearTask());
        dispatch(pushMsg({title: '已清空所有代辦事項', success: false}));
        //clear localstorage
        localStorage.setItem('todos', JSON.stringify([]));
    }

    return (
        <div className="dashboard text-light">
            <button onClick={clearAllTask} className="clear-btn text-primary">清除全部</button>
            <Progress total={total} hasDone={hasDone} />
        </div>
    )
}
