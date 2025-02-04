import React, { useEffect, useState } from 'react';
import GraphComponent from './components/GraphComponent';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('userData');
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  const handleRedirect = () => {
    // Redirect to the Analytics page
    window.location.href = "/analyse";
  }
  const handleLogout=()=>{
    localStorage.clear();
    window.location.href="/login";
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  const forgeryScansData = userData.forgeryScansDoneEveryMonth;
  const forgeryDetectionsData = userData.forgeryDetectedEveryMonth;
  const labels = userData.forgeryScansDoneEveryMonth.map(item => item.month);

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f8f9fa' }}>
      
      {/* Left Sidebar */}
      <aside style={{ width: "250px", backgroundColor: "#ffffff", padding: "20px", borderRight: "1px solid #ddd"}}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "black", marginBottom: "20px",position:"relative",left:"25px" }}><svg style={{marginRight:"5px",position:"relative",top:"6px"}} width="28" height="28" viewBox="0 0 37 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M-0.000244141 9.89159L18.4814 17.05L36.9631 9.89159L23.6875 0L28.1127 7.54885L18.4814 11.1931L8.85013 7.54885L13.2753 0L-0.000244141 9.89159ZM12.3644 27.9828L18.4815 32.0176L24.5987 27.9828L19.9132 20.9546L36.7029 13.2756L27.3319 22.5164L32.538 30.1954L18.4815 39.4363L4.42505 30.1954L9.63115 22.5164L0.260173 13.2756L17.0498 20.9546L12.3644 27.9828Z" fill="#EE2644"/>
</svg>
VoxGuard
</h1>
        <button onClick={handleLogout} style={{position:"relative",
        left:"5px",
      backgroundColor: "black",
      color: "white",
      fontSize: "16px",
      marginBottom:"20px",
      width: "200px",
      // padding: "10px 15px",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      padding:"15px",
      // borderRadius: "16px",
background: "rgba(0, 0, 0, 0.85)",

/* Button */
boxShadow: "0px 10px 22px 0px rgba(0, 0, 0, 0.40), 0px 2.289px 5.035px 0px rgba(0, 0, 0, 0.05), 0px 0.602px 1.325px 0px rgba(0, 0, 0, 0.01)"
      }}>
          Logout
        </button>
        <button onClick={handleRedirect} style={{position:"relative",
        left:"5px",
      backgroundColor: "black",
      color: "white",
      fontSize: "16px",
      width: "200px",
      // padding: "10px 15px",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      padding:"15px",
      // borderRadius: "16px",
background: "rgba(0, 0, 0, 0.85)",

/* Button */
boxShadow: "0px 10px 22px 0px rgba(0, 0, 0, 0.40), 0px 2.289px 5.035px 0px rgba(0, 0, 0, 0.05), 0px 0.602px 1.325px 0px rgba(0, 0, 0, 0.01)"
      }}>
          + Analyse Audio
        </button>

        <nav style={{ marginTop: "20px" }}>
          <ul style={{ listStyle: "none", padding: "10px" }}>
            <li style={{marginBottom:"10px",backgroundColor:"#0000000A",borderRadius:"10px",paddingLeft:"10px",paddingTop:"10px"}}><span style={{display:"inlineBlock"}}><svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M14.921 4.53991C14.2091 4.15664 13.3575 4.15664 12.6456 4.53991L5.87473 8.18488C5.07525 8.61526 4.57495 9.46161 4.57495 10.3837L4.57495 20.1179C4.57495 21.491 5.66626 22.6041 7.01245 22.6041H20.5541C21.9003 22.6041 22.9916 21.491 22.9916 20.1179V10.3837C22.9916 9.46161 22.4913 8.61527 21.6918 8.18488L14.921 4.53991ZM11.8871 3.07404C13.0737 2.43526 14.4929 2.43526 15.6795 3.07404L22.4503 6.71901C23.7828 7.43632 24.6166 8.8469 24.6166 10.3837V20.1179C24.6166 22.4064 22.7978 24.2616 20.5541 24.2616H7.01245C4.76879 24.2616 2.94995 22.4064 2.94995 20.1179L2.94995 10.3837C2.94995 8.8469 3.78378 7.43632 5.11624 6.71901L11.8871 3.07404Z" fill="black"/>
