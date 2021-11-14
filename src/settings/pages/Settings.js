import { useEffect, useState } from 'react';
import { useHttpClient } from '../../hooks/http-hook';
import SettingsForm from '../components/SettingsForm';

const Settings = () => {
  const [settings, setSettings] = useState();
  const { isLoading, sendRequest } = useHttpClient();
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/settings`
        );
        console.log(responseData);
        setSettings(responseData.data);
      } catch (err) {}
    };
    fetchSettings();
  }, [sendRequest]);
  return (
    <div id="edit-settings">
      {!isLoading && settings && <SettingsForm settings={settings} />}
    </div>
  );
};

export default Settings;
