import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../hooks/http-hook';
import EditPageForm from '../components/EditPageForm';

const EditPage = () => {
  const pageId = useParams().id;
  const [page, setPage] = useState();
  const { isLoading, sendRequest } = useHttpClient();
  useEffect(() => {
    const fetchPage = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/pages/${pageId}`
        );
        console.log(responseData);
        setPage(responseData.data);
      } catch (err) {}
    };
    fetchPage();
  }, [sendRequest, pageId]);
  return (
    <div id="edit-page">
      {!isLoading && page && <EditPageForm page={page} />}
    </div>
  );
};

export default EditPage;
