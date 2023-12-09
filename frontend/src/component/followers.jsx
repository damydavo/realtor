import styles from "../style";

const Followers = () => {
    return (
        <div className="container flex justify-between items-center w-full md:w-[1000px] p-4 mx-auto">
            <div className="flex flex-col md:flex-row gap-14 mx-auto md:mx-0">
                <div className="flex flex-col">
                    <h2 className={styles.heading2}>1000+</h2>
                    <p className={`${styles.paragraph} text-[#676767] font-medium`}>Premium Houses</p>
                </div>
                <div className="hidden md:block w-[4px] h-[auto] bg-[#E90808]"></div>

                <div className="flex flex-col">
                    <h2 className={styles.heading2}>1000+</h2>
                    <p className={`${styles.paragraph} text-[#676767] font-medium`}>Happy Customers</p>
                </div>
                <div className="hidden md:block w-[4px] h-[auto] bg-[#E90808]"></div>

                <div className="flex flex-col">
                    <h2 className={styles.heading2}>50+</h2>
                    <p className={`${styles.paragraph} text-[#676767] font-medium`}>Awards</p>
                </div>
                <div className="hidden md:block w-[4px] h-[auto] bg-[#E90808]"></div>

                <div className="flex flex-col">
                    <h2 className={styles.heading2}>100+</h2>
                    <p className={`${styles.paragraph} text-[#676767] font-medium`}>Reliable Agents</p>
                </div>

            </div>

        </div>
    );
}

export default Followers;