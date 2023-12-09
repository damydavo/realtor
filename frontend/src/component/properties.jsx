import styles from "../style";
import { useGetListingsQuery } from "../slices/listingApiSlice";
import { useEffect } from "react";
import { setCredentials } from "../slices/listingSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Properties = () => {
    const { listing } = useSelector((state) => state.listing)

    const dispatch = useDispatch()

    const { data, refetch } = useGetListingsQuery()

    useEffect(() => {
        if (data)
            refetch()
        dispatch(setCredentials(data))
    }, [data, dispatch, refetch])

    return (
        <>
            <div className="container w-full md:w-[1000px] md:flex justify-between items-center mx-auto">
                <h2 className={`${styles.heading2}`}>Recently Added</h2>
                <p className={`${styles.paragraph} text-[#E90808] font-semibold`}>See all</p>
            </div>

            <div className="container md:w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 my-8 md:my-4">
                {listing?.map(item => {
                    const { name, regularPrice, imageUrls, bedrooms, bathrooms, discountPrice } = item
                    return (
                        <Link to={`/single-listing/${item._id}`} className="border bg-white p-4 rounded-lg md:flex gap-4 shadow-lg" key={item.name}>
                            <div>
                                <img className="object-cover w-full h-full rounded-lg" src={imageUrls} alt="features" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h2 className="font-semibold text-[22px] md:text-[18px] items-start font-poppins md:w-[250px] my-2 md:my-0">{name}</h2>
                                <div className="flex justify-between my-4 font-bold text-[#676767]">
                                    <p className={styles.paragraph}>{bedrooms} Bedrooms</p>
                                    <p className={styles.paragraph}>${discountPrice} DC</p>
                                    <p className={styles.paragraph}>{bathrooms} Bathrooms</p>
                                </div>
                                <div className="flex justify-between items-center my-4 text-[#676767] gap-2">
                                    <h2 className="py-1 text-center px-4 text-lg text-white bg-brightRed rounded-md baseline hover:bg-brightRedLight">${regularPrice.toLocaleString()}</h2>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </>
    );
}

export default Properties;