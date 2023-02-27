import Image from "next/image";
import Link from "next/link";
import styles from "./../styles/Times.module.scss";

const Times = ({ timeProps }) => {
  return (
    <div className={styles.container}>
      <div className={styles.times}>
        <div dangerouslySetInnerHTML={{ __html: timeProps.text }}></div>
        {/* <Link href={`${timeProps.url}`} >  */}
        <Link href={`${timeProps.url}`} rel="noopener noreferrer" target="_blank"> 
          <button>GET DIRECTIONS</button>
        </Link>
      </div>
    </div>
  );
};

export default Times;
