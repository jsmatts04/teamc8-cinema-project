import {useState} from 'react';
import {Link} from 'react-router-dom';

function ShowTimeGrid({startDate,movie}) {
    const[timeList, setTimeList] = useState(['2:00 PM', '4:00 PM', '5:30 PM', '7:00 PM', '8:00 PM', '10:00 PM']);
    
    return (
    <div className='body-margin'>
        <div id='time-grid'>
        {timeList.map((time) => (
            <Link state={{ date:{startDate}, time:{time}, movie:{movie} }} id='timeLink' to='/movie/Showtime'>{time}</Link>
        ))}
        </div>
    </div>
    );
}

export default ShowTimeGrid;