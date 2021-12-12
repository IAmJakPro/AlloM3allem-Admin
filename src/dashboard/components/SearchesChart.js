import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/charts';
import { useHttpClient } from '../../hooks/http-hook';

const SearchsChart = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/analytics/searches`
        );
        setData(responseData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCounts();
  }, []);
  const config = {
    data,
    xField: 'city',
    yField: 'count',
    seriesField: 'service',
    isGroup: 'true',
    columnStyle: {
      radius: [20, 20, 0, 0],
    },
    xAxis: {
      label: {
        autoRotate: false,
      },
    },
    slider: {
      start: 0,
      end: 1,
    },
  };

  return <Column {...config} />;
};

export default SearchsChart;
