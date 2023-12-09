import { Hero, Followers, Location, About, Properties, Testimonial, Footer, Topmenu, Header } from "../component/main";
import styles from "../style";

const Home = () => {
    return (
        <>
            <div className="w-full">
                <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                    <div className={`${styles.boxWidth}`}>
                        <Topmenu />
                        <Header />

                    </div>
                </div>
            </div>

            <div className={`${styles.paddingX} ${styles.flexCenter} my-8`}>
                <div className={`${styles.boxWidth}`}>
                    <Hero />
                </div>
            </div>

            <div className={`${styles.paddingX} ${styles.flexCenter} mt-40 md:my-8`}>
                <div className={`${styles.boxWidth}`}>
                    <Followers />
                </div>
            </div>
            <div className={`${styles.paddingX} ${styles.flexCenter} my-20 md:my-8`}>
                <div className={`${styles.boxWidth}`}>
                    <Location />
                </div>
            </div>
            <div className={`${styles.paddingX} ${styles.flexCenter} md:my-8`}>
                <div className={`${styles.boxWidth}`}>
                    <About />
                </div>
            </div>
            <div className={`${styles.paddingX} ${styles.flexCenter} md:my-8`}>
                <div className={`${styles.boxWidth}`}>
                    <Properties />
                </div>
            </div>
            <div className={`${styles.paddingX} ${styles.flexCenter} md:my-8`}>
                <div className={`${styles.boxWidth}`}>
                    <Testimonial />
                </div>
            </div>
            <div className={`${styles.paddingX} ${styles.flexCenter} md:my-8 bg-[#F2F6FC] py-8`}>
                <div className={`${styles.boxWidth}`}>
                    <Footer />
                </div>
            </div>

        </>

    );
}

export default Home;