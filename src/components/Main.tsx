import {useState, useEffect, Fragment } from 'react';
import { FaStar, FaLocationArrow } from 'react-icons/fa';
import hotels from '../db/hotels.json';

type Image = {
    id?: number;
    src: string;
    alt: string;
}

type Friend = {
    id:number;
    username:string;
    userimg: Image;
}

type Review = Friend & {
    quote:string;
    "user-date":string;
    "user-rating":number;
}

type Hotel = {
    id:string;
    name:string;
    stars:number;
    availability:number;
    "rating-average":number;
    "rating-count":number;
    images: Image[];
    location: string;
    paragraphs: string[];
    features: string[];
    recommendations: Friend[];
    reviews:Review[];
}

function Main() {

    const [hotelsList] = useState<Hotel[]>(hotels);
    const [hotel, setHotel] = useState<Hotel>();

    const getRating = (stars:number) => {

        let jsx = [];

        for (let index = 0; index < stars; index++) {
            jsx.push(<FaStar className="overview__icon-star"/>)
        }

        return jsx;
    }

    const getRandomFriend = (userList:Friend[]) => {
        const randomNumber = Math.floor( Math.random() * userList.length );
        const randomName = userList[randomNumber]?.username;

        return `${randomName} and ${userList.length - 1} other friends recommend this hotel`;
    }

    useEffect(() => {
        const findHotel = hotelsList.find((h:Hotel) => h.id === "1");

        if(findHotel) setHotel(findHotel);
    }, [hotelsList])

    return (
        <main className="hotel-view">
           {hotel && Object.keys(hotel).length !== 0 ? (
               <>
                <div className="gallery">
                    {hotel?.images.length && hotel.images.map((image:Image) => (
                        <figure className="gallery__item" key={image?.id}>
                            <img src={require(`../img/${image.src}`).default} alt={image.alt} className="gallery__photo" />
                        </figure>
                    ))}
                </div>

                <div className="overview">
                    <h1 className="overview__heading">
                        {hotel.name}
                    </h1>
                    <div className="overview__stars">
                        {getRating(hotel.stars).map((star:any, index:number) => (
                            <span key={index}>
                                {star}
                            </span>
                        ))}
                    </div>

                    <div className="overview__location">
                        <FaLocationArrow className="overview__icon-location"/>
                        <button className="btn-inline">{hotel.location}</button>
                    </div>

                    <div className="overview__rating">
                        <div className="overview__rating-average">{hotel['rating-average']}</div>
                        <div className="overview__rating-count">{hotel['rating-count']} votes</div>
                    </div>
                </div>

                <div className="detail">
                    <div className="description">
                        {hotel.paragraphs && hotel.paragraphs.length ? hotel.paragraphs.map((paragraph:string,i:number) => (
                            <p key={i} className="paragraph">
                                {paragraph}
                            </p>   
                        )) : <Fragment/> }

                        <ul className="list">
                            {hotel.features && hotel.features.length ? hotel.features.map((feature:string, i:number) => (
                                <li key={`${feature.replace(/\s/g, '')}--${i}`} className="list__item">{feature}</li>
                            )) : <Fragment/>}
                        </ul>
                        <div className="recommend">
                            <p className="recommend__count">
                                {getRandomFriend(hotel.recommendations)}
                            </p>
                            <div className="recommend__friends">
                                {hotel.recommendations && hotel.recommendations.length ? (
                                    hotel.recommendations.map((friend:Friend) => (
                                        <img
                                            key={`${friend.username}--${friend.userimg.alt.replace(/\s/g, '')}`} 
                                            src={require(`../img/${friend.userimg.src}`).default} 
                                            alt={friend.userimg.alt} 
                                            className="recommend__photo"
                                        />
                                    ))
                                ) : <Fragment/>}
                            </div> 
                        </div>
                    </div>

                    <div className="user-reviews">
                        {hotel.reviews && hotel.reviews.length ? (
                            hotel.reviews.map((review:Review) => (
                                <figure className="review" key={`${review.username.replace(/\s/g, '')}-${review.id}`}>
                                    <blockquote className="review__text">
                                        {review.quote}
                                    </blockquote>
                                    <figcaption className="review__user">
                                        <img 
                                            src={require(`../img/${review.userimg.src}`).default} 
                                            alt={review.userimg.alt} 
                                            className="review__photo" 
                                        />
                                        <div className="review__user-box">
                                            <p className="review__user-name">{review.username}</p>
                                            <p className="review__user-date">{review['user-date']}</p>
                                        </div>
                                        <div className="review__rating">{review['user-rating']}</div>
                                    </figcaption>
                                </figure>
                            ))
                        ) : <Fragment/> }

                        <button className="btn-inline">Show all <span>&rarr;</span></button>
                    </div>

                </div>
                
                <div className="cta">
                    <h2 className="cta__book-now">
                        {`Good news! we have ${hotel.availability} free rooms for your selected dates!`}
                    </h2>

                    <button className="btn">
                        <span className="btn__visible">Book now</span>
                        <span className="btn__invisible">{`Only ${hotel.availability} rooms left`}</span>
                    </button>
                </div>
               </>
           ) : <div>Hubo un error :(</div>}
        </main>
    )
}

export default Main