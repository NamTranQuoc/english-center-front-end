import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";


const App = () => (
    <div className="gx-main-content-wrapper">
        <Switch>
            <Route path="/admin/dashboard" component={asyncComponent(() => import('./dashboardPage'))}/>
            <Route path="/admin/student" component={asyncComponent(() => import('./userPage/studentPage'))}/>
            <Route path="/admin/teacher" component={asyncComponent(() => import('./userPage/teacherPage'))}/>
            <Route path="/admin/receptionist" component={asyncComponent(() => import('./userPage/receptionistPage'))}/>
            <Route path="/admin/course-category"
                   component={asyncComponent(() => import('./studyPage/courseCategoryPage'))}/>
            <Route path="/admin/course" component={asyncComponent(() => import('./studyPage/coursePage'))}/>
            <Route path="/admin/shift" component={asyncComponent(() => import('./studyPage/shiftPage'))}/>
            <Route path="/admin/room" component={asyncComponent(() => import('./studyPage/roomPage'))}/>
			<Route path="/admin/document" component={asyncComponent(() => import('./documentPage'))}/>
            <Route path="/admin/class" component={asyncComponent(() => import('./studyPage/classPage'))}/>
            <Route path="/admin/schedule" component={asyncComponent(() => import('./studyPage/schedulePage'))}/>
            <Route path="/admin/examSchedule" component={asyncComponent(() => import('./examSchedulePage/examScheduleListPage'))}/>
            <Route path="/admin/register" component={asyncComponent(() => import('./registerPage'))}/>
        </Switch>
    </div>
);

export default App;
