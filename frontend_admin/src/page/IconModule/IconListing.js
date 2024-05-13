import React from "react";
import Table from "../../components/Table";
import { Link } from "react-router-dom";

const getData = () => [
    {
      name: "Jane Cooper",
      email: "jane.cooper@example.com",
      title: "Regional Paradigm Technician",
      department: "Optimization",
      status: "Active",
      role: "Admin",
      locate: "Locate1",
      posCoords: [260, 900],
      imgUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
    },
    {
        name: "Jane Cooper",
        email: "jane.cooper@example.com",
        title: "Regional Paradigm Technician",
        department: "Optimization",
        status: "Active",
        role: "Admin",
        locate: "Locate1",
        posCoords: [260, 900],
        imgUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
      },
      {
        name: "Jane Cooper",
        email: "jane.cooper@example.com",
        title: "Regional Paradigm Technician",
        department: "Optimization",
        status: "Active",
        role: "Admin",
        locate: "Locate1",
        posCoords: [260, 900],
        imgUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
      },
      {
        name: "Jane Cooper",
        email: "jane.cooper@example.com",
        title: "Regional Paradigm Technician",
        department: "Optimization",
        status: "Active",
        role: "Admin",
        locate: "Locate1",
        posCoords: [260, 900],
        imgUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
      },
      {
        name: "Jane Cooper",
        email: "jane.cooper@example.com",
        title: "Regional Paradigm Technician",
        department: "Optimization",
        status: "Active",
        role: "Admin",
        locate: "Locate1",
        posCoords: [260, 900],
        imgUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
      },
      {
        name: "Jane Cooper",
        email: "jane.cooper@example.com",
        title: "Regional Paradigm Technician",
        department: "Optimization",
        status: "Active",
        role: "Admin",
        locate: "Locate1",
        posCoords: [260, 900],
        imgUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
      },
      {
        name: "Jane Cooper",
        email: "jane.cooper@example.com",
        title: "Regional Paradigm Technician",
        department: "Optimization",
        status: "Active",
        role: "Admin",
        locate: "Locate1",
        posCoords: [260, 900],
        imgUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
      },
      {
        name: "Jane Cooper",
        email: "jane.cooper@example.com",
        title: "Regional Paradigm Technician",
        department: "Optimization",
        status: "Active",
        role: "Admin",
        locate: "Locate1",
        posCoords: [260, 900],
        imgUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
      },
      {
        name: "Jane Cooper",
        email: "jane.cooper@example.com",
        title: "Regional Paradigm Technician",
        department: "Optimization",
        status: "Active",
        role: "Admin",
        locate: "Locate1",
        posCoords: [260, 900],
        imgUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
      },
    {
      name: "Cody Fisher",
      email: "cody.fisher@example.com",
      title: "Product Directives Officer",
      department: "Intranet",
      status: "Active",
      role: "Owner",
      locate: "Locate",
      imgUrl:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
    },
    {
      name: "Esther Howard",
      email: "esther.howard@example.com",
      title: "Forward Response Developer",
      department: "Directives",
      status: "Active",
      role: "Member",
      locate: "Locate",
      imgUrl:
        "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
    },
    {
      name: "Jenny Wilson",
      email: "jenny.wilson@example.com",
      title: "Central Security Manager",
      department: "Program",
      status: "Active",
      role: "Member",
      locate: "Locate",
      imgUrl:
        "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
    },
    {
      name: "Kristin Watson",
      email: "kristin.watson@example.com",
      title: "Lean Implementation Liaison",
      department: "Mobility",
      status: "Active",
      role: "Admin",
      locate: "Locate",
      imgUrl:
        "https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
    },
    {
      name: "Cameron Williamson",
      email: "cameron.williamson@example.com",
      title: "Internal Applications Engineer",
      department: "Security",
      status: "Active",
      role: "Member",
      locate: "Locate",
      posCoords: [260, 900],
      imgUrl:
        "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
    }
];

function IconListing() {
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
    const data = React.useMemo(() => getData(), []);
    return ( 
        <div className="w-full ">
            <div className="flex justify-between px-8">
                <p>Icon Listing</p>
                <Link to={"/upload"}><button className="bg-indigo-500 max-w-[120px] border-solid cursor-pointer rounded-2xl text-white text-xl p-4">Upload Icons</button></Link>
            </div>
            <div className="App" style={{ height: "100%" }}>
                <div className="min-h-screen bg-gray-100 text-gray-900">
                <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                    <div className="mt-4">
                    <Table columns={columns} data={data} />
                    {/* <Table columns={columns} data={data} map={mapFly} /> */}
                    </div>
                </main>
                </div>
            </div>
        </div>
    );
}

export default IconListing;