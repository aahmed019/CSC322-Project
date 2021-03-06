import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button'
import { useAuth } from '../../../contexts/AuthContext';
import Fire from '../../../firebaseConfig';
import firebase from 'firebase/app';
import { getDefaultNormalizer } from '@testing-library/react';

export default function SuccessPage (props){
            const {currentUser}= useAuth();
            const {checkoutvalues} = props;

            const {
                cart,
                balance,
                address,
                city, 
                state, 
                postalCode, 
                total,
                notes,
                option,
                time,
                UserName, 
                userStatus, 
                TotalSpent, 
                totalOrders} = checkoutvalues;

            const db = Fire.db;

            const next= e=>{
                e.preventDefault();
                props.startOver();
            }
            

            useEffect(() =>{                
                //console.log(JSON.stringify(currentUser))

                    changeBalance(currentUser.email).then(
                        ()=> updateOrderHistory(currentUser.email)).then(
                            ()=> updateTotalSpent(currentUser.email)).then(
                                ()=>cart.map(item=> UpdateItemPopularity(item))).then(()=>{         
                                              
                                    switch(option){
                                    case "1": addNewOrder("delivery");break;
                                    case "2": addNewOrder("Pickup");break;
                                    default: console.log("Error in order type")
            
                                }}).then(()=>{ 
                                    db.getCollection("Users").doc(currentUser.email).get().then(doc=>{
                                        if(!doc.data().Vip)
                                        {   //alert("Checking")
    
                                            if(doc.data().totalSpent>= 500 || doc.data().totalOrders >= 50)
                                            {   
                                                alert("Congratulations ! You have been promoted to VIP !")
                                                PromoteUser(currentUser.email);
                                            }
                                        }
                                    })
                                }).catch(error=>console.log("Error: ",error))   
            },[])
            async function changeBalance(userEmail){
                await db.getCollection('Users').doc(userEmail).update({
                    Balance:balance
                }).then(function() {// went through
                    console.log("Approved!");
                    
                })
                .catch(function(error) { //broke down somewhere
                    console.error("Error: ", error);
                });    
            }
            async function PromoteUser(userEmail){
                let vip = true
                await db.getCollection('Users').doc(userEmail).update({
                    Vip: vip
                }).then(function() {// went through
                    console.log("Approved!");
                    
                })
                .catch(function(error) { //broke down somewhere
                    console.error("Error: ", error);
                });    
            }

            async function updateTotalSpent(userEmail){
               
                let update =TotalSpent + total
                await db.getCollection('Users').doc(userEmail).update({
                    totalSpent: update
                }).then(()=>console.log('Approved')).catch(error=>console.log("Error :",error))
            }

            async function updateOrderHistory(userEmail){
                
                if(option==1)
                {
                    await db.getCollection('Users').doc(userEmail).update({
                        orderHistory: firebase.firestore.FieldValue.arrayUnion(
                        {   
                            type:"delivery",
                            cart:cart,
                            timestamp:new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString(),
                            address:address + city + state+ postalCode,
                            pickupTime:"",
                            total:total,
                            notes:notes
                            }
                        )
                    }).then(function() {// went through
                        console.log("Approved!");
                    
                    })
                    .catch(function(error) { //broke down somewhere
                        console.error("Error: ", error);
                    });
                }
                else if(option ==2)
                {
                    await db.getCollection('Users').doc(userEmail).update({
                        orderHistory: firebase.firestore.FieldValue.arrayUnion(
                        {   
                            type:"Pick up",
                            cart:cart,
                            date: new Date().toLocaleDateString(),
                            timestamp:new Date().toLocaleTimeString(),
                            pickupTime: time,
                            address:address +", "+ city+" ," + state+", " +postalCode,
                            total:total,
                            notes:notes
                            }
                        )
                    }).then(function() {// went through
                        console.log("Approved!");
                    
                    })
                    .catch(function(error) { //broke down somewhere
                        console.error("Error: ", error);
                    });
                }
            }
            
            async function changeBalance(userEmail){
                await db.getCollection('Users').doc(userEmail).update({
                    Balance:balance
                }).then(function() {// went through
                    console.log("Approved!");
                    
                })
                .catch(function(error) { //broke down somewhere
                    console.error("Error: ", error);
                });    
            }
            function addNewOrder(type){
                //console.log("UserName:", UserName)
                db.getCollection('Orders').doc().set({
                        address: address+" ,"+city+" ,"+state+" ,"+postalCode,
                        date: new Date().toLocaleDateString(),
                        type:type,
                        deliveredDate:"",
                        deliverer:"",
                        pickupTime:time,
                        items: cart,
                        total:total,
                        user: currentUser.email,
                        userName: UserName,
                        notes: notes
                    })
                    .then(function() {// went through
                        console.log("Approved!");
                        
                    })
                    .catch(function(error) { //broke down somewhere
                        console.error("Error: ", error);
                    });
                }
                async function UpdateItemPopularity(item){
                       
                            let itemCount=0;
                            let type ="";
   
                            if(item.id[0]==="m")
                            {
                                type="Food"
                            }
                            else
                            {
                                type="Drink"
                            }
                            //alert(item.id)
                            //alert(type)
                             db.getCollection(type).doc(item.id).get().then(doc=>{
                                 //console.log(doc.data().id)
                                if(doc.exists)
                                {
                                    itemCount =doc.data().count
                                    //id = doc.data().id
                                   // alert(JSON.stringify(doc.data()))
                                    
                                }
                             }).then(()=>{
                                // alert(id )
                                // alert(itemCount)
                                 db.getCollection(type).doc(item.id).update({
                                    count: itemCount + 1   
                                 })
                             }).then(()=> console.log("Item count updated !")
                            ).catch(error=> console.log("Error: ",error))
                        

                    
                }
                return(
                    <div className="CheckOut">
                    <h1>Thank you very much !</h1>
                    <div>
                    <Button variant="primary"  name="step" value={0} onClick={next}>Order Again</Button>
                    </div>
                </div>
                )
            }
            
        
        
