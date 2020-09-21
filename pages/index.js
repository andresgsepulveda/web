// pages/index.js
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Container from '@material-ui/core/Container';
import { light } from '@material-ui/core/styles/createPalette';
import CloseIcon from '@material-ui/icons/Close';
import { Card, CardContent, Typography, Grid,
         CardMedia, Dialog, AppBar, Toolbar, 
         IconButton, Slide } from '@material-ui/core';
import '../css/index.css';

const main_title_style = {
    fontFamily:'Poppins, sans-serif',
    textAlign: "center",
    fontSize: "3.5rem",
    color: '#8bc34a',
}
const former_style = {
    fontFamily:'Poppins, sans-serif',
    textAlign: "center",
    fontSize: "2rem",
    color: '#8bc34a',
}
const main_content_style = {
    fontFamily:'Red Hat Display, sans-serif',
    fontSize: '1.8rem',
    marginBottom: '150px',
    textAlign: "center",
    color: 'white',
}

const body_content_style ={
    fontSize: '1.25rem',
    textAlign: "left",
    color: '#8bc34a',
}

const body_heading_style={
    fontSize: '3rem',
    textAlign: "center",
    color: '#8bc34a',
    textAlign:"center",
}

const details= {
      display: 'flex',
      flexDirection: 'column',
}


