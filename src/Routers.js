import React, {lazy, Suspense} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const StudentRegistration = lazy(()=>import("./views/addStudent/StudentRegistration"))
const ViewStudent = lazy(()=>import("./views/viewStudent/ViewStudent"))

export default function Routers() {
    return(
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/student-registration" element={<StudentRegistration />} />
                    <Route path="/view-students" element={<ViewStudent />} />
                </Routes>
            </Suspense>
        </Router>
    )
}