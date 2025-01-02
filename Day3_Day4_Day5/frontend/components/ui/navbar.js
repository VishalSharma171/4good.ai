import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Retrieve user data from localStorage after login
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Hospital Management</div>
      <div className="flex items-center">
        {user ? (
          <>
            <img 
              src={user.profilePicture || '/dummy-profile.jpg'} 
              alt="Profile" 
              className="w-8 h-8 rounded-full mr-3"
            />
            <span>{user.username}</span>
            <button onClick={handleLogout} className="ml-4 bg-red-500 px-3 py-2 rounded text-white">
              Logout
            </button>
          </>
        ) : (
          <button onClick={() => router.push('/login')} className="bg-green-500 px-4 py-2 rounded text-white">
            Login
          </button>
        )}
      </div>
    </div>
  );
}
