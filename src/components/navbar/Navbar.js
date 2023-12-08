import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
    return <div className={styles.containerNavbar}>

        <div className={styles.menu}>
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/insert-book'>Inserir Book</Link>
        </div>
      <Link to='/login-adm'>Sair</Link>
  </div>;
};

export default Navbar;
