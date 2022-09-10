import Head from 'next/head';
import styles from './layout.module.css';
import Link from 'next/link'

export default function Layout({ children }) {
    return (
        <div className="container">
            <Head>
                <title>Master Telegraph</title>
                <meta name="description" content="Master Telegraph" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className="header">
             <div className="header-content"><Link href="/">Master Telegraph</Link></div>
            </header>

            <main className="main">
                <div className="main-content">

                    { children }

                </div>
            </main>

            <footer className="footer">
                <div className="footer-content">Footer</div>
            </footer>

        </div>
    );
}