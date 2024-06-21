import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { Link } from "react-router-dom";
import { getActiveIcons } from "../../utils/APIRoutes";
import axios from "axios";

function IconListing() {
  const [iconDetails, setIconDetails ] = useState([]);
  useEffect(()=>{
    axios.get(getActiveIcons).then((res)=>{
      console.log("res...All Icons",res);
      if(res.data && res.data.status == true){
        setIconDetails(res.data.data);
      }
    }).catch((error)=>{
      console.log(error);
    })
  },[])
  const columns = React.useMemo(
      () => [
        {
          Header: "Name",
          accessor: "name"
        },
        {
          Header: "Title",
          accessor: "title"
        },
        {
          Header: "Locate",
          accessor: "locate",
          posAccessor: "posCoords"
        },
        {
          Header: "Status",
          accessor: "status",
        },
        {
          Header: "Role",
          accessor: "role",
          filter: "includes"
        }
      ],
      []
  );
  return ( 
    <div className="w-full ">
        <div className="flex justify-between px-8">
            <h2>Icon Listing</h2>
            <Link to={"/upload"}><button className="bg-indigo-500 max-w-[180px] border-solid cursor-pointer rounded-2xl text-white text-xl p-4">Upload Icons</button></Link>
        </div>
        <div className="App" style={{ height: "100%" }}>
            <div className="min-h-screen bg-gray-100 text-gray-900">
            <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                <div className="mt-4">
                <Table columns={columns} data={iconDetails} />
                {/* <Table columns={columns} data={data} map={mapFly} /> */}
                </div>
            </main>
            </div>
        </div>
    </div>
  );
}

export default IconListing;