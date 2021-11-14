import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../hooks/http-hook';
import EditCityForm from '../components/EditCityForm';

const EditCity = () => {
  const cityId = useParams().id;
  const [city, setCity] = useState();
  const { isLoading, sendRequest } = useHttpClient();
  useEffect(() => {
    const fetchCity = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/cities/${cityId}`
        );
        console.log(responseData);
        setCity(responseData.data);
      } catch (err) {}
    };
    fetchCity();
  }, [sendRequest, cityId]);
  return (
    <div id="edit-city">
      {!isLoading && city && <EditCityForm city={city} />}
    </div>
  );
};

export default EditCity;
