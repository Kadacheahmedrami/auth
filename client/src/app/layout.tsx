'use client'

import "./globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use useRouter for redirection

import LogoutButton from '../components/LogoutButton';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const router = useRouter(); // Initialize useRouter for navigation

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3001/auth/protected", {
          method: "GET",
          credentials: "include", // Include cookies in the request
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Data received:", data);
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
          router.push("/auth"); // Use router.push for redirect
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setIsAuthorized(false);
        router.push("/auth"); // Redirect if error occurs
      } finally {
        setIsLoading(false); // Stop loading once the check is complete
      }
    };

    checkAuth();
  }, [router]);

  // Show loading state while checking authorization
  if (isLoading) {
    return   <html><body><div>Loading...</div></body></html>;
  }


  return (
    <html lang="en">
      <body>
  { isAuthorized ?   <div className="bg-gray-900 w-full text-white">
      {/* Navigation Bar */}
   

      <header className="bg-gray-800 shadow-md   sticky top-0 z-10">
        <nav className="flex items-center justify-between p-4">
          <div className="text-2xl font-semibold">MyApp</div>
          <ul className="flex space-x-6">
            <li><a href="/" className="hover:text-gray-400">Home</a></li>
            <li><a href="/about" className="hover:text-gray-400">About</a></li>
            <li><a href="/services" className="hover:text-gray-400">Services</a></li>
            <li><a href="/contact" className="hover:text-gray-400">Contact</a></li>
          </ul>
              <LogoutButton />
        </nav>
      </header>
        
        {children}
      </div>  :   <html lang="en">
      <body> {children}
      </body>
     </html>
      }

     
        
        
        </body>
    </html>
  );
  
}
