import * as React from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const List = ({ items, link, type }) => {
  let list;
  if (type === 'character') {
    list = items.map((listItem) => {
      return (
        <div className={styles.listItem} key={`item - ${listItem.id}`}>
          <Link className="link" to={`/${link}/${listItem.id}`}>
            <img src={listItem.image} alt="charactor" />
            <h5>{listItem.name}</h5>
          </Link>
        </div>
      );
    });
  } else {
    list = items.map((listItem) => {
      return (
        <div className={styles.listItem} key={`item - ${listItem.id}`}>
          <p>{listItem.name}</p>
          <p>{listItem.episode}</p>
          <p>{listItem.air_date}</p>
        </div>
      );
    });
  }
  return (
    <>
      {list.length > 0 ? (
        <div className={styles.list}>{list}</div>
      ) : (
        <h3>Not found</h3>
      )}
    </>
  );
};
export default List;

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string.isRequired,
      image: PropTypes.string,
      episode: PropTypes.string,
      air_date: PropTypes.string,
    })
  ).isRequired,
  link: PropTypes.string,
  type: PropTypes.oneOf(['character', 'episode']),
};
