import React, { Suspense, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import { ToastContainer } from 'react-toastify';
import 'boxicons'

import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './middleware/ProtectedRoute.jsx'
import { useRecordVisit } from './hook/useVisitor.js';

import StandardLayout from './layout/StandardLayout.jsx'
import DashbordLayout from './layout/DashbaordLayout.jsx'
import Games from './page/Games.jsx'
import Index from './page/Index.jsx'
import Game from './page/Game.jsx'
import Signin from './page/Signin.jsx'
import Uploadgame from './page/Uploadgame.jsx'
import Profile from './page/Profile.jsx'
import NotFound from './page/NotFound.jsx'
import MyProfile from './page/MyProfile.jsx';

import Dashboard from './page/Dashboard/Dashboard.jsx'
import Editgame from './page/Editgame.jsx';
import Usermanagement from './page/Dashboard/Usermanagement.jsx';
import CategoriesManagement from './page/Dashboard/CategoriesManagement.jsx';
import Gamemanagement from './page/Dashboard/Gamemanagement.jsx';



function App() {

    const { mutate: recordVisit, isLoading: isRecordingVisit } = useRecordVisit();
    const hasRecorded = useRef(false);

    useEffect(() => {
        if (!hasRecorded.current) {
            recordVisit();
            hasRecorded.current = true;
        }
    }, []);


    return (
        <>
            <ToastContainer />
            <AuthProvider>
                <BrowserRouter>

                    <Routes>
                        <Route path='/signin' element={<Signin />} />


                        <Route path='/search/:slug' element={"a"} />



                        <Route element={<StandardLayout />}>
                            <Route index element={<Index />} />
                            <Route path='/games' element={<Games />} />
                            <Route
                                path="/games/:sortBy?/:sortOrder?/categories?/:categories?/platforms?/:platforms?/play_type?/:play_type?/page?/:page"
                                element={<Games />}
                            />


                            <Route path='/game/:slug' element={<Game />} />


                            <Route path="/uploadgame" element={
                                <ProtectedRoute>
                                    <Uploadgame />
                                </ProtectedRoute>}
                            />

                            <Route path="/editgame/:slug" element={
                                <ProtectedRoute>
                                    <Editgame />
                                </ProtectedRoute>}
                            />



                            <Route path="/Profile/:slug" element={<Profile />} />

                            <Route path="/myprofile" element={
                                <ProtectedRoute>
                                    <MyProfile />
                                </ProtectedRoute>}
                            />

                        </Route>

                        <Route element={<DashbordLayout />}>
                            <Route path="/DashBoard" element={
                                <ProtectedRoute requiredRole="admin">
                                    <Dashboard />
                                </ProtectedRoute>}
                            />

                            <Route path="/usermanagement" element={
                                <ProtectedRoute requiredRole="admin">
                                    <Usermanagement />
                                </ProtectedRoute>}
                            />

                            <Route path="/gamemanagement" element={
                                <ProtectedRoute requiredRole="admin">
                                    <Gamemanagement />
                                </ProtectedRoute>}
                            />

                            <Route path="/CategoriesManagement" element={
                                <ProtectedRoute requiredRole="admin">
                                    <CategoriesManagement />
                                </ProtectedRoute>}
                            />

                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Routes>



                </BrowserRouter>
            </AuthProvider>
        </>

    )
}

export default App
