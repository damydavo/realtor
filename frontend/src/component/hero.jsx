import styles, { layout } from "../style";
import { estate } from "../assets";

const Hero = () => {
    return (
        <>
            <div className={`${layout.sectionImg} relative`}>
                <img className="h-[70vh] lg:h-[80vh] w-full object-cover object-right opacity-40 rounded-lg" src={estate} alt="banner" />
                <div className="absolute -z-10 bg-gradient-to-t from-white via-black to-black h-[70vh] lg:h-[80vh] w-full" />
                <div className={`${layout.section} font-poppins`}>
                    <div className="absolute left-10 top-28 text-white w-200 md:w-[400px]">
                        <h2 className={`${styles.heading2}`}>Simple way to find the <span className="font-semibold text-[#F6866A]">perfect property</span> </h2>
                        <p className={`${styles.paragraph}`}>We provides a professional services for the sale, rent and purchase of houses.</p>

                        <div className="bg-white rounded-lg w-[280px] md:w-[800px] my-8 shadow-lg md:h-[160px] py-4 px-2">
                            <div className="flex md:flex-row flex-col text-black items-center gap-4">
                                <div className="styled basis-1/4 px-2">
                                    <select type="text" placeholder="choose" className="w-full px-3 py-2 rounded-full text-sm shadow-sm placeholder-red-400 bg-[#E0E8F3] focus:outline-none" >
                                        <option>Rent</option>
                                        <option>Sell</option>
                                    </select>
                                </div>
                                <div className="basis-1/2">
                                    <input type="text" placeholder='Mobile Number' className="w-full mt-1 rounded-full px-3 py-3 text-sm shadow-sm bg-[#f4f4f4] focus:outline-none" />
                                </div>
                                <div className="styled basis-1/4">
                                    <select type="text" placeholder="choose" className="w-full px-3 py-2 rounded-full text-sm shadow-sm placeholder-red-400 bg-[#E0E8F3] focus:outline-none" >
                                        <option>House</option>
                                        <option>School</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row text-black items-center gap-4 my-4">
                                <div className="styled basis-1/4 px-2">
                                    price range
                                    <select type="text" placeholder="choose" className="w-full px-3 py-2 rounded-full text-sm shadow-sm placeholder-red-400 bg-[#E0E8F3] focus:outline-none" >
                                        <option>Rent</option>
                                        <option>Sell</option>
                                    </select>
                                </div>
                                <div className="basis-1/2">
                                    <div className="relative w-full bg-[#f4f4f4] rounded-full p-[3px]">
                                        <div className="hidden md:flex">

                                            <div className="absolute bg-[#E90808] top-0 w-[200px] mx-16 rounded-full p-[3px]"></div>

                                        </div>
                                    </div>
                                </div>
                                <div className="styled basis-1/4">
                                    <select type="text" placeholder="choose" className="w-full px-3 py-2 rounded-full text-sm shadow-sm placeholder-red-400 bg-[#E0E8F3] focus:outline-none" >
                                        <option>House</option>
                                        <option>School</option>
                                    </select>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </>
    );
}

export default Hero;