<path fillRule="evenodd" clipRule="evenodd" d="M13.6961 15.4216H13.8704C14.4491 15.4216 14.9321 15.4216 15.3267 15.4545C15.7382 15.4888 16.1246 15.5629 16.49 15.7528C17.0505 16.0441 17.5063 16.509 17.7919 17.0808C17.9781 17.4535 18.0508 17.8476 18.0844 18.2674C18.1166 18.6698 18.1166 19.1625 18.1166 19.7527V23.4329C18.1166 23.8906 17.7528 24.2616 17.3041 24.2616H10.2625C9.81372 24.2616 9.44995 23.8906 9.44995 23.4329V19.7527C9.44994 19.1625 9.44993 18.6698 9.48217 18.2674C9.51579 17.8476 9.5885 17.4535 9.77466 17.0808C10.0603 16.509 10.516 16.0441 11.0766 15.7528C11.442 15.5629 11.8284 15.4888 12.2399 15.4545C12.6345 15.4216 13.1175 15.4216 13.6961 15.4216ZM12.3722 17.1065C12.0612 17.1324 11.9124 17.1787 11.8143 17.2297C11.5595 17.3621 11.3524 17.5734 11.2225 17.8333C11.1726 17.9334 11.1272 18.0851 11.1018 18.4023C11.0756 18.7293 11.075 19.1538 11.075 19.7864V22.6041H16.4916V19.7864C16.4916 19.1538 16.491 18.7293 16.4648 18.4023C16.4394 18.0851 16.394 17.9334 16.344 17.8333C16.2142 17.5734 16.007 17.3621 15.7522 17.2297C15.6541 17.1787 15.5054 17.1324 15.1944 17.1065C14.8738 17.0798 14.4576 17.0791 13.8375 17.0791H13.7291C13.109 17.0791 12.6928 17.0798 12.3722 17.1065Z" fill="black"/>
</svg>
<h2 style={{display:"inline-block",position:"relative",bottom:"5px",marginLeft:"10px",fontWeight:"normal"}}>Overview</h2>
</span>
</li>

            <li style={{marginBottom:"10px"}}><span style={{display:"inlineBlock"}}><svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.96887 8.86748L4.96887 6.16825C4.96887 5.66966 4.56469 5.26548 4.0661 5.26548C3.56751 5.26548 3.16333 5.66966 3.16333 6.16825V11.1335C3.16333 11.6321 3.56751 12.0363 4.0661 12.0363H9.03134C9.52993 12.0363 9.93411 11.6321 9.93411 11.1335C9.93411 10.6349 9.52993 10.2307 9.03134 10.2307H6.24293C7.82021 7.59323 10.7033 5.82967 13.9967 5.82967C18.9826 5.82967 23.0245 9.87152 23.0245 14.8574C23.0245 19.8433 18.9826 23.8851 13.9967 23.8851C9.59042 23.8851 5.91969 20.7274 5.12748 16.5511C5.03456 16.0613 4.56213 15.7395 4.07228 15.8324C3.58243 15.9253 3.26065 16.3977 3.35358 16.8876C4.30444 21.9002 8.70697 25.6906 13.9967 25.6906C19.9798 25.6906 24.83 20.8404 24.83 14.8574C24.83 8.87434 19.9798 4.02413 13.9967 4.02413C10.2273 4.02413 6.90881 5.9494 4.96887 8.86748Z" fill="black"/>
<path d="M13.9995 8.98423C14.4981 8.98423 14.9023 9.38841 14.9023 9.887V14.3241L18.4867 17.9086C18.8393 18.2611 18.8393 18.8327 18.4867 19.1853C18.1342 19.5378 17.5626 19.5378 17.21 19.1853L13.3612 15.3364C13.1919 15.1671 13.0968 14.9375 13.0968 14.6981V9.887C13.0968 9.38841 13.5009 8.98423 13.9995 8.98423Z" fill="black"/>
</svg>

<h2 style={{display:"inline-block",position:"relative",bottom:"8px",marginLeft:"10px",fontWeight:"normal"}}>History</h2>
</span>
</li>
            <li style={{marginBottom:"10px"}}><span style={{display:"inlineBlock"}}><svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.96887 8.86748L4.96887 6.16825C4.96887 5.66966 4.56469 5.26548 4.0661 5.26548C3.56751 5.26548 3.16333 5.66966 3.16333 6.16825V11.1335C3.16333 11.6321 3.56751 12.0363 4.0661 12.0363H9.03134C9.52993 12.0363 9.93411 11.6321 9.93411 11.1335C9.93411 10.6349 9.52993 10.2307 9.03134 10.2307H6.24293C7.82021 7.59323 10.7033 5.82967 13.9967 5.82967C18.9826 5.82967 23.0245 9.87152 23.0245 14.8574C23.0245 19.8433 18.9826 23.8851 13.9967 23.8851C9.59042 23.8851 5.91969 20.7274 5.12748 16.5511C5.03456 16.0613 4.56213 15.7395 4.07228 15.8324C3.58243 15.9253 3.26065 16.3977 3.35358 16.8876C4.30444 21.9002 8.70697 25.6906 13.9967 25.6906C19.9798 25.6906 24.83 20.8404 24.83 14.8574C24.83 8.87434 19.9798 4.02413 13.9967 4.02413C10.2273 4.02413 6.90881 5.9494 4.96887 8.86748Z" fill="black"/>
