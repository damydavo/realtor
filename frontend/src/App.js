import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Agent, Blog, CreateListing, Home, Listings, Login, Properties, Register, Single, UpdateListing } from './pages';
import { Profile } from './component/main';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './component/privateRoute';

const App = () => {
  return ( 
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agents" element={<Agent />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/property" element={<Properties />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/single-listing/:listingId" element={<Single />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/listing" element={<PrivateRoute />}>
            <Route path="/listing" element={<Listings />} />
          </Route>

          <Route path="/create" element={<PrivateRoute />}>
            <Route path="/create" element={<CreateListing />} />
          </Route>

          <Route path="/update-listing/:listingId" element={<PrivateRoute />}>
            <Route path="/update-listing/:listingId" element={<UpdateListing />} />

          </Route>
        </Routes>
      </Router>
      <ToastContainer />

    </>

  )

}

export default App;