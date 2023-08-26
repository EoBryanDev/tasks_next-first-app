import styles from './styles.module.css'
import Head from 'next/head';

const Dashboard: React.FC = () => {
    return(
        <div className={styles.container}>
            <Head>
                <title>My Dashboard</title>
            </Head>
            <h1>Panel Page</h1>
        </div>
    )
}

export default Dashboard;