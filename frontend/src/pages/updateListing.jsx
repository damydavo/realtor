import Shared from '../component/shared';
import { useState, useEffect } from "react";
import { app } from '../firebase';
import { useDeleteListingMutation, useUpdateListingMutation } from '../slices/listingApiSlice';
import { setListing } from '../slices/listingSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { getStorage, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useNavigate, Link } from 'react-router-dom';

const UpdateListing = () => {
    const [files, setFiles] = useState([])

    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 50,
        offer: false,
        parking: false,
        furnished: false,
    })

    const { imageUrls, name, description, address, type, bedrooms, bathrooms, regularPrice, discountPrice, offer, parking, furnished } = formData

    const [imageUploadError, setImageUploadError] = useState(false)
    const [uploading, setUploading] = useState(false)

    const [updateList, { isLoading }] = useUpdateListingMutation()
    const [deleteList] = useDeleteListingMutation()

    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchListing = async () => {
            const listingId = params.listingId
            const res = await fetch(`/api/listing/${listingId}`)
            const data = await res.json()
            setFormData(data)

        }
        fetchListing()
    }, [params.listingId])

    const handleFileSubmit = (e) => {
        if (files.length > 0 && files.length + imageUrls.length < 7) {
            const promises = [];
            setUploading(true)
            setImageUploadError(false)

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]))
            }
            Promise.all(promises).then((urls) => {
                setFormData({
                    ...formData, imageUrls: imageUrls.concat(urls),
                });
                setImageUploadError(false)
                setUploading(false)
            }).catch((err) => {
                setImageUploadError("Image upload failed (2 mb max per image)")
                setUploading(false)
            })
        } else {
            setImageUploadError("You can only upload 6 images per listing")
            setUploading(false)
        }
    }

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_change",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    <div>{`Upload is ${progress}% done`}</div>
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    reject(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                    })
                }
            )
        })
    }

    const handleDelete = (index) => {
        setFormData({ ...formData, imageUrls: imageUrls.filter((_, i) => i !== index) })
    }

    const handleChange = (e) => {
        if (e.target.name === 'sale' || e.target.name === 'rent') {
            setFormData({ ...formData, type: e.target.name })
        }

        if (e.target.name === 'parking' || e.target.name === 'furnished' || e.target.name === 'offer') {
            setFormData({ ...formData, [e.target.name]: e.target.checked })
        }

        if (e.target.type === 'text' || e.target.type === 'textarea' || e.target.type === 'number') {
            setFormData({
                ...formData, [e.target.name]: e.target.value
            })
        }
    }

    const handleDeleteListing = () => {
        const listingId = params.listingId
        try {
            const res = deleteList(listingId).unwrap()
            dispatch(setListing(res))
            toast.success("Deleted Successfully")
            navigate('/listing')

        }
        catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const listingId = params.listingId

        if (!formData) {
            toast.error('please Include all fields')
        } else {
            try {
                const res = await updateList({
                    ...formData, listingId
                }).unwrap()
                dispatch(setListing(res))
                toast.success("Updated Successfully")
                navigate('/listing')
            }
            catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }

    return (
        <Shared>

            <main className='mt-10 max-w-5xl mx-auto gap-3 mb-8'>
                <h2 className='text-3xl font-semibold text-center mb-7'>Update Listing</h2>
                <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row'>
                    <div className='flex flex-col flex-1 gap-4'>
                        <input type="text" name="name" onChange={handleChange} value={name} placeholder="Name" maxLength="62" minLength="10" required className="p-3 border rounded-md text-sm" />
                        <textarea type="textarea" placeholder="Description" onChange={handleChange} value={description} name="description" required className="p-3 border rounded-md text-sm" />
                        <input type="text" name="address" onChange={handleChange} value={address} placeholder="Address" required className="p-3 border rounded-md text-sm" />

                        <div className='flex items-center gap-6 flex-wrap my-6'>
                            <div className='flex gap-2'>
                                <input type="checkbox" name="sale" onChange={handleChange} checked={type === 'sale'} className="w-5" />
                                <span>Sell</span>
                            </div>
                            <div className='flex gap-2'>
                                <input type="checkbox" name="rent" onChange={handleChange} checked={type === "rent"} className="w-5" />
                                <span>Rent</span>
                            </div>
                            <div className='flex gap-2'>
                                <input type="checkbox" name="parking" value={parking} onChange={handleChange} checked={parking} required className="w-5" />
                                <span>Parking Spot</span>
                            </div>
                            <div className='flex gap-2'>
                                <input type="checkbox" name="furnished" onChange={handleChange} checked={furnished} required className="w-5" />
                                <span>Furnished</span>
                            </div>
                            <div className='flex gap-2'>
                                <input type="checkbox" name="offer" onChange={handleChange} checked={offer} className="w-5" />
                                <span>Offer</span>
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-6'>
                            <div className='flex gap-2 items-center'>
                                <input type="number" name="bedrooms" value={bedrooms} onChange={handleChange} min="1" max="10" required className='p-3 border border-gray-300 rounded-lg w-[60px]' />
                                <p>Beds</p>
                            </div>

                            <div className='flex gap-2 items-center'>
                                <input type="number" name="bathrooms" min="1" max="10" onChange={handleChange} value={bathrooms} required className='p-3 border border-gray-300 rounded-lg w-[60px]' />
                                <p>Baths</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <input type="number" id="regularPrice" name="regularPrice" min="50" max="1000000" onChange={handleChange} value={regularPrice} required className='p-3 border border-gray-300 rounded-lg w-[100px]' />
                                <div className='flex flex-col items-center'>
                                    <p>Regular Price</p>
                                    <span className='text-sm'>($ / month)</span>
                                </div>

                            </div>
                            <div className='flex gap-2 items-center'>
                                <input type="number" id="discountPrice" onChange={handleChange} name="discountPrice" value={discountPrice} min="50" max="1000000" required className='p-3 border border-gray-300 rounded-lg w-[100px]' />
                                <div className='flex flex-col items-center'>
                                    <p>Discounted Price</p>
                                    <span className='text-sm'>($ / month)</span>
                                </div>

                            </div>
                        </div>
                        <div className='flex gap-6 items-center my-8'>
                            <Link to='/listing' className='py-1 px-2 bg-red-300  rounded uppercase hover:shadow-lg disabled:opacity-80'>Go Back</Link>
                            <button onClick={handleDeleteListing} type="button" className='py-1 px-2 bg-green-300 rounded uppercase hover:shadow-lg disabled:opacity-80'>Delete</button>

                        </div>
                    </div>
                    <div className='flex flex-col flex-1 gap-4 ml-6'>
                        <p className='font-semibold'>Images:<span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span></p>
                        <div className='flex gap-4'>
                            <input onChange={(e) => setFiles(e.target.files)} className='p-3 border border-gray-300 rounded w-full' type="file" id="images" accept="image/*" multiple />
                            <button disabled={uploading} type="button" onClick={handleFileSubmit} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>{uploading ? 'Uploading...' : 'Upload'}</button>

                        </div>
                        <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>
                        {
                            imageUrls.length > 0 && imageUrls.map((url, index) => {
                                return (
                                    <div key={url} className='flex justify-between items-center p-3 border'>
                                        <img src={url} alt="listing" className='w-40 h-20 object-contain rounded-lg' />
                                        <button onClick={() => handleDelete(index)} type="button" className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'>Delete</button>
                                    </div>
                                )

                            })
                        }

                        <button className='p-3 mt-2 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{isLoading ? 'Updating...' : 'Update Listing'}</button>

                    </div>
                </form>

            </main>
        </Shared>
    );
}

export default UpdateListing;