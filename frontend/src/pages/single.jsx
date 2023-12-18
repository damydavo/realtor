import { setListing } from "../slices/listingSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import TopMenu from './../component/topmenu';
import Header from './../component/header';
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import { MdLocationOn, MdBed, MdBathroom, MdPark, MdHighQuality } from 'react-icons/md'
import 'swiper/css/bundle'
import styles from "../style"

const Single = () => {
    SwiperCore.use([Navigation])

    const { listings } = useSelector((state) => state.listing)

    console.log(listings.user)

    const [contact, setContact] = useState(false)

    const dispatch = useDispatch()

    const params = useParams()

    useEffect(() => {
        const fetchListing = async () => {
            const listingId = params.listingId
            const res = await fetch(`/api/listing/${listingId}`)
            const data = await res.json()
            dispatch(setListing(data))
        }
        fetchListing()
    }, [params.listingId, dispatch])

    const { imageUrls, name, address, bathrooms, bedrooms, discountPrice, regularPrice, description, parking, furnished } = listings

    return (
        <>
            <div className="w-full">
                <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                    <div className={`${styles.boxWidth}`}>
                        <TopMenu />
                        <Header />

                    </div>
                </div>
            </div>
            <div className="w-full">
                <Swiper navigation>
                    {imageUrls?.map(item => {
                        return (
                            <SwiperSlide key={item}>
                                <img className="w-full h-[400px] object-cover" src={item} alt="images" />

                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>

            <div className="container max-w-3xl mx-auto flex flex-col my-14 px-4">
                <h2 className="text-2xl font-semibold font-poppins">
                    {
                        listings.type === 'sale' ? `${name} - $${regularPrice.toLocaleString()}` : listings.type === 'rent' ? `${name} - $${regularPrice.toLocaleString()}/months` : ''
                    }

                </h2>

                <div className="flex items-center gap-2 py-4">
                    <MdLocationOn color="green" size="18" />
                    <p>{address}</p>
                </div>
                <div className='flex gap-3 items-center'>
                    <div className='py-1 px-2 bg-red-800 w-32 text-center rounded hover:shadow-lg disabled:opacity-80 text-white'>{listings.type === 'sale' ? 'For Sale' : 'For Rent'}</div>
                    <div className='py-1 px-2 bg-green-500 w-32 text-center rounded hover:shadow-lg disabled:opacity-80 text-white'>${discountPrice} discount</div>

                </div>
                <p className="mt-3 font-poppins w-full text-[18px] md:text-[14px]"><span className="font-semibold">Description: </span>{description}</p>
                <div className="flex flex-wrap md:flex gap-4">
                    <div className="flex items-center gap-1 py-4">
                        <MdBed color="green" size="26" />
                        <p>{bedrooms} Beds</p>
                    </div>
                    <div className="flex items-center gap-1 py-4">
                        <MdBathroom color="green" size="26" />
                        <p>{bathrooms} Baths</p>
                    </div>
                    <div className="flex items-center gap-1 py-4">
                        <MdPark color="green" size="26" />
                        <p>{parking} Parking Spot</p>
                    </div>
                    <div className="flex items-center gap-1 py-4">
                        <MdHighQuality color="green" size="26" />
                        <p>{furnished && "Furnished"} </p>
                    </div>
                </div>
                {
                    !contact && (
                        <button onClick={() => setContact(!contact)} className="uppercase bg-slate-700 p-3 rounded-lg bg-opacity-95 text-white">Contact Landlord</button>
                    )
                }

            </div>
        </>

    );

}

export default Single;