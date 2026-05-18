import React from 'react'
import { Outlet, useNavigation } from 'react-router-dom'
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import { ProgressBar } from 'react-loader-spinner'

export default function Layout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="layout">
      <ScrollToTop />

      {/*Page Loader*/}
      {isLoading && (
        <div className="page-loader">
          <ProgressBar
            visible={true}
            height="80"
            width="80"
            color="#ff6b35"
            ariaLabel="progress-bar-loading"
          />
        </div>
      )}

      <Navbar />
      <main className="layout-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
