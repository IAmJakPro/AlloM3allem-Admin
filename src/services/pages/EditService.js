import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../hooks/http-hook';
import EditServiceForm from '../components/EditServiceForm';

const EditService = () => {
  const serviceId = useParams().id;
  const [service, setService] = useState();
  const { isLoading, sendRequest } = useHttpClient();
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/services/${serviceId}`
        );
        console.log(responseData);
        setService(responseData.data);
      } catch (err) {}
    };
    fetchServices();
  }, [sendRequest, serviceId]);
  return (
    <div id="edit-service">
      {!isLoading && service && <EditServiceForm service={service} />}
    </div>
  );
};

export default EditService;
