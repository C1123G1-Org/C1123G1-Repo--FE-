import React, { useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import "chart.js/auto";
import PigService from '../../services/PigService';
import { Button, Pagination, Table } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Field,Form,  Formik } from "formik";

const PigChartList = (makeReload) => {
    const [monthPicked, setMonthPicked] = useState(6);
    const [yearPicked, setYearPicked] = useState(2024);
    const [stat, setStat] = useState(false);

    useEffect(() => {
        getAllDateInList();
    }, [makeReload], [stat]);

    
    // const weekBase = [1, 2, 3, 4];
    const monthBase = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const yearBase = [2020, 2021, 2022, 2023, 2024, 2025, 2026];
    const [dateInList, setDateInList] = useState([]);
    const [valueList, setValueList] = useState([]);
    const getAllDateInList = async () => {
        const dateInAndValueList = await PigService.getAllDateInListByMonth(6, 2024);
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
    labels: [...dateInList, 'Thời gian(Tháng)'],
    datasets: [
      {
        label: 'Cá thể(Heo)',
        data: [...valueList, ''],
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

  const handleStat = async (value) => {
    setStat(false);
    const monthPick = await value.monthIn;
    const yearPick = await value.yearIn;
    console.log(monthPick + ' ' + yearPick);
    setMonthPicked(monthPick);
    setYearPicked(yearPick);
  }

  // const handleMonthIn = (monthPick) => {
  //   setMonthPicked(monthPick)
  // }
  // const handleYearIn = (yearPick) => {
  //   setYearPicked(yearPick)
  // }
  return (
    <div className="container">
      <div>
        <Row> 
          <Formik initialValues={{}} onSubmit={handleStat}>
              <Form>
                <Field as="select" name="monthIn" style={{ height: "32px", margin: "0px"}}>
                  <option value="" >Chọn tháng</option>
                  {monthBase.map((code, index) => (
                      <option value={code} key={code}>{code}</option>
                  ))} 
                </Field>
                <Field as="select" name="yearIn" style={{ height: "32px", margin: "0px"}}>
                  <option value="" >Chọn Năm</option>
                  {yearBase.map((code, index) => (
                      <option value={code} key={code}>{code}</option>
                  ))} 
                </Field>
                  <Button variant="secondary" type="submit" style={{marginLeft: "30px"}}>Thống kê</Button>
              </Form>
          </Formik>
        </Row>
      </div>
      <Chart type="bar" data={data}/>
    </div>
  );
};

export default PigChartList;
