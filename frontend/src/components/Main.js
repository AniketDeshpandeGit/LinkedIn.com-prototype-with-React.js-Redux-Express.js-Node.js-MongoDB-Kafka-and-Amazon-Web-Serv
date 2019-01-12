import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import JobPost from './JobPost/JobPost';
import JobStats from './JobStats/JobStats';
import Search from './Search/Search';
import Profile from './Profile/Profile';
import ProfileContact from './Profile/ProfileContact';
import ProfileEditIntro from './Profile/ProfileEditIntro';
import Jobcard from './Cards/Jobcard';
import Carddrawer from './CardDrawer/Carddrawer';
import Jobopen from './Jobopen/Jobopen';
import NormalApply from './Apply/NormalApply';
import EasyApply from './Apply/EasyApply';
import Connections from "./Connections/Connections";
import test from "./Test/test";
import RecruiterJobs from "./RecruiterJobs/RecruiterJobs";
import RecruterApplyFind from './RecruterApplyList/RecruterApplyFind';
import PeopleSearch from './CardDrawer/PeopleDrawer';
import ViewApplicants from './CardDrawer/ViewApplicants';
import ProfileSkills from './Profile/ProfileSkills';


const Main = () => (
    <BrowserRouter>
        <div>
            {/* <Switch> */}
            <Route exact path='/' component={LandingPage} />
            <Route exact path="/jobpost" component={JobPost} />
            <Route path ="/profile" component={Profile} />
            <Route path="/profile/contact-information" component={ProfileContact} />
            <Route path="/profile/edit-intro" component={ProfileEditIntro} />


            <Route path="/profile/add-skills" component={ProfileSkills} />
            <Route exact path="/jobstats" component={JobStats} />
            <Route path="/drawer" component={Carddrawer}/>
            <Route path="/normal" component={NormalApply}/>
            {/* <Route path="/search" component={Search}/> */}
	        <Route path="/connections" exact component={Connections} />
            <Route path="/recruiterjobs" exact component={RecruiterJobs} />
            <Route path="/test" component={test}/>
            <Route path="/peoplesearch" component={PeopleSearch} />
            <Route path="/viewapplicants" component={ViewApplicants}/>
        {/* <Route path="/recruterapplyfind" component={RecruterApplyFind}/> */}
            {/* </Switch> */}
    </div>
    </BrowserRouter>
)

export default Main;
