import React from 'react';
import './Manager.css'
import Footer from '../Footer/Footer.js';
//import Fire from '../../firebaseConfig';
import {Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css';
import NewUsers from './NewUsers'
import Staff from './Staff';
import Menu from '../Menu/Menu';
import Users from './Users'
import TabooWords from './Taboo'
import ComplaintCompliment from './ComplaintCompliment'
import Hire from './Hire';


export default function ManagerPage() {
    
    return (     
        <div style={{textAlign:'center'}}>
            <div className='manager-background-boi'>
                    <Tabs defaultIndex={1} onSelect={index => console.log(index)}>
                        <TabList>
                            <Tab>New Users</Tab>
                            <Tab>Users</Tab>
                            <Tab>Menu</Tab>
                            <Tab>Staff</Tab>
                            <Tab>Complaints/Compliments</Tab>
                            <Tab>Taboo words</Tab>
                            <Tab>Hire</Tab>
                        </TabList>

                        <TabPanel>
                            <NewUsers/>
                        </TabPanel>

                        <TabPanel>
                            <Users/>
                        </TabPanel>

                        <TabPanel>
                            <Menu/>
                        </TabPanel>
                        
                        <TabPanel>
                           <Staff/>
                        </TabPanel>

                        <TabPanel>
                            <ComplaintCompliment/>
                        </TabPanel>

                        <TabPanel>
                            <TabooWords/>
                        </TabPanel>

                        <TabPanel>
                            <Hire/>
                        </TabPanel>
                    </Tabs>
                    
                </div>
        </div>
        );

    
}


/*
 
*/