
import React, { useContext, useState } from 'react';
import { collection, getDocs, query, doc, setDoc, updateDoc, serverTimestamp, where } from 'firebase/firestore'; // Import Firestore methods
import { db } from '../firebase';
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(collection(db, "users"),
      where("displayName", "==", userName)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    if (!user) {
      setErr("No user selected"); 
      return;
    }
  
    const combinedId = currentUser.uid > user.uid
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid;
  
    try {
      const res = await getDocs(doc(db, "chats", combinedId));
  
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
  
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        });
  
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        });
      }
  
    } catch (err) {
      setErr("Error occurred while selecting user");
    }
  
    setUser(null);
    setUserName("");
  };
  return (
    <div className="search flex flex-col space-y-4 ml-10">
      <div className="searchForm flex items-center">
        <input
          type="text"
          placeholder="Find a user"
          className="border cursor-pointer border-gray-300 rounded-md px-4 py-1 mt-1 focus:outline-none focus:border-blue-500"
          value={userName} onKeyDown={handleKey}
          onChange={(e) => setUserName(e.target.value)}
        />
        {err && <span>User not found!</span>}
        {user && <div>
          <img src={user.photoURL} alt="" />
        <span>{user.displayName}</span>
        </div>}
      
       <button className="px-4 py-1 cursor-pointer bg-blue-400 mt-1 ml-2 text-white font-semibold rounded-md 
          hover:bg-blue-400 hover:text-white focus:outline-none focus:bg-blue-400 focus:text-white"
           onClick={handleSelect}>
            Search
      </button>
      </div>
    </div>
  );
};

export default Search;



// import React, { useContext, useState } from 'react';
// import { collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
// import { db } from '../firebase'
// import { AuthContext} from "../context/AuthContext" 

// const Search = () => {
// const [userName, setUserName] = useState("");
// const [user, setUser] = useState(null);
// const [err, setErr] = useState(false);

// const {currentUser} = useContext( AuthContext);

// const handleSearch = async () => {
//   const q = query(collection(db, "users"), 
//   where("displayName", "==", userName)
// );

// try{
// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//   setUser(doc.data);
// });
// }catch(err){
//   setErr(true);
// }
// };

// const handleKey = (e) => {
//   e.code === "Enter" && handleSearch();
// };

// const handleSelect = async () => {

//   const combinedId = currentUser.uid > user.uid 
//   ? currentUser.uid + user.uid 
//   : user.uid + currentUser.uid;
//   try{
//     const res = await getDoc(doc(db, "chats", combinedId));

//     if (!res.exists()){
//      await setDoc(doc(db, "chats", combinedId), {messages: [] }); 
    
//     await updateDoc(doc(db, "userChats", currentUser.uid),{
//       [combinedId + ".userInfo"]: {
//         uid: user.uid,
//         displayName: user.displayName,
//         photoURL: user.photoURL
//       },
//       [combinedId + ".date"]: serverTimestamp() 
//     });

//     await updateDoc(doc(db, "userChats", user.uid),{
//       [combinedId + ".userInfo"]: {
//         uid: currentUser.uid,
//         displayName: currentUser.displayName,
//         photoURL: currentUser.photoURL
//       },
//       [combinedId + ".date"]: serverTimestamp() 
//     });
//     }
    
//   }catch (err) {
//     setErr("No user found")
//   } 
//   setUser(null);
//   setUserName("");
// };


//   return (
//     <div className="search flex flex-col space-y-4 ml-10">
//       <div className="searchForm flex items-center">
//         <input
//           type="text"
//           placeholder="Find a user"
//           className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
//           value={userName} onKeyDown={handleKey}
//           onChange={(e) => setUserName(e.target.value)}
//         />
//         </div>
//         {err && <span>User not found!</span>}
//         {user && <div className='userChat'  onClick={handleSelect}>
//           <img src={user.photoURL} alt="" />
//           <span>{user.displayName}</span>
//         </div>}
    
//     </div>
//   );
// };

// export default Search;