<path d="M13.9995 8.98423C14.4981 8.98423 14.9023 9.38841 14.9023 9.887V14.3241L18.4867 17.9086C18.8393 18.2611 18.8393 18.8327 18.4867 19.1853C18.1342 19.5378 17.5626 19.5378 17.21 19.1853L13.3612 15.3364C13.1919 15.1671 13.0968 14.9375 13.0968 14.6981V9.887C13.0968 9.38841 13.5009 8.98423 13.9995 8.98423Z" fill="black"/>
</svg>


<h2 style={{display:"inline-block",position:"relative",bottom:"5px",marginLeft:"10px",fontWeight:"normal"}}>Contacts</h2>
</span>
</li>
            <li style={{marginBottom:"10px"}}><span style={{display:"inlineBlock"}}><svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M15.2884 10.0874C15.7111 12.3153 17.6685 14 20.0195 14C22.679 14 24.835 11.844 24.835 9.18444C24.835 6.52488 22.679 4.36888 20.0195 4.36888C17.6685 4.36888 15.7111 6.05355 15.2884 8.28152H4.06796C3.56929 8.28152 3.16504 8.68577 3.16504 9.18444C3.16504 9.6831 3.56929 10.0874 4.06796 10.0874H15.2884ZM20.0195 12.1942C18.3573 12.1942 17.0098 10.8467 17.0098 9.18444C17.0098 7.52221 18.3573 6.17471 20.0195 6.17471C21.6817 6.17471 23.0292 7.52221 23.0292 9.18444C23.0292 10.8467 21.6817 12.1942 20.0195 12.1942Z" fill="black"/>
<path fillRule="evenodd" clipRule="evenodd" d="M7.9806 14C5.32104 14 3.16504 16.156 3.16504 18.8155C3.16504 21.4751 5.32104 23.6311 7.9806 23.6311C10.3315 23.6311 12.289 21.9464 12.7116 19.7185H23.9321C24.4308 19.7185 24.835 19.3142 24.835 18.8155C24.835 18.3169 24.4308 17.9126 23.9321 17.9126H12.7116C12.289 15.6847 10.3315 14 7.9806 14ZM4.97087 18.8155C4.97087 17.1533 6.31837 15.8058 7.9806 15.8058C9.64282 15.8058 10.9903 17.1533 10.9903 18.8155C10.9903 20.4778 9.64282 21.8253 7.9806 21.8253C6.31837 21.8253 4.97087 20.4778 4.97087 18.8155Z" fill="black"/>
</svg>


<h2 style={{display:"inline-block",position:"relative",bottom:"8px",marginLeft:"10px",fontWeight:"normal"}}>Settings</h2>
</span>
</li>
            
          </ul>
        </nav>
      </aside>

      {/* Main Dashboard */}
      <main style={{ flex: 1, padding: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Dashboard</h2>

        <div style={{ display: 'flex', gap: '20px' }}>
          {/* Forgery Scans Done */}
          <div style={{ flex: '1', backgroundColor: '#e0f2ff', padding: '20px', borderRadius: '10px' }}>
            <p style={{ fontSize: '14px', color: '#555' }}>Forgery Scans Done</p>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold' }}>{userData.numberOfForgeryScansDone}</h3>
            <span style={{ fontSize: '12px', color: 'green' }}>+11.01%</span>
          </div>

          {/* Forgery Detected */}
          <div style={{ flex: '1', backgroundColor: '#daeaff', padding: '20px', borderRadius: '10px' }}>
            <p style={{ fontSize: '14px', color: '#555' }}>Forgery Detected</p>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold' }}>{userData.numberOfForgeryDetected}</h3>
            <span style={{ fontSize: '12px', color: 'red' }}>-0.03%</span>
          </div>
        </div>

        {/* Graphs Placeholder */}
        <div style={{ marginTop: '20px', backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', height: '300px', border: '1px solid #ddd' }}>
          <p style={{ fontSize: '16px', fontWeight: 'bold' }}>Graph Analysis</p>
          <div style={{ height: '230px' }}>
            <GraphComponent labels={labels} forgeryScansData={forgeryScansData} forgeryDetectionsData={forgeryDetectionsData} />
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside style={{ width: '280px', backgroundColor: '#ffffff', padding: '20px', borderLeft: '1px solid #ddd' }}>
        <h3 style={{ fontSize: '25px', fontWeight: 'bold', marginBottom: '10px' }}>Notifications</h3>
        
        {/* Notifications Placeholder */}
        <div style={{ fontSize: '20px', color: '#555', marginBottom: '20px' }}>
          <p>⚠️ Fake Contact Detected - Just now</p>
          <p>📢 New Update Available - Today, 11:59 AM</p>
        </div>

        <h3 style={{ fontSize: '25px', fontWeight: 'bold', marginBottom: '10px' }}>Favorite Contacts</h3>
        
        {/* Contacts Placeholder */}
        <ul style={{ listStyle: 'none', padding: '0' }}>
          {userData.favouriteContacts.map((contact) => (
            <li key={contact.name} style={{ marginBottom: '10px' }}>
              <p style={{ fontSize: '20px', color: '#555' }}>{contact.name}</p>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Dashboard;
