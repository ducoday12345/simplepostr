import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { commentPost } from '../../actions/posts';

const CommentSection = ({ post }) =>{
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const commentsRef = useRef();

    const handleClick = async ()=>{
        var date=new Date();  
        var day=date.getDate();  
        var month=date.getMonth();  
        var year=date.getFullYear(); 
        var h=date.getHours();  
        var m=date.getMinutes();  
        var s=date.getSeconds();  
        const finalComment = `${user.result.name}: ${comment}|${month+"/"+day+"/"+year+"  "+h+"."+m+"."+s} `;
        const newComments = await dispatch(commentPost(finalComment, post._id));
        
        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return(
        <div>
            
            <div className={classes.commentsOuterContainer}>
                <div>                
                    <div><Typography gutterBottom variant="h6" className={classes.commentFont}>Comments</Typography></div>
                    <div className={classes.commentsInnerContainer}>
                        {comments.map((c, i) => (
                            <Typography key={i} gutterBottom variant="subtitle1">
                                <strong>{ c.split(': ')[0]}</strong>
                                {(c.split(':')[1]).split('|')[0]}
                                <i><sub>  [{(c.split(':')[1]).split('|')[1]}]</sub></i>
                            </Typography>
                        ))}
                    <div ref={commentsRef} />
                </div>
                </div>
                {user?.result?.name && (
                    <div styles={{ width: '100%' }}>
                        <Typography gutterBottom variant="h6" className={classes.commentFont}>Write a comment</Typography>
                        <TextField 
                            //className={classes.commentBox}
                            fullWidth
                            minRows={10}
                            variant="outlined"
                            label="Comment"
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button className={classes.btn} style={{ marginTop: '10px' }} fullWidth disabled={!comment} borderWidth='10' variant="outlined" color="primary" onClick={handleClick} cursor="pointer" >
                            Comment
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentSection;