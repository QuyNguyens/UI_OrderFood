import classNames from "classnames/bind";
import styles from './Icons.module.scss';

const cx = classNames.bind(styles);
// eslint-disable-next-line react/prop-types
function Icon({small, medium , large, children}) {
    const classes = cx({small,medium,large})
    return ( 
        <div className={classes}>
            {children}
        </div>
   );
}

export default Icon;