import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import PersonalDetails from "./pages/PersonalDetails";
import AddPost from "./pages/AddPost";
import User from "./components/User";
import SinglePost from "./pages/SinglePost";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/post/:id" element={}/> */}
          <Route path="/logout" element={<Logout />} />
          <Route path="/personal" element={<PersonalDetails />} />
          <Route path="/addpost" element={<AddPost />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/post/:id" element={<SinglePost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
