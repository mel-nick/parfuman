import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {faPaperPlane, faEye, faShareSquare} from '@fortawesome/free-regular-svg-icons';
import AdvantagesItem from "../AdvantagesItem/AdvantagesItem";

const advantagesArr = [
    {
        "key": 1,
        "logo": faPaperPlane,
        "title": "Быстрая Доставка",
        "description": "Отправления и доставка товара в любой день в любое время, в кратчайшие сроки!"
    },
    {
        "key": 2,
        "logo": faEye,
        "title": "Безопасный Заказ",
        "description": "Отправка-получение товара по принципу «с рук в руки», оплачивай товар после получения!"
    },
    {
        "key": 3,
        "logo": faShareSquare,
        "title": "Бесплатный Возврат",
        "description": "Полный, 100% возврат средств при несоответствии товара вашим ожиданиям!"
    },
];

const useStyles = makeStyles({
        advantagesWrap: {
            display: 'flex',
            justifyContent: 'center',
        },
        '@media (max-width: 767px)': {
            advantagesWrap: {
                flexDirection: 'column'
            }
        }
    }
);

export default function AdvantagesList(props) {
    console.log(props);
    const classes = useStyles();
    return (
        <div className={classes.advantagesWrap}>
            {advantagesArr.map((elem) => {
                return <AdvantagesItem logo={elem.logo} title={elem.title} key={elem.key}
                                       description={elem.description}/>
            })}
        </div>
    );
}