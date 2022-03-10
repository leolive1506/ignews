import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import styles from './styles.module.scss'

export function SignInButton() {
  const isUserLoggeedIn = true;
  return isUserLoggeedIn ? (
    <button type="button" className={styles.signInButton}>
      <FaGithub color="#04d361" />
      Leonardo Lopes
      <FiX className={styles.closeIcon} />
    </button>
  ) : (
    <button type="button" className={styles.signInButton}>
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  )
}