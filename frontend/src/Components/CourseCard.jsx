
function CourseCard({Title,Description,Duration,Rating}){
        return (
            <div>
                <h1>{Title}</h1>
                <p>{Description}</p>
                <p>Duration: {Duration}</p>
                <p>Rating: {Rating}</p>
            </div>
        );
    }
    export default CourseCard;


