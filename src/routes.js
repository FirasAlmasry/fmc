import { Route, useLocation, Routes } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import NotFound from './pages/NotFound';

import LoadingPage from './components/global/LoadingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProtectedRoute from './components/global/ProtectedRoute';
import Home from './pages/Home';
import Group from './pages/Group';
import Layout from './pages/Layout';
import FileDetails from './pages/FileDetails';
import Details from './pages/Details';
import DetailsDocument from './pages/DetailsDocument';

// Pages

const RoutesPath = () => {
    const [selectedComponent, setSelectedComponent] = useState('groups');
    const ScrollToTop = () => {
        const { pathname } = useLocation();
        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);
        return null;
    };

    return (
        <>
            <ScrollToTop />
            <Suspense fallback={<LoadingPage />}>
                <Routes>
                    {/* start Auth Provider */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    {/* start service provider */}
                    <Route
                        path="/*"
                        element={
                            <ProtectedRoute>
                                <Layout setSelectedComponent={setSelectedComponent}>
                                    <Routes>
                                        <Route path=""
                                            element={<Home
                                                selectedComponent={selectedComponent}
                                                setSelectedComponent={setSelectedComponent} />} />
                                        <Route path="group/:id" element={<Group />} />
                                        <Route path="file-details/:id" element={<FileDetails />} />
                                        <Route path=":groupId/details-user/:id" element={<Details />} />
                                        <Route path=":groupId/details-document/:id" element={<DetailsDocument />} />
                                    </Routes>
                                </Layout>
                            </ProtectedRoute>
                        }
                    />
                    {/* End service provider */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </>
    );
};

export default RoutesPath;
