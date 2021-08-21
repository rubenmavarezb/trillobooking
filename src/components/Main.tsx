import {useState} from 'react';
import { FaStar, FaLocationArrow } from 'react-icons/fa';

type Image = {
    id: number;
    src: string;
    alt: string;
}

function Main() {

    const [images] = useState<Image[]>([
        {
            id:1,
            src: 'hotel-1.jpg',
            alt: 'Photo hotel 1'
        },
        {
            id:2,
            src: 'hotel-2.jpg',
            alt: 'Photo hotel 2'
        },
        {
            id:3,
            src: 'hotel-3.jpg',
            alt: 'Photo hotel 3'
        }
    ]);

    const getRating = (stars:number) => {

        let jsx = [];

        for (let index = 0; index < stars; index++) {
            jsx.push(<FaStar className="overview__icon-star"/>)
        }

        return jsx;
    }

    return (
        <main className="hotel-view">
            <div className="gallery">
                {images.length && images.map((image:Image) => (
                    <figure className="gallery__item" key={image?.id}>
                        <img src={require(`../img/${image.src}`).default} alt={image.alt} className="gallery__photo" />
                    </figure>
                ))}
            </div>

            <div className="overview">
                <h1 className="overview__heading">
                    Hotel Las Palmas
                </h1>
                <div className="overview__stars">
                    {getRating(5).map((star:any, index:number) => (
                        <span key={index}>
                            {star}
                        </span>
                    ))}
                </div>

                <div className="overview__location">
                    <FaLocationArrow className="overview__icon-location"/>
                    <button className="btn-inline">Abufeira, Protugal</button>
                </div>

                <div className="overview__rating">
                    <div className="overview__rating-average">8.6</div>
                    <div className="overview__rating-count">429 votes</div>
                </div>
            </div>
        </main>
    )
}

export default Main