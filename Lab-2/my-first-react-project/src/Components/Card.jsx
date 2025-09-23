export default function Card(props) {
    console.log(props); 
    
    let ratingColor = 'red';
    if (props.rating > 4.0) {
        ratingColor = 'green';
    }
    
    return (
        <div className="Card-Component">
            <img src={props.image} alt="resort" width="250" />
            <h2>{props.name}</h2>
            <p>{props.resort}</p>
            <p style={{color: ratingColor}}>★ {props.rating}</p>
            <p>{props.price}</p>
        </div>
    );
}