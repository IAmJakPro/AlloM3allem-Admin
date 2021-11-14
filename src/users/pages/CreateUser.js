import { useEffect, useState } from 'react';

import { useHttpClient } from '../../hooks/http-hook';
import NewUserForm from '../components/NewUserForm';

const CreateUser = () => {
  const [cities, setCities] = useState([]);
  const { isLoading, sendRequest } = useHttpClient();
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/cities`,
          'GET',
          null,
          {
            'Accept-Language': 'fr',
          }
        );
        setCities(responseData.data);
      } catch (err) {}
    };
    fetchCities();
  }, [sendRequest]);

  return (
    <div id="create-user">
      {!isLoading && cities.length > 0 && <NewUserForm cities={cities} />}
    </div>
  );
};

export default CreateUser;
