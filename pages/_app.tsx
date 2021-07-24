import '../styles/globals.css'
import Header from '../components/header';
import styles from '../styles/app.module.scss';


export default function MyApp({ Component, pageProps }) {
  return (
      <>
        <Header />
        <div className={styles.container}>
            <Component {...pageProps} />
        </div>
      </>
  )
}
