import { location } from "../constant";
import styles from "../style";

const Location = () => {
    return (
        <>
            <h2 className={`${styles.heading2} mx-auto md:w-[520px] items-center text-center`}>We are available in different cities across the globe</h2>
            <div className="mx-auto md:w-[1000px] grid grid-cols-2 gap-4 my-8">
                {location.map(item => {
                    return (
                        <div key={item.id} className="container mx-auto border">
                            <img className="w-full md:w-[587px] md:h-[386] rounded-lg object-contain" src={item.img} alt="banner" />
                            <div className="md:flex justify-between items-center px-4">
                                <div className="flex p-4 ">
                                    <h2 className="text-lg font-semibold">{item.country}</h2>,
                                    <p className={`${styles.paragraph} ml-2 text-[#676767]`}>{item.capital}</p>
                                </div>
                                <h2 className="p-2 mb-3 text-center px-4 text-sm font-semibold text-white bg-brightRed rounded-md baseline hover:bg-brightRedLight mt-auto">explore</h2>
                            </div>
                        </div>
                    )
                })}
            </div>

        </>
    );
}

export default Location