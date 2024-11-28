'use client'

import "./globals.css";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation"; // Import redirect




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3001/auth/protected", {
          method: "GET",
          credentials: "include", // Include cookies in the request
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Data received:", data); // Handle the data from the protected route
          setIsAuthorized(true);
        } else {
             setIsAuthorized(false);
             redirect("/auth"); 
        }
      } catch (error) {
        
        redirect("/auth"); 
      }
    };

    checkAuth(); 
  }, []);

  if (!isAuthorized) {
    return     <html lang="en">
    <body>
    {children}
    </body>
  </html>
  }

  return (
    <html lang="en">
    <body
    
    >
      {children}
    </body>
  </html>
  );


}
