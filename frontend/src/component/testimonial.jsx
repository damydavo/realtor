import styles from "../style";
import { testimonial } from "../constant";

const Testimonial = () => {
    return (
        <>
            <div className="flex flex-col mx-auto md:w-[600px] items-center space-y-4">
                <h2 className={`${styles.heading2}`}>Testimonials</h2>
                <p className="text-[20px] font-poppins text-[#676767]">This is what our client are saying</p>
                <h2 className="py-1 text-center px-4 w-[120px] text-lg text-white bg-brightRed rounded-md baseline hover:bg-brightRedLight">View more</h2>
            </div>
            <div className="container md:w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-4 my-8 md:my-8">
                {testimonial.map(item => {
                    return (
                        <div key={item.id} className="p-3 border rounded-lg shadow-md">
                            <div className="flex flex-col space-y-3 items-start">
                                <h2 className="font-semibold text-[20px] font-poppins w-[250px]">{item.title}</h2>
                                <p className="font-bold">{item.city}</p>
                                <p className="text-[14px] font-poppins text-[#676767]">{item.description}</p>

                            </div>
                        </div>
                    )

                })}
            </div>
        </>
    );
}

export default Testimonial;
