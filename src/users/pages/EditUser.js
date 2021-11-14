import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useHttpClient } from '../../hooks/http-hook';
import EditUserForm from '../components/EditUserForm';

import { Tabs } from 'antd';
import ProfileForm from '../components/ProfileForm';

const { TabPane } = Tabs;

const EditUser = () => {
  const userId = useParams().id;
  const [user, setUser] = useState();
  const [cities, setCities] = useState([]);
  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/users/${userId}`
        );
        setUser(responseData.data);
        console.log(responseData.data);
      } catch (err) {}
    };
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
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
    fetchCities();
  }, [sendRequest, userId]);

  return (
    <div id="edit-user">
      {!isLoading && user && (
        <Tabs defaultActiveKey="1">
          <TabPane tab="Account" key="1">
            <EditUserForm user={user} cities={cities} />
          </TabPane>
          <TabPane tab="Profile" disabled={user.type !== 'employee'} key="2">
            {user.type === 'employee' && (
              <ProfileForm employee={user.employee} cities={cities} />
            )}
          </TabPane>
        </Tabs>
      )}
    </div>
  );
};

export default EditUser;
