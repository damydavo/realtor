import Shared from './../component/shared';
import { useEffect } from "react";
import styles from "../style";
import { Link } from 'react-router-dom';
import { useGetListingQuery } from "../slices/listingApiSlice";
import { setCredentials } from "../slices/listingSlice";
import { useSelector, useDispatch } from "react-redux";

const Listings = () => {

    const { listing } = useSelector((state) => state.listing)
    const { userInfo } = useSelector((state) => state.auth)


    const dispatch = useDispatch()

    const { data, isLoading, refetch } = useGetListingQuery()

    useEffect(() => {
        if (data)
            refetch()
        dispatch(setCredentials(data))
    }, [data, dispatch, refetch])

    return (
        <Shared>

            <>
                <div className="container md:w-[1000px] md:flex justify-between items-center mx-auto mt-10">
                    <h2 className={`${styles.heading2}`}>{listing?.length < 1 ? 'No Listing Found' : 'My Listings'}</h2>
                    {/* <p className={`${styles.paragraph} text-[#E90808] font-semibold`}>See all</p> */}
                </div>

                <div className="container md:w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 my-8 md:my-4">
                    {listing?.map(item => {
                        const { name, address, regularPrice, imageUrls, bedrooms, discountPrice, bathrooms, description } = item
                        return (
                            <div className="border bg-white p-4 rounded-lg md:flex gap-4 shadow-lg" key={item._id}>
                                <img className="object-cover md:w-[150px] md:h-[150px] rounded-md" src={imageUrls} alt="features" />
                                <Link to={`/update-listing/${item._id}`} className="flex flex-col my-1 justify-center">
                                    <h2 className="font-bold text-[22px] md:text-[18px] items-start font-poppins">{name}</h2>
                                    <p className="font-normal text-[18px] items-start font-poppins w-[250px]">{address}</p>
                                    <div className="flex-wrap md:flex justify-between my-2 font-bold text-[#676767]">
                                        <p className={styles.paragraph}>{bedrooms} Bedroom</p>
                                        <p className={styles.paragraph}>{bathrooms} Bathrooms</p>
                                        <p className={`${styles.paragraph} text-red-300`}>{discountPrice} Discounts</p>
                                    </div>
                                    <div className="md:flex justify-between items-center my-2 text-[#676767] gap-2">
                                        <p className={`${styles.paragraph} poppins`}>{description}</p>
                                        <h2 className="py-1 text-center px-4 text-lg text-white bg-brightRed rounded-md baseline hover:bg-brightRedLight mt-2">${regularPrice.toLocaleString()}</h2>

                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </>
        </Shared>
    );
}

export default Listings;