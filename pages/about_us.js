// pages/about_us.js

import Layout from "../components/Layout";
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Container } from "@material-ui/core";
import {useEffect, useState} from 'react';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: '6px 16px',
    },
    secondaryTail: {
      backgroundColor: theme.palette.secondary.main,
    },
    date:{
        margin: '5px',
        color: "white",
        fontSize: "1rem",
    },
    content:{
        margin: '5px',
    }
  }));

function AboutUs() {
    const [data, setData] = useState({ "timeline" :[]});
        
    useEffect(() => {
        const fetchData = async() =>{
            const result = await fetch("https://pil-api.herokuapp.com/about");
            const timeline = await result.json();
            setData({"timeline": timeline});
        }
        fetchData();
    }, []);

    const classes = useStyles();
    return (
    <Layout title={'PIL | History'} active={'Our History'}>
        <Typography className={'pageHeader'}>
            Our History
        </Typography>
        <Container>
        
        <Container>
            <p id="about_title" style={body_heading_style}>
                ABOUT US
            </p>
            <p id="about_content" style={body_content_style} className={light}>
                PIL is a unique community which inculcates the spirit of student research.
                Students work with like-minded peers to try and solve carefully chosen real-world problems.
                The Lab’s activities include the flagship summer internship, HashCode (a hackathon), RoadShow (A project presentation event) and other enriching opportunities such as workshops and tutorials.<br/><br/>
                Students here, routinely push the boundaries of research by developing products to benefit the masses and publishing their work in conferences and journals of repute. Interns continue working with the lab while in college, sharing insights, starting new projects and mentoring subsequent batches of student interns.<br/><br/>
                Over the years, the members of PIL have grown into a close-knit family who contribute to the lab long after their graduation.
            </p>
        </Container>
            
        </Container>
        <Container>
            <Timeline align="alternate">
                {
                    data.timeline.map((event) => 
                        <TimelineItem>
                            <TimelineOppositeContent>
                                <Typography variant="body2" className={classes.date}>
                                    {event.year}
                                </Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                            <TimelineDot style={{color: "white", backgroundColor:"green"}}>
                                <ArrowDownwardIcon />
                            </TimelineDot>
                            <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography variant="h6" component="h1" className={classes.content}>
                                        {event.event_title}
                                    </Typography>
                                    <Typography className={classes.content}>{event.event_description}</Typography>
                                </Paper>
                            </TimelineContent>
                    </TimelineItem>
                    )
                }
            </Timeline>
        </Container>
    </Layout>
    );
}

// export async function getServerSideProps(context){
//     const res = await fetch("https://pil-api.herokuapp.com/about");
//     const timeline = await res.json();
//     return {props:{timeline}};
// }

export default AboutUs;
