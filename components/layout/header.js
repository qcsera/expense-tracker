import ProfileMenu from "./profile-menu";
import Title from "./title";
import { useSession, signOut } from "next-auth/client";

import styles from "./header.module.css"

const Header = () => {

  const [session, loading] = useSession();

  return (
    <header className={styles.container}>
      <Title />
      {session && <ProfileMenu /> }
      
    </header>
  );
};

export default Header;
