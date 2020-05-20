import * as React from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';

export default function List({ items, link }) {
    const list = items.map((listItem) => {
        return (<div className={styles.listItem} key={`item - ${listItem.id}`}>
            <Link className="link" to={`${link}/${listItem.id}`}>
                {listItem.name}
                <img src={listItem.image} alt="charactor" />
            </Link >
        </div>
        );
    })

    return (
        <>
            {list.length > 0 ? (
                <div className={styles.list}>
                    {list}
                </div>
            ) : <h3>Not found</h3>}
        </>
    );
}