const prof_data = [
    {
        "name":"Prof. Rajasekar M",
        "designation":"Associate Professor",
        "org":"PES University",
        "description":"Prof. M Rajasekar is an Associate Professor in the department of Electronics and Communication Engineering at PES University. He is an alumnus of IIT Madras (Computer Science and Engineering). He brings with him over two decades of rich and varied experience ranging from combatant in Indian Air Force to Systems Engineer and Project Manager in the IT Industry. He manages the PES Innovation Lab at the PES University. He has been actively involved in various projects undertaken at PES Innovation Lab. His research interests include wireless communications, embedded systems and healthcare systems. He handholds student projects in several domains viz. Robotics, IoT, Machine Learning, Sensor Networks and Virtual Reality. Recently, he presented his project works in the International Conferences (TENCON) held in Singapore, Malaysia and Jeju,South Korea. He is an astute listener and motivator.",
        "image":`${process.env.ASSET_PREFIX}/images/mlab/Rajasekar_profile.jpg`,
    },
    {
        "name":"Dr. Venkatarangan MJ",
        "designation":"Professor",
        "org":"PES University",
        "description":"After leaving Philips in 2015 to follow his passion towards teaching and research, Dr. Venkatarangan joined PES University as the Associate Professor in EEE to focus on Embedded Systems stream. Prior to joining PES University, he spent 20 years in Tektronix, Siemens, HCL Technologies and Philips working in India and abroad serving in roles right from Software Engineer to System Architect. As System Architect he was on technical lead for projects across sites and also supported cross functions like program or purchase management, quality and product strategy for platform evaluation, supplier evaluation and product road-mapping. A significant achievement has been to lead as Architect for first Digital TV for US market and also to develop MP3 Audio products adhering to Microsoft PlaysForSure specifications. Rangan is an alumnus of Chinese University of Hong Kong where he completed is PhD and holds M.Tech and B.E from Mysore University. He current teaches Microcontroller and Applications, Signals and Systems, 'C' Programming and Intoduction to Robotics. His research interests include embedded systems, IoT, Robotics, Automation and Sensor networks.He supports the PES Innovation Lab activities and summer internship projects in domains of embedded systems, IoT Robotics and Automation.",
        "image":`${process.env.ASSET_PREFIX}/images/mlab/Venkatarangan_profile.jpg`,
    },
    {
        "name":"Dr. A Srinivas",
        "designation":"Founder",
        "org":"PES Innovation Lab",
        "description":"Dr. A Srinivas is the faculty founder of PES Innovation Lab (formerly known as Microsoft Innovation Lab). He is presently the Dean, School of Engineering in Dayananda Sagar University. He has worked for 10 years in Companies/Research Organizations Such as Tata Consulting Engineers, Centre for AI & amp; Robotics (DRDO), Philips Software Centre and Nortel Networks (Sydney,Australia). Academic experience of 19 yrs with KREC, Surathkal, Amrita University, PES University and Monash University (Melbourne, Australia). His Areas of Research Interest: Wireless Networks, Healthcare Informatics. He is extremely passionate about promoting Undergraduate Research.",
        "image":`${process.env.ASSET_PREFIX}/images/mlab/Srinivas_profile.jpg`,
    }
]

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Index() {
        const [data, setData] = useState({ "stats" :[]});
        
        useEffect(() => {
            const fetchData = async() =>{
                const result = await fetch("https://pil-api.herokuapp.com/stats");
                const output = await result.json();
                let stats = [];
                for (let key in output){
                    stats.push({key:key,data:output[key]});
                }
                setData({"stats": stats});
            }
            fetchData();
        }, []);
        
        const [open, setOpen] = useState(false);
        const [selectedProf, setSelectedProf] = useState(prof_data[0]);

        const selectProf = (prof) => {
            setSelectedProf(prof);
            setOpen(true);
        }

        return (
            <Layout title={'PES Innovation Lab'} active={'Home'}>
                <div className='introSection'>
                    <Container>
                        <p style={main_title_style}>PES Innovation Lab</p>
                        <p style={former_style} >(formerly known as Microsoft Innovation Lab)</p>
                                        
                        <blockquote style={main_content_style}>
                            We are a student community dedicated to cultivating the spirit of research and innovation in budding
                            engineers.
                        </blockquote>
                    </Container>
                </div>

                <div className='statSection'>
                    <Container>
                        <Grid container justify="center">
                            {data.stats.map((key) => 
                                <Grid item sm={3} xs={12} justify="center">
                                    <CardContent style={{textAlign: 'center'}}>
                                        <Typography className='statValue' component="p">
                                            {key.data}
                                        </Typography>
                                        <Typography className='statTitle'>
                                            {key.key}
                                        </Typography>
                                    </CardContent>
                                </Grid>
                            )}
                        </Grid>
                    </Container>
                </div>

                <p id="about_title" style={body_heading_style}>
                    PROFESSORS
                </p>
                <Container>
                <Grid container justify="center" className='profContainer'>
                    {prof_data.map((prof)=>
                        <Grid item md={4} sm={12} xs={12} justify="center" style={{textAlign:"center", alignItems:"center"}}>
                            <Card className="profCard" onClick={() => {selectProf(prof)}}>
                                <CardMedia
                                    className="profImage"
                                    image={prof.image}
                                    title={prof.designation}
                                />
                                <div style={details}>
                                    <CardContent>
                                        <Typography component="h5" variant="h5"  className={"profCardDescription"}>
                                            {prof.name}
                                        </Typography>
                                        <Typography className={"profCardDescription"}>
                                            {prof.designation}
                                        </Typography>
                                    </CardContent>
                                </div>
                                
                            </Card>
                        </Grid>
                    )}
                </Grid>
                </Container>

                <Dialog fullScreen open={open} onClose={() => {setOpen(false)}} TransitionComponent={Transition} PaperProps={{ className: 'dialogContainer' }}>
                    <AppBar className='dialogAppBar'>
                        <Toolbar>
                            <Typography variant="h6" className='dialogTitle'>
                                {selectedProf.name}
                            </Typography>
                            <IconButton edge="start" color="inherit" onClick={() => {setOpen(false)}}>
                                <CloseIcon style={{float: 'right', color: '#8bc34a'}}/>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    
                    <Container style={{marginTop: '5em'}}>
                        <CardMedia
                            style={{ maxWidth: '250px', margin: 'auto', height: '300px', marginTop: 30, marginBottom: 30 }}
                            image={selectedProf.image}
                            className='profImage'
                        />
                        <Typography className='profDialogContentHeading'>
                            {selectedProf.name}
                        </Typography>
                        <Typography className='profDialogContentSubHeading'>
                            {selectedProf.designation} | {selectedProf.org}
                        </Typography>
                        <br></br>
                        <Typography className='profDialogContentDescription'>
                            {selectedProf.description}
                        </Typography>
                    </Container>
                </Dialog>

            </Layout>
        );
}

// export async function getServerSideProps(context){
//     const res = await fetch("https://pil-api.herokuapp.com/stats");
//     const output = await res.json();
//     let stats = [];
//     for (let key in output){
//         stats.push({key:key,data:output[key]});
//     }
//     console.log(stats);
//     return {props:{stats}};
// }


export default Index;
