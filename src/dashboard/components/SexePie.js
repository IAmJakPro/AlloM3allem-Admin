import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie, G2 } from '@ant-design/charts';
import { useHttpClient } from '../../hooks/http-hook';

const SexePie = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/analytics/genders`
        );
        console.log(responseData);
        setData(responseData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCounts();
  }, []);

  const G = G2.getEngine('canvas');
  const config = {
    appendPadding: 10,
    data,
    angleField: 'count',
    colorField: 'sexe',
    radius: 0.66,
    color: ['#1890ff', '#f04864', '#000000'],
    /* label: {
      content: (obj) => {
        const group = new G.Group({});
        group.addShape({
          type: 'image',
          attrs: {
            x: 0,
            y: 0,
            width: 40,
            height: 50,
            img:
              obj.sexe === 'Male'
                ? 'https://gw.alipayobjects.com/zos/rmsportal/oeCxrAewtedMBYOETCln.png'
                : 'https://gw.alipayobjects.com/zos/rmsportal/mweUsJpBWucJRixSfWVP.png',
          },
        });
        group.addShape({
          type: 'text',
          attrs: {
            x: 13,
            y: 54,
            text: obj.sexe,
            textAlign: 'center',
            textBaseline: 'top',
            fill:
              obj.sexe === 'Male'
                ? '#1890ff'
                : obj.sexe === 'Female'
                ? '#f04864'
                : '#000000',
          },
        });
        return group;
      },
    }, */
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
};

export default SexePie;
