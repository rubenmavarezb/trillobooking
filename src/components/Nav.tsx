import { Fragment, useState } from 'react';
import { FaHome, FaPlane, FaCar, FaMap } from 'react-icons/fa';
import { IconType } from 'react-icons'

type LiItem = {
    id:number;
    icon:IconType;
    active: boolean;
    label:string;
}

function Nav() {

    const [liItems] = useState<LiItem[]>([
        {
            id:1,
            icon: FaHome,
            active: true,
            label: 'Hotel'
        },
        {
            id:2,
            icon: FaPlane,
            active: false,
            label: 'Flight'
        },
        {
            id:3,
            icon: FaCar,
            active: false,
            label: 'Car Rental'
        },
        {
            id:4,
            icon: FaMap,
            active: false,
            label: 'Tours'
        },
    ])

    return (
        <nav className="sidebar">
            <ul className="side-nav">
                {liItems.length !== 0 ? (
                    liItems.map((li:LiItem) => (
                        <li key={li.id} className={li.active ? "side-nav__item side-nav__item--active" : "side-nav__item"}>
                            <a href="!#" className="side-nav__link">
                                <li.icon className="side-nav__icon"/>
                                <span>{li.label}</span>
                            </a>
                        </li>
                    ))
                ) : <Fragment/>}
            </ul>

            <div className="legal">
                &copy; 2021 by Trillo. All rights reseved.
            </div>
        </nav>
    )
}

export default Nav