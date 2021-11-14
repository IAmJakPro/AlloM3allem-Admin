import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useHttpClient } from '../../hooks/http-hook';
import EditAdminForm from '../components/EditAdminForm';

const EditAdmin = () => {
  const adminId = useParams().id;
  const [admin, setAdmin] = useState();
  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/admins/${adminId}`
        );
        setAdmin(responseData.data);
        console.log(responseData.data);
      } catch (err) {}
    };
    fetchAdmin();
  }, [sendRequest, adminId]);
  return (
    <div id="edit-admin">
      {!isLoading && admin && <EditAdminForm admin={admin} />}
    </div>
  );
};

export default EditAdmin;
