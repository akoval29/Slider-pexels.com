import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';

const Servise = () => {
    const [search, setSearch] = useState("bass");       //url 
    const [perPage, setPerPage] = useState(10);         //url
    const [result, setResult] = useState([]);           //recieved data
    const [process, setProcess] = useState('waiting');  //FSM

    // зв'язуєм Formik із controls.js з Аксіос тут
    function handleChange(values) {  
        setSearch(values.inputSearch);
        setPerPage(values.inputAmount);
    }  

    // Отримуєм дані
    const axiosData = useCallback (() => {
        const url = "https://api.pexels.com/v1/search?query=" + search + "&per_page=" + perPage;  
        const access_token = '563492ad6f91700001000001ff981c4ab12a4096aa425dfe9d443dd0';  
        setProcess('getting data...');

        axios.get(url, { headers: {'Authorization': `${access_token}`}})
        .then(data => {
            setResult(data.data.photos);
            setProcess('dataRecieved');
        })
        .catch(function (error) {
            setProcess('axiosError');
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
    }, [search, perPage])

    useEffect(() => {
        axiosData();
    }, [axiosData])

    return {result, search, perPage, process, setProcess, handleChange}
}

export default Servise

// FSM v.2.0
// const setContent = (process) => {
//     switch (process) {
//         case 'dataRecieved' : return <SliderBlock/>;
//         case 'AxiosError': return <ErrorMSG/>;
//         default : throw new Error('Unexpected process state');
//     }
//     }

//     const elements = useMemo(() => {
//     return setContent(process, () => SliderBlock());
// }, [process])
