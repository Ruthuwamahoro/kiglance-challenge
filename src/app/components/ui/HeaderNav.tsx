import * as React from 'react';
import Box from '@mui/material/Box';
import { CiHome } from "react-icons/ci";
import Typography from '@mui/material/Typography';
import { FaUserGroup } from "react-icons/fa6";
import { Button } from '@mui/material';
import { IoTrendingUpSharp } from "react-icons/io5";


export default function AccountMenu() {
  return (
      <React.Fragment>

            <div className="bg-[#141B29] text-white flex items-center justify-between px-7 py-7">
                <div className='flex items-center space-x-3'>
                    <span><IoTrendingUpSharp className='text-[#8D57FA] font-bold' size={40}/></span>
                    <span>Tech Trendin</span>
                </div>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }} className="cursor-pointer">
                        <Typography sx={{ minWidth: 100 }} className=''>
                            <div className='flex items-center space-x-3'>
                                <CiHome size={30}/> 
                                <span>
                                    Home
                                </span>
                            </div>
                        </Typography>
                        <Typography sx={{ minWidth: 100 }} className='mx-8'>
                            <div className='flex items-center space-x-3 text-gray-500'>
                                <FaUserGroup size={30}/> <span>Community</span>
                            </div>
                        </Typography>
                        <div className='space-x-3'>
                            <Button variant="outlined" className='border-gray-500 bg-gray-800'><span className="text-gray-500">Log In</span></Button>
                            <Button variant="contained">Sign Up</Button>
                        </div>
                </Box>
            </div>
        </React.Fragment>
  );
}
