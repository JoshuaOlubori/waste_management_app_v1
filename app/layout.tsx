// eslint-disable-line @typescript-eslint/no-unused-vars
"use client"

import { useState, useEffect } from "react"
import { Inter } from 'next/font/google'
import "./globals.css"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
//import 'leaflet/dist/leaflet.css'
import { Toaster } from 'react-hot-toast'
import { getAvailableRewards, getUserByEmail } from '@/utils/db/actions'

const inter = Inter({ subsets: ['latin'] })
interface AvailableReward {
  id: number;
  name: string;
  cost: number;
  description: string | null;
  collectionInfo: string;
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [totalEarnings, setTotalEarnings] = useState(0)

  useEffect(() => {
    const fetchTotalEarnings = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail')
        if (userEmail) {
          const user = await getUserByEmail(userEmail)
          console.log('user from layout', user);
          
          if (user) {
            const availableRewards: AvailableReward[] = await getAvailableRewards(user.id);
            console.log('availableRewards from layout', availableRewards);
                        // setTotalEarnings(availableRewards)
            // Calculate total earnings based on a property (e.g., cost)
          const totalEarnings = availableRewards.reduce((acc, reward) => acc + reward.cost, 0); // Assuming cost represents earnings
          setTotalEarnings(totalEarnings);
          }
        }
      } catch (error) {
        console.error('Error fetching total earnings:', error)
      }
    }

    fetchTotalEarnings()
  }, [])

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50 flex flex-col">
           <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} totalEarnings={totalEarnings} /> 
          <div className="flex flex-1">  {/*flex container: sidebar on left, main content area in right */}
            <Sidebar open={sidebarOpen} /> 
            <main className="flex-1 p-4 lg:p-8 ml-0 lg:ml-64 transition-all duration-300">
              {children}
            </main>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  )
}