import React, { useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import "chart.js/auto";
import PigService from '../../services/PigService';
import { Button, Pagination, Table } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Field,Form,  Formik } from "formik";
import { toast } from "react-toastify";
import BarChartIcon from '@mui/icons-material/BarChart';

const PigChartList = () => {
    const [monthPicked, setMonthPicked] = useState(1);
    const [yearPicked, setYearPicked] = useState(1);
    const [reload, setReload] = useState(false);
    const [timeStat, setTimeStat] = useState('');

    useEffect(() => {
        getAllDateInList();
    }, [reload, monthPicked, yearPicked]);
    
    // const weekBase = [1, 2, 3, 4];
    const monthBase = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const yearBase = [2020, 2021, 2022, 2023, 2024, 2025, 2026];
    const [dateInList, setDateInList] = useState([]);
    const [valueList, setValueList] = useState([]);
    const getAllDateInList = async () => {
        const dateInAndValueList = await PigService.getAllDateInListByMonth(monthPicked, yearPicked);
        let dateInNotConvert = Object.keys(dateInAndValueList);
        let dateInConvert = [dateInNotConvert.length];
        if (dateInNotConvert.length === 0 && yearPicked !== 1 && yearPicked !== "") {
          toast.error("Không có bản ghi nào được tìm thấy");
        }
        for (let i=0; i< dateInNotConvert.length; i++) {
          dateInConvert[i] = formatDate(dateInNotConvert[i]);
        }
         setDateInList(dateInConvert);
         setValueList(Object.values(dateInAndValueList));
        setTimeStat('Ngày');
    }

    function formatDate(dateString) {
      const [year, month, day] = dateString.split("-");
      return `${day}-${month}-${year}`;
    }
  const data = {
    labels: [...dateInList
      ,'Thời gian(' + timeStat + ')'
    ],
    datasets: [
      {
        type: 'bar',
        label: 'Cá thể heo (Kiểu dữ liệu Bar)',
        data: [...valueList, ''],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          // 'rgba(255, 99, 132, 0.6)',
          
        ],
        borderWidth: 3,
        borderColor: '#777',
        hoverBorderWidth: 5,
        hoverBorderColor: '#000',
      },
      {
        type: 'line',
        label: 'Cá thể heo (Kiểu dữ liệu Line)',
        data: [...valueList, ''],
        borderWidth: 3,
        // borderColor: '#777',
        hoverBorderWidth: 5,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        hoverBorderColor: '#000',
      },
      // {
      //   type: 'radar',
      //   label: 'Cá thể heo (Kiểu dữ liệu Radar)',
      //   data: [...valueList, ''],
      //   borderWidth: 3,
      //   // borderColor: '#777',
      //   hoverBorderWidth: 5,
      //   fill: false,
      //   borderColor: 'rgb(75, 192, 192)',
      //   tension: 0.1,
      //   hoverBorderColor: '#000',
      // }
    ],
  };

  const handleStat = async (value) => {
    // setStat(true);
    const monthPick = await value.monthIn;
    const yearPick = await value.yearIn;
    if (monthPick === undefined || yearPick === undefined) {
      toast.info("Vui lòng nhập đủ tháng năm hoặc năm");
      setReload(!reload);
    } else {
      if (monthPick === "" && yearPick === "") {
        toast.info("Vui lòng nhập đủ tháng năm hoặc năm");
        setReload(!reload);
    } else if (monthPick === "") {
      const pigListByYear = await PigService.getAllDateInListByYear(yearPick);
      setDateInList(Object.keys(pigListByYear));
      setValueList(Object.values(pigListByYear));
    } else if (yearPick === "") {
      toast.info("Vui lòng nhập năm");
      setReload(!reload)
    } else {
    setMonthPicked(monthPick);
    setYearPicked(yearPick); 
    }
    setTimeStat('Tháng'); 
  }
    }
  return (
    <div className="container">
      <div>
        <Row> 
          <Col lg={6} sm={6}>
            <Row>
              <Col lg={4} sm={12}></Col>
              <Col lg={4} sm={12}>
                
              </Col>
              <Col lg={4} sm={12}></Col>
            </Row>
          </Col>
          <Col lg={6} sm = {6}>
          <Formik initialValues={{}} onSubmit={handleStat}>
              <Form>
                <Row>
                <Col lg={12} sm={12}>
                  <Row>
                  <Col lg={3} md={6} sm={1}></Col>
                  <Col lg={3} md={6} sm={1}>
                      <Field as="select" name="monthIn" style={{ height: "32px", margin: "0px"}}>
                        <option value="" >Chọn tháng</option>
                        {monthBase.map((code, index) => (
                            <option value={code} key={code}>{code}</option>
                        ))} 
                      </Field>
                    </Col>
                    <Col lg={3} md={6} sm={1}>
                      <Field as="select" name="yearIn" style={{ height: "32px", margin: "0px"}}>
                        <option value="" >Chọn Năm</option>
                        {yearBase.map((code, index) => (
                            <option value={code} key={code}>{code}</option>
                        ))} 
                      </Field>
                    </Col>
                    <Col lg={3} md={6} sm={1}>
                      <Button variant="primary" type="submit">Thống kê</Button>
                    </Col>
                  </Row>
                </Col>
                </Row>
              </Form>
          </Formik>
          </Col>
        </Row>
      </div>
      <Chart data={data} title='Thống kê cá thể heo theo khoảng thời gian'/>
    </div>
  );
};

export default PigChartList;
