
export default function Progress(props) {
    const { total, hasDone } = props;

    const percent = Math.floor(hasDone / total * 100);

    return (
        <div className="progress">
            <p className="progress-info">
                {
                    isNaN(percent) > 0 ?
                        '' :
                        `進度${percent}%`
                }
            </p>
            <div style={{ width: `${isNaN(percent) ? 0 : percent}%` }} className="progress-inner">
                <div className="progress-shadow"></div>
            </div>
        </div>
    )
}
