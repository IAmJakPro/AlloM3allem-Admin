import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';
import { useHttpClient } from '../../hooks/http-hook';

const DemoLine = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/analytics`
        );
        console.log('this is response data: ', responseData.data);
        setData(responseData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCounts();
  }, []);
  var config = {
    data: data,
    xField: 'day',
    yField: 'count',
    seriesField: 'name',
    /* yAxis: {
      label: {
        formatter: function formatter(v) {
          return ''.concat((v / 1000000000).toFixed(1), ' B');
        },
      },
    }, */
    legend: { position: 'top' },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  };
  return <Line {...config} />;
};

export default DemoLine;
