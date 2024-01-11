import React from 'react';
import {Card, CardContent, Typography} from '@mui/material';
import './InfoBox.css';

function InfoBox({title, active, cases, total, ...props}){
    return(
            <Card onClick={props.onClick} className={`infoBox ${active && `InfoBox--selected`}`}>
                <CardContent>
                    <Typography color='textSecondary' className='infoBox__title'>{title}</Typography>
                    <h2 className='infoBox__cases' >{cases}</h2>
                    <Typography color='textSecondary' className='infoBox__total'>{total} Total</Typography>
                </CardContent>
            </Card>

    )

}

export default InfoBox;