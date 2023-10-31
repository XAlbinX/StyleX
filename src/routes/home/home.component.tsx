import React from 'react';
import { Outlet } from "react-router-dom";
import Directory from "../../component/directory/directory.component";

const Home: React.FC = () => {
  return (
    <div>
      <Directory/>
      <Outlet/>
    </div>
  );
}

export default Home;
