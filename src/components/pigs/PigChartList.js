import React, { useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import "chart.js/auto";
import PigService from '../../services/PigService';

const PigChartList = (makeReload) => {
    useEffect(() => {
        getAllDateInList();
    }, [makeReload]);

    const [dateInList, setDateInList] = useState([]);
    const [valueList, setValueList] = useState([]);
    const getAllDateInList = async () => {
        const dateInAndValueList = await PigService.getAllDateInList();
        let dateInNotConvert = Object.keys(dateInAndValueList);
        let dateInConvert = [dateInNotConvert.length];
        for (let i=0; i< dateInNotConvert.length; i++) {
          dateInConvert[i] = formatDate(dateInNotConvert[i]);
        }
         setDateInList(dateInConvert);
         setValueList(Object.values(dateInAndValueList));
    }

    function formatDate(dateString) {
      const [year, month, day] = dateString.split("-");
      return `${day}-${month}-${year}`;
    }
  const data = {
    labels: [...dateInList, ''],
    datasets: [
      {
        label: 'Population',
        data: [...valueList, 0],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderWidth: 1,
        borderColor: '#777',
        hoverBorderWidth: 3,
        hoverBorderColor: '#000',
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: 'Largest Cities In Massachusetts',
      fontSize: 25,
    },
    legend: {
      display: true,
      position: 'right',
      labels: {
        fontColor: '#000',
      },
    },
    layout: {
      padding: {
        left: 50,
        right: 0,
        bottom: 0,
        top: 0,
      },
    },
    tooltips: {
      enabled: true,
    },
  };

  return (
    <div className="container">
      <Chart type="bar" data={data} options={options} />
    </div>
  );
};

export default PigChartList;
