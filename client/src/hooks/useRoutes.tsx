import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useTypedSelector } from "./useTypedSelector";
import { useActions } from "./useActions";
import NewsPage from "..//pages/User/NewsPage/NewsPage";
import SupervisorsPage from "../pages/User/SupervisorsPage/SupervisorsPage";
import MainPage from "../pages/User/MainPage/MainPage";
import AboutPage from "../pages/User/AboutPage/AboutPage";
import AdminNewsPage from "../pages/Admin/AdminNewsPage/AdminNewsPage";
import AdminNewsAddPage from "../pages/Admin/AdminNewsPage/AdminNewsAddPage/AdminNewsAddPage";
import Login from "../pages/Admin/Login/Login";
import CouncilPage from "../pages/User/CouncilPage/CouncilPage";
import RegistrationPage from "../pages/User/RegistrationPage/RegistrationPage";
import EventsPage from "../pages/User/EventsPage/EventsPage";
import AdminEventsPage from "../pages/Admin/AdminEventsPage/AdminEventsPage";
import AdminLayout from "../components/Admin/AdminLayout/AdminLayout";
import MainLayout from "../components/MainLayout/MainLayout";
import DocumentsPage from "../pages/User/DocumentsPage/DocumentsPage";
import ConferencePage from "../pages/User/ConferencePage/ConferencePage";
import GrantsPage from "../pages/User/GrantsPage/GrantsPage";
import AdminActivtiesPage from "../pages/Admin/AdminActivitiesPage/AdminActivitiesPage";
import AdminAddActivitiesPage from "../pages/Admin/AdminActivitiesPage/AdminAddActivitiesPage/AdminAddActivitiesPage";

export const useRoutes = () => {
    const isAuth = useTypedSelector(state => state.user.isAuth)
    const { checkAuthUser } = useActions()

    useEffect(() => {
        checkAuthUser()
    }, [])

    return (
        <Routes>
            {
                isAuth ? (
                    <>
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route path="news" element={<AdminNewsPage />} />
                            <Route path="news/add" element={<AdminNewsAddPage />} />
                            <Route path="news/:id" element={<AdminNewsAddPage />} />
                            <Route path="conf" element={<AdminNewsPage />} />
                            <Route path="council" element={<AdminNewsPage />} />
                            <Route path="supervisors" element={<AdminNewsPage />} />
                            <Route path="documents" element={<AdminNewsPage />} />
                            <Route path="activities" element={<AdminActivtiesPage />} />
                            <Route path="activities/add" element={<AdminAddActivitiesPage />} />
                            <Route path="activities/:id" element={<AdminAddActivitiesPage />} />
                            <Route path="events" element={<AdminEventsPage />} />
                        </Route>
                    </>
                ) : <Route path="/admin/*" element={<Login />} />
            }
            <Route path="/" element={<MainLayout />}>
                <Route index element={<MainPage />} />
                <Route path="news" element={<NewsPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="supervisors" element={<SupervisorsPage />} />
                <Route path="council" element={<CouncilPage />} />
                <Route path="registration" element={<RegistrationPage />} />
                <Route path="events" element={<EventsPage />} />
                <Route path="documents" element={<DocumentsPage />} />
                <Route path="conference" element={<ConferencePage />} />
                <Route path="grants" element={<GrantsPage />} />
                <Route path="*" element={<MainPage />} />
            </Route>
        </Routes>
    )